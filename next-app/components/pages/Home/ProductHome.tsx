/* eslint-disable @next/next/no-img-element */
import { IProductGroup, IProduct } from '@/types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from 'redux/slice/cartSlice';
import { CardProduct } from '@/components/card/CardProduct';
import toast from 'react-hot-toast';

type Props = {
    dataProductsGroupCategory: IProductGroup[];
};

export const ProductHome = ({ dataProductsGroupCategory }: Props) => {
    const dispatch = useDispatch();

    const addCart = (data: IProduct) => {
        dispatch(addToCart(data));
        toast.success('Success');
    };

    return (
        <div>
            {dataProductsGroupCategory?.map((data, index) => (
                <div className="pb-16 px-6 py-3" key={index}>
                    <h2 className="mb-6 text-base font-medium text-gray-800 uppercase md:text-xl">{data.name}</h2>
                    <div className="grid gap-6 lg:grid-cols-6 sm:grid-cols-3">
                        {data.products?.slice(0, 6).map((product) => (
                            <CardProduct key={product._id} product={product} onClick={() => addCart(product)} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
