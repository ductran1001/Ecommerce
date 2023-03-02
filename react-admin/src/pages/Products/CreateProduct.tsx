import React from 'react';
import { AxiosError } from 'axios';
import { ICategory, IError, IColor, IBrand } from 'interfaces';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Layouts from 'components/Layouts';
import * as Utils from 'utils';
import * as Apis from 'api';

export const CreateProduct = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state: RootState) => state.auth);
    const [colorSelect, setColorSelect] = React.useState<Array<IColor>>([]);

    const [product, setProduct] = React.useState<Apis.IFormProduct>(Utils.initialStateProductForm);

    const [categories, setCategories] = React.useState<Array<ICategory>>([]);
    const [colors, setColors] = React.useState<Array<IColor>>([]);
    const [brands, setBrands] = React.useState<Array<IBrand>>([]);

    const [errCategory, setErrCategory] = React.useState(false);
    const [errColor, setErrColor] = React.useState(false);
    const [errBrand, setErrBrand] = React.useState(false);
    const [errImg, setErrImg] = React.useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<Apis.IFormProduct>({
        resolver: yupResolver(Utils.productSchema),
        mode: 'onChange',
        defaultValues: product,
        values: product,
        resetOptions: {
            keepDirtyValues: true, // user-interacted input will be retained
        },
    });

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setProduct((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
    };

    const handleInputChangeColor = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const colorSelected = colors.filter((color) => color._id === event.target.value);
        const check = colorSelect.find((color) => color._id === event.target.value);
        check ? setColorSelect(colorSelect) : setColorSelect((prevState) => [...prevState, ...colorSelected]);
    };

    const handleDeleteColor = (id: string) => {
        const colorSelected = colorSelect.filter((color) => color._id !== id);
        setColorSelect(colorSelected);
    };

    const handleSetAvatar = (link: string) => {
        setProduct((prevState) => ({
            ...prevState,
            imageURL: [...prevState.imageURL.filter((photo) => photo !== link)],
        }));
        setProduct((prevState) => ({ ...prevState, imageURL: [link, ...prevState.imageURL] }));
    };

    const uploadPhoto = async (event: React.ChangeEvent<HTMLInputElement>, imgEdit?: string) => {
        const { files } = event.target;
        const formData = new FormData();
        for (let i = 0; i < (files as FileList).length; i++) {
            formData.append('file', (files as FileList)[i]);
        }

        mutationUpLoad.mutate(formData, {
            onSuccess: (data) => {
                const newItems = imgEdit
                    ? product.imageURL.map((item) => (item === imgEdit ? data.data.publicUrl : item))
                    : [];

                imgEdit
                    ? setProduct((prev) => ({ ...prev, imageURL: newItems }))
                    : setProduct((prev) => ({ ...prev, imageURL: [...prev.imageURL, ...data.data.publicUrl] }));
            },
            onError(error) {
                const mgs = ((error as AxiosError).response?.data as IError).message ?? 'Something went wrong!';
                toast.error(mgs);
            },
        });
    };

    const handleDelete = (url: string) => {
        const arr = product.imageURL;
        const newArr = arr.filter((item) => item !== url);
        setProduct((prev) => ({ ...prev, imageURL: newArr }));
    };

    const mutationCreate = useMutation({ mutationFn: (body: Apis.IFormProduct) => Apis.createProduct(body) });
    const mutationUpLoad = useMutation({ mutationFn: (body: FormData) => Apis.upload('products', body) });

    const onSubmit = async (data: Apis.IFormProduct) => {
        const idColor = colorSelect.map((data) => data._id);
        idColor.length === 0 ? setErrColor(true) : setErrColor(false);
        data.brand === '' || data.brand === 'DEFAULT' ? setErrBrand(true) : setErrBrand(false);
        data.category === '' || data.category === 'DEFAULT' ? setErrCategory(true) : setErrCategory(false);
        data.imageURL.length === 0 ? setErrImg(true) : setErrImg(false);

        const newData = {
            ...data,
            color: idColor,
            user: user?._id,
        } as Apis.IFormProduct;

        const isOk =
            data.brand !== '' &&
            data.brand !== 'DEFAULT' &&
            data.category !== '' &&
            data.category !== 'DEFAULT' &&
            data.imageURL.length !== 0 &&
            idColor.length;
        if (isOk) {
            mutationCreate.mutate(newData, {
                onSuccess: () => {
                    toast.success('Create Success');
                    navigate('/admin/products');
                },
                onError(error) {
                    const mgs = ((error as AxiosError).response?.data as IError).message ?? 'Something went wrong!';
                    toast.error(mgs);
                },
            });
        }
    };

    const queryCategories = useQuery({
        queryKey: ['categories'],
        queryFn: () => Apis.getListCategories(),
        onSuccess: (data) => setCategories(data.data.contents),
    });

    const queryColors = useQuery({
        queryKey: ['colors'],
        queryFn: () => Apis.getListColors(),
        onSuccess: (data) => setColors(data.data.contents),
    });

    const queryBrands = useQuery({
        queryKey: ['brands'],
        queryFn: () => Apis.getListBrands(),
        onSuccess: (data) => setBrands(data.data.contents),
    });

    const isLoad =
        queryCategories.isLoading || mutationCreate.isLoading || queryColors.isLoading || queryBrands.isLoading;

    return (
        <div className="flex flex-col h-full gap-10 px-4 pt-12">
            {isLoad ? <Layouts.Loading /> : null}

            <Layouts.Breadcrumb sub="create" page="products" />
            <div className="flex flex-col items-center justify-center">
                <div className="flex flex-col w-full px-4 pt-8 pb-16 mb-12 bg-white rounded-md shadow-md sm:px-6 md:px-8 lg:px-10">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-full px-4 py-8 mx-auto space-y-6 border lg:w-4/5 sm:px-6 md:px-8 lg:px-10">
                            <div className="flex flex-col">
                                <div className="flex items-center">
                                    <label className="w-1/4 text-sm font-medium text-gray-900 uppercase">name</label>
                                    <input
                                        {...register('name')}
                                        className="flex-1 pl-4"
                                        type="text"
                                        name="name"
                                        placeholder="Product Name"
                                    />
                                </div>
                                {errors?.name && <ErrMess message={errors.name.message as string} />}
                            </div>

                            <div className="flex flex-col">
                                <div className="flex items-center">
                                    <label className="w-1/4 text-sm font-medium text-gray-900 uppercase">
                                        description
                                    </label>
                                    <textarea
                                        {...register('description')}
                                        className="flex-1 pl-4"
                                        name="description"
                                        placeholder="Product Description"
                                        rows={5}
                                    />
                                </div>
                                {errors?.description && <ErrMess message={errors.description.message as string} />}
                            </div>

                            <div className="flex flex-col">
                                <div className="flex items-center">
                                    <label className="w-1/4 text-sm font-medium text-gray-900 uppercase">price</label>

                                    <input
                                        {...register('price')}
                                        className="flex-1 pl-4"
                                        type="number"
                                        name="price"
                                        defaultValue={product.price}
                                        placeholder="Product Price"
                                    />
                                </div>
                                {errors?.price && <ErrMess message={errors.price.message as string} />}
                            </div>

                            <div className="flex flex-col">
                                <div className="flex items-center">
                                    <label className="w-1/4 text-sm font-medium text-gray-900 uppercase">
                                        promotion
                                    </label>

                                    <input
                                        {...register('promotion')}
                                        className="flex-1 pl-4"
                                        type="number"
                                        name="promotion"
                                        defaultValue={product.promotion}
                                        placeholder="Product promotion"
                                    />
                                </div>
                                {errors?.promotion && <ErrMess message={errors.promotion.message as string} />}
                            </div>

                            <div className="flex flex-col">
                                <div className="flex items-center">
                                    <label className="w-1/4 text-sm font-medium text-gray-900 uppercase">
                                        quantity
                                    </label>

                                    <input
                                        {...register('quantity')}
                                        className="flex-1 pl-4"
                                        type="number"
                                        name="quantity"
                                        defaultValue={product.quantity}
                                        placeholder="Product quantity"
                                    />
                                </div>

                                {errors?.quantity && <ErrMess message={errors.quantity.message as string} />}
                            </div>

                            <div className="flex flex-col">
                                <div className="flex items-center">
                                    <label className="w-1/4 text-sm font-medium text-gray-900 uppercase">Colors</label>
                                    {queryColors.error ? (
                                        <div className="text-red-500">
                                            An error has occurred:
                                            {(queryColors.error as AxiosError).message}
                                        </div>
                                    ) : (
                                        colors.length > 0 && (
                                            <select
                                                defaultValue={product.color[0] ?? 'DEFAULT'}
                                                name="color"
                                                className="pl-4 flex-1 focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                                                onChange={(event) => handleInputChangeColor(event)}
                                            >
                                                <option value="DEFAULT">Choose a color</option>
                                                {colors.map((color, index) => (
                                                    <option value={color._id} key={index}>
                                                        {color.title}
                                                    </option>
                                                ))}
                                            </select>
                                        )
                                    )}
                                </div>

                                {colorSelect.length > 0 && (
                                    <div className="flex items-end justify-end w-full">
                                        <div className="w-full mt-8 text-sm italic items-center capitalize sm:w-3/4 flex gap-4">
                                            {colorSelect.map((item, i) => (
                                                <div key={i} className="relative">
                                                    <div
                                                        className="w-12 h-12 border"
                                                        style={{ backgroundColor: item.code }}
                                                    ></div>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeleteColor(item._id)}
                                                        className="absolute text-white rounded-full bg-black opacity-80 px-2 py-1 text-sm -mt-2 -top-1 -right-1"
                                                    >
                                                        X
                                                    </button>
                                                </div>
                                            ))}

                                            <button
                                                onClick={() => setColorSelect([])}
                                                type="button"
                                                className="text-red-500 text-base"
                                            >
                                                Clear
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {errColor && <ErrMess message=" Color is required" />}
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center">
                                    <label className="w-1/4 text-sm font-medium text-gray-900 uppercase">Brands</label>
                                    {queryBrands.error ? (
                                        <div className="text-red-500">
                                            An error has occurred:
                                            {(queryBrands.error as AxiosError).message}
                                        </div>
                                    ) : (
                                        brands.length > 0 && (
                                            <select
                                                defaultValue={product.brand ?? ''}
                                                name="brand"
                                                className="pl-4 flex-1 focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                                                onChange={(event) => handleInputChange(event)}
                                            >
                                                <option value="DEFAULT">Choose a brand</option>
                                                {brands.map((brand, index) => (
                                                    <option value={brand._id} key={index}>
                                                        {brand.title}
                                                    </option>
                                                ))}
                                            </select>
                                        )
                                    )}
                                </div>
                                {errBrand && <ErrMess message=" Brand is required" />}
                            </div>

                            <div className="flex flex-col">
                                <div className="flex items-center">
                                    <label className="w-1/4 text-sm font-medium text-gray-900 uppercase">
                                        category
                                    </label>

                                    {queryCategories.error ? (
                                        <div className="text-red-500">
                                            An error has occurred:
                                            {(queryCategories.error as AxiosError).message}
                                        </div>
                                    ) : (
                                        categories.length > 0 && (
                                            <select
                                                defaultValue={product.category ?? ''}
                                                name="category"
                                                className="pl-4 flex-1 focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                                                onChange={(event) => handleInputChange(event)}
                                            >
                                                <option value="DEFAULT">Choose a category</option>
                                                {categories.map((category, index) => (
                                                    <option value={category._id} key={index}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                        )
                                    )}
                                </div>

                                {errCategory && <ErrMess message="Category is required" />}
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center">
                                    <label className="w-1/4 text-sm font-medium text-gray-900 uppercase">Images</label>

                                    <label className="flex flex-col items-center justify-center flex-1 pt-5 pb-6 border border-gray-400 rounded-lg cursor-pointer">
                                        <img src="/icon/UpLoadImageIcon.png" className="w-16 h-16" alt="" />

                                        <p className="mb-2 text-xs text-gray-500 md:text-base">
                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="hidden text-sm text-gray-500 md:block dark:text-gray-400">
                                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                                        </p>
                                        <input
                                            onChange={(event) => uploadPhoto(event)}
                                            multiple
                                            id="dropzone-file"
                                            type="file"
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                                {errImg && <ErrMess message="Images is required" />}
                            </div>
                            <div className="flex items-center justify-end">
                                <div className="grid w-3/4 grid-cols-2 gap-4 lg:grid-cols-3">
                                    {product.imageURL.length > 0 &&
                                        product.imageURL.map((img, index) => (
                                            <div key={index} className="relative h-40">
                                                <div className="absolute top-0 right-0 flex gap-1 mt-2">
                                                    <label
                                                        onClick={() => handleSetAvatar(img)}
                                                        className="p-1.5 text-white bg-black rounded-full cursor-pointer opacity-80"
                                                    >
                                                        <Layouts.StarIcon />
                                                    </label>

                                                    <label className="p-1.5 text-white bg-black rounded-full cursor-pointer opacity-80">
                                                        <Layouts.EditIcon />
                                                        <input
                                                            type="file"
                                                            className="hidden"
                                                            onChange={(event) => uploadPhoto(event, img)}
                                                        />
                                                    </label>
                                                    <label
                                                        onClick={() => handleDelete(img)}
                                                        className="p-1.5 text-white bg-black rounded-full cursor-pointer opacity-80"
                                                    >
                                                        <Layouts.CloseIcon />
                                                    </label>
                                                </div>

                                                <img className="w-full h-full rounded-lg" src={img} alt="" />
                                            </div>
                                        ))}
                                </div>
                            </div>
                            <div className="flex items-center">
                                <label className="w-1/4 text-sm font-medium text-gray-900 uppercase">Active</label>
                                <div className="flex flex-1 gap-4 font-normal text-gray-900">
                                    <div
                                        onClick={() => setProduct((prev) => ({ ...prev, active: true }))}
                                        className="flex gap-2 cursor-pointer"
                                    >
                                        <label className="flex items-center w-6 h-6 border border-gray-400">
                                            {product.active && <img src="/icon/CheckIcon.png" alt="" />}
                                        </label>
                                        <div>Active</div>
                                    </div>
                                    <div
                                        onClick={() => setProduct((prev) => ({ ...prev, active: false }))}
                                        className="flex gap-2 cursor-pointer"
                                    >
                                        <label className="flex items-center w-6 h-6 border border-gray-400">
                                            {!product.active && <img src="/icon/x-icon.png" alt="" />}
                                        </label>
                                        <div>Inactive</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-end justify-end w-full">
                                <button
                                    disabled={!isValid}
                                    type="submit"
                                    className="flex items-center justify-center w-3/4 py-2 text-base text-white bg-blue-600 rounded hover:bg-blue-700"
                                >
                                    <span className="uppercase">submit</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const ErrMess = ({ message }: { message: string }) => (
    <div className="flex items-end justify-end w-full">
        <p className="w-full mt-2 text-sm italic text-red-600 capitalize sm:w-3/4">{message}</p>
    </div>
);
