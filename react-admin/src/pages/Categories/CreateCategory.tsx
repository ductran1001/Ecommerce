import React from 'react';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { IError } from 'interfaces';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Layouts from 'components/Layouts';
import * as Utils from 'utils';
import * as Apis from 'api';

export const CreateCategory = () => {
    const navigate = useNavigate();
    const [category, setCategory] = React.useState<Apis.IFormCategory>(Utils.initialStateCategoryForm);
    const [errImg, setErrImg] = React.useState('');

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid },
    } = useForm<Apis.IFormCategory>({
        resolver: yupResolver(Utils.createCategorySchema),
        mode: 'onChange',
        defaultValues: category,
        values: category,
        resetOptions: {
            keepDirtyValues: true, // user-interacted input will be retained
        },
    });

    const uploadPhoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        const formData = new FormData();
        for (let i = 0; i < (files as FileList).length; i++) {
            formData.append('file', (files as FileList)[i]);
        }

        mutationUpLoad.mutate(formData, {
            onSuccess: (data) => {
                setCategory((prev) => ({ ...prev, image: data.data.publicUrl[0] }));
            },
            onError(error) {
                const mgs = ((error as AxiosError).response?.data as IError).message ?? 'Something went wrong!';
                toast.error(mgs);
            },
        });
    };

    const handleDelete = () => setCategory((prev) => ({ ...prev, image: '' }));

    const onSubmit = async (data: Apis.IFormCategory) => {
        if (data.image === '') setErrImg('Images is required');
        else {
            mutationCreate.mutate(data, {
                onSuccess: () => {
                    toast.success('Create Success');
                    navigate('/admin/categories');
                },
                onError(error) {
                    const mgs = ((error as AxiosError).response?.data as IError).message ?? 'Something went wrong!';
                    toast.error(mgs);
                },
            });
        }
    };
    const mutationCreate = useMutation({ mutationFn: (body: Apis.IFormCategory) => Apis.createCategory(body) });
    const mutationUpLoad = useMutation({ mutationFn: (body: FormData) => Apis.upload('category', body) });

    return (
        <div className="flex flex-col h-full gap-10 px-4 pt-12">
            {mutationCreate.isLoading || mutationUpLoad.isLoading ? <Layouts.Loading /> : null}
            <Layouts.Breadcrumb page="categories" sub="create" />
            <div className="flex flex-col items-center justify-center">
                <div className="flex flex-col w-full px-4 py-16 mb-12 bg-white rounded-md shadow-md sm:px-6 md:px-8 lg:px-10">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-full px-4 py-8 mx-auto space-y-6 border lg:w-3/5 sm:px-6 md:px-8 lg:px-10">
                            <div>
                                <div className="flex flex-col gap-2 md:flex-row md:items-center">
                                    <label className="w-full text-sm font-medium text-gray-900 uppercase md:w-1/4">
                                        Category Name
                                    </label>
                                    <input
                                        {...register('name')}
                                        className="flex-1 pl-4"
                                        placeholder="Category Name"
                                        name="name"
                                        type="text"
                                    />
                                </div>
                                <div className="flex items-end justify-end w-full">
                                    {errors?.name && (
                                        <p className="w-full mt-2 text-sm italic text-red-600 capitalize md:w-3/4">
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <div className="flex flex-col gap-2 md:flex-row md:items-center">
                                    <label className="w-full text-sm font-medium text-gray-900 uppercase md:w-1/4">
                                        Description
                                    </label>
                                    <textarea
                                        {...register('description')}
                                        className="flex-1 pl-4"
                                        placeholder="Description"
                                        name="description"
                                        rows={5}
                                    />
                                </div>
                                <div className="flex items-end justify-end w-full">
                                    {errors?.description && (
                                        <p className="w-full mt-2 text-sm italic text-red-600 capitalize md:w-3/4">
                                            {errors.description.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <div className="flex flex-col gap-2 md:flex-row md:items-center">
                                    <label className="w-1/4 text-sm font-medium text-gray-900 uppercase">Images</label>

                                    <label className="flex flex-col items-center justify-center flex-1 w-full pt-5 pb-6 border border-gray-400 rounded-lg cursor-pointer">
                                        <img src="/icon/UpLoadImageIcon.png" className="w-16 h-16" alt="" />
                                        <p className="mb-2 text-xs text-gray-500 md:text-base">
                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="hidden text-sm text-gray-500 md:block">
                                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                                        </p>
                                        <input
                                            onChange={(event) => uploadPhoto(event)}
                                            id="dropzone-file"
                                            type="file"
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                                <div className="flex items-end justify-end w-full">
                                    {errImg && (
                                        <p className="w-full mt-2 text-sm italic text-red-600 capitalize md:w-3/4">
                                            {errImg}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {category.image && (
                                <div className="flex items-center justify-start lg:justify-end">
                                    <div className="grid w-3/4 grid-cols-2 gap-4">
                                        <div className="relative h-48">
                                            <div className="absolute top-0 right-0 flex gap-1 mt-2">
                                                <label className="p-1.5 text-white bg-black rounded-full cursor-pointer opacity-80">
                                                    <Layouts.EditIcon />
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        onChange={(event) => uploadPhoto(event)}
                                                    />
                                                </label>
                                                <label
                                                    onClick={() => handleDelete()}
                                                    className="p-1.5 text-white bg-black rounded-full cursor-pointer opacity-80"
                                                >
                                                    <Layouts.CloseIcon />
                                                </label>
                                            </div>

                                            <img className="w-full h-full rounded-lg" src={category.image} alt="" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center">
                                <label className="w-1/4 text-sm font-medium text-gray-900 uppercase">Active</label>
                                <div className="flex flex-1 gap-4 font-normal text-gray-900">
                                    <div
                                        onClick={() => setCategory((prev) => ({ ...prev, active: true }))}
                                        className="flex gap-2 cursor-pointer"
                                    >
                                        <label className="flex items-center w-6 h-6 border border-gray-400">
                                            {category.active && <img src="/icon/CheckIcon.png" alt="" />}
                                        </label>
                                        <div>Active</div>
                                    </div>
                                    <div
                                        onClick={() => setCategory((prev) => ({ ...prev, active: false }))}
                                        className="flex gap-2 cursor-pointer"
                                    >
                                        <label className="flex items-center w-6 h-6 border border-gray-400">
                                            {!category.active && <img src="/icon/x-icon.png" alt="" />}
                                        </label>
                                        <div>Inactive</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-end justify-end w-full">
                                <button
                                    disabled={!isDirty || !isValid}
                                    type="submit"
                                    className="flex items-center justify-center w-3/4 py-2 text-base text-white bg-blue-600 rounded hover:bg-blue-700"
                                >
                                    <span className="uppercase">Submit</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
