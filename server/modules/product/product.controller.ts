import { Request, Response } from 'express';
import ProductModel from './product.model';
import { ToSlug } from '../../helper/slug';
import { queryBuilder } from '../../config/queryBuilder';

export const createCrl = async (req: Request, res: Response) => {
    try {
        const { name, description, user, category, imageURL, active, brand, color, price, promotion, quantity } =
            req.body;
        const slug = ToSlug(name);

        const doc = await ProductModel.create({
            name,
            description,
            user,
            category,
            imageURL,
            active,
            brand,
            color,
            price,
            promotion,
            quantity,
            slug,
        });

        res.status(201).json({ status: 'success', contents: doc });
    } catch (error: any) {
        if (error.code === 11000) return res.status(409).json({ status: 'fail', message: 'document already exists' });

        return res.status(500).json({ status: 'fail', message: error });
    }
};

//Test Case
// ...?price=50000 or ?price=5000&promotion=10&....
//  ...?price[gte]=50000 or ?price[gte]=5000&promotion[gte]=10&....
// ...?sort=fieldName ->ascending order 12345
// ...?sort=-fieldName ->descending order 54321 ,
// ....?fields=name,durations,price
// ....?limit=10&page=2

export const getAllCtrl = async (req: Request, res: Response) => {
    try {
        let query = queryBuilder(req, res, ProductModel);

        // 2) Sorting
        if (req.query.sort && req.query.sort !== 'asc' && req.query.sort !== 'desc') {
            const sortBy = (req.query.sort as string).split(',').join(' ');
            query = query.sort(sortBy);
        } else if (req.query.sort === 'asc') {
            query = query.sort('createdAt');
        } else if (req.query.sort === 'desc') {
            query = query.sort('-createdAt');
        }

        //3) Field Limiting
        // Select pattern  .select("firstParam secondParam"), it will only show the selected field, add minus sign for excluding (include everything except the given params)
        if (req.query.fields) {
            const fields = (req.query.fields as string).split(',').join(' ');
            query = query.select(fields);
        } else {
            query = query.select('-__v');
        }

        // 4) Pagination
        // page=2&limit=10, 1-10 page 1, 11-20 page 2, 21-30 page 3
        const page = Number(req.query.page) * 1 || 1;
        const limit = Number(req.query.limit) * 1 || 100;
        const skip = (page - 1) * limit;

        req.query.category ? (query = query.find({ category: req.query.category })) : (query = query.find({}));
        req.query.brand ? (query = query.find({ brand: req.query.brand })) : (query = query.find({}));

        req.query.softDelete ? query.find({ softDelete: true }) : query.find({ softDelete: false });

        const populateQuery = [
            { path: 'category', select: 'name description' },
            { path: 'brand', select: 'title' },
            { path: 'user', select: 'fullName role avatar email' },
            { path: 'color', select: 'title code' },
        ];

        const total = await query.clone().count();

        const doc = await query.skip(skip).limit(limit).populate(populateQuery);

        res.status(200).json({
            status: 'success',
            results: doc.length,
            pages: Math.ceil(total / limit),
            contents: doc,
        });
    } catch (error) {
        return res.status(500).json({ status: 'fail', message: error });
    }
};

export const getSearchCtrl = async (req: Request, res: Response) => {
    try {
        const populateQuery = [
            { path: 'category', select: 'name description' },
            { path: 'brand', select: 'title' },
            { path: 'user', select: 'fullName role avatar email' },
            { path: 'color', select: 'title code' },
        ];
        const doc = await ProductModel.find({ name: { $regex: req.query.q, $options: 'i' } }).populate(populateQuery);

        if (!doc) return res.status(404).json({ status: 'fail', message: 'NotFound' });

        return res.status(200).json({ status: 'success', contents: doc });
    } catch (error) {
        return res.status(500).json({ status: 'fail', message: error });
    }
};

export const getOneByIdCtrl = async (req: Request, res: Response) => {
    try {
        const doc = await ProductModel.findById(req.params.id).populate('color');

        if (!doc) return res.status(404).json({ status: 'fail', message: 'NotFound' });

        return res.status(200).json({ status: 'success', contents: doc });
    } catch (error) {
        return res.status(500).json({ status: 'fail', message: error });
    }
};

export const getOneBySlugCtrl = async (req: Request, res: Response) => {
    try {
        const populateQuery = [
            { path: 'category', select: 'name description active' },
            { path: 'brand', select: 'title' },
            { path: 'color', select: 'title code' },
            { path: 'user', select: 'fullName role email phoneNumber' },
        ];
        const doc = await ProductModel.findOne({ slug: req.params.slug }).populate(populateQuery);
        if (!doc) return res.status(404).json({ status: 'fail', message: 'NotFound' });

        return res.status(200).json({ status: 'success', contents: doc });
    } catch (error) {
        return res.status(500).json({ status: 'fail', message: error });
    }
};

export const destroyCtrl = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const doc = await ProductModel.findByIdAndDelete(id);

        if (!doc) return res.status(404).json({ status: 'fail', message: 'NotFound' });

        return res.status(200).json({ status: 'success', contents: doc });
    } catch (error) {
        return res.status(500).json({ status: 'fail', message: error });
    }
};

export const updateCtrl = async (req: Request, res: Response) => {
    try {
        const { name, description, user, category, imageURL, active, brand, color, price, promotion, quantity } =
            req.body;
        const slug = ToSlug(name);

        const findDoc = await ProductModel.findById(req.params.id);

        if (!findDoc) return res.status(404).json({ status: 'fail', message: 'NotFound' });

        const doc = await ProductModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    name,
                    slug,
                    description,
                    user,
                    category,
                    imageURL,
                    active,
                    brand,
                    color,
                    price,
                    promotion,
                    quantity,
                },
            },
            { new: true }
        );
        res.json({ status: 'success', contents: doc });
    } catch (error: any) {
        if (error.code === 11000) return res.status(409).json({ status: 'fail', message: 'document already exists' });

        return res.status(500).json({ status: 'fail', message: error });
    }
};

export const deleteMultiCtrl = async (req: Request, res: Response) => {
    try {
        const arr = req.body.id;
        for (let index = 0; index < arr.length; index++) {
            await ProductModel.findOneAndUpdate(
                { _id: arr[index] },
                {
                    $set: { softDelete: true },
                },
                { new: true }
            );
        }

        res.json({ status: 'success' });
    } catch (error) {
        return res.status(500).json({ status: 'fail', message: error });
    }
};

export const restoreMultiCtrl = async (req: Request, res: Response) => {
    try {
        const arr = req.body.id;
        for (let index = 0; index < arr.length; index++) {
            await ProductModel.findOneAndUpdate(
                { _id: arr[index] },
                {
                    $set: { softDelete: false },
                },
                { new: true }
            );
        }

        res.json({ status: 'success' });
    } catch (error) {
        return res.status(500).json({ status: 'fail', message: error });
    }
};

export const deleteMultiTrashCtrl = async (req: Request, res: Response) => {
    try {
        const arr = req.body.id;
        for (let index = 0; index < arr.length; index++) {
            await ProductModel.findOneAndDelete({ _id: arr[index] });
        }

        res.json({ status: 'success' });
    } catch (error) {
        return res.status(500).json({ status: 'fail', message: error });
    }
};

export const groupCategoryCtrl = async (req: Request, res: Response) => {
    try {
        res.send(
            await ProductModel.aggregate([
                {
                    $match: { active: true },
                },
                {
                    $lookup: {
                        from: 'users',
                        let: { user_id: '$user' },
                        pipeline: [
                            { $match: { $expr: { $eq: ['$_id', '$$user_id'] } } },
                            { $project: { fullName: 1, _id: 1, email: 1, avatar: 1 } },
                        ],
                        as: 'user',
                    },
                },
                { $unwind: '$user' },
                {
                    $lookup: {
                        from: 'categories',
                        localField: 'category',
                        foreignField: '_id',
                        as: 'category',
                    },
                },
                { $unwind: '$category' },
                { $sort: { createdAt: -1 } },
                {
                    $group: {
                        _id: '$category._id',
                        count: { $sum: 1 },
                        name: { $first: '$category.name' },
                        products: { $push: '$$ROOT' },
                    },
                },
                { $sort: { _id: 1 } },
                {
                    $project: {
                        products: '$products',
                        count: 1,
                        name: 1,
                    },
                },
            ])
        );
    } catch (error) {
        return res.status(500).json({ status: 'fail', message: error });
    }
};

export const groupBrandCtrl = async (req: Request, res: Response) => {
    try {
        res.send(
            await ProductModel.aggregate([
                {
                    $match: { active: true },
                },
                {
                    $lookup: {
                        from: 'users',
                        let: { user_id: '$user' },
                        pipeline: [
                            { $match: { $expr: { $eq: ['$_id', '$$user_id'] } } },
                            { $project: { fullName: 1, _id: 1, email: 1, avatar: 1 } },
                        ],
                        as: 'user',
                    },
                },
                { $unwind: '$user' },
                {
                    $lookup: {
                        from: 'brands',
                        localField: 'brand',
                        foreignField: '_id',
                        as: 'brands',
                    },
                },
                { $unwind: '$brands' },
                { $sort: { createdAt: -1 } },
                {
                    $group: {
                        _id: '$brands._id',
                        count: { $sum: 1 },
                        name: { $first: '$brands.title' },
                        products: { $push: '$$ROOT' },
                    },
                },
                { $sort: { _id: 1 } },
                {
                    $project: {
                        products: '$products',
                        count: 1,
                        name: 1,
                    },
                },
            ])
        );
    } catch (error) {
        return res.status(500).json({ status: 'fail', message: error });
    }
};
