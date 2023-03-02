import { Request, Response } from 'express';
import OrderModel from './order.model';
import { ToSlug } from '../../helper/slug';
import { queryBuilder } from '../../config/queryBuilder';

export const createCrl = async (req: Request, res: Response) => {
    try {
        const { firstName, name, city, address, phoneNumber, email, orderDetails } = req.body;

        const doc = await OrderModel.create({
            firstName,
            name,
            city,
            address,
            phoneNumber,
            email,
            orderDetails,
        });

        res.status(201).json({ status: 'success', contents: doc });
    } catch (error) {
        return res.status(500).json({ status: 'fail', message: error });
    }
};

export const getAllCtrl = async (req: Request, res: Response) => {
    try {
        let query = queryBuilder(req, res, OrderModel);

        const page = Number(req.query.page) * 1 || 1;
        const limit = Number(req.query.limit) * 1 || 100;
        const skip = (page - 1) * limit;

        const total = await query.clone().count();

        const doc = await query.skip(skip).limit(limit);

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

export const getOneByIdCtrl = async (req: Request, res: Response) => {
    try {
        const doc = await OrderModel.findById(req.params.id);

        if (!doc) return res.status(404).json({ status: 'fail', message: 'NotFound' });

        res.json({ status: 'success', contents: doc });
    } catch (error) {
        return res.status(500).json({ status: 'fail', message: error });
    }
};

export const destroyCtrl = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const doc = await OrderModel.findByIdAndDelete(id);

        if (!doc) return res.status(404).json({ status: 'fail', message: 'NotFound' });

        res.json({ status: 'success', contents: doc });
    } catch (error) {
        return res.status(500).json({ status: 'fail', message: error });
    }
};

export const updateCtrl = async (req: Request, res: Response) => {
    try {
        const { status } = req.body;
        const findDoc = await OrderModel.findById(req.params.id);

        if (!findDoc) return res.status(404).json({ status: 'fail', message: 'NotFound' });

        const doc = await OrderModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: { status: status },
            },
            { new: true }
        );
        res.json({ status: 'success', contents: doc });
    } catch (error) {
        return res.status(500).json({ status: 'fail', message: error });
    }
};
