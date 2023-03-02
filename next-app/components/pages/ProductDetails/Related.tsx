/* eslint-disable @next/next/no-img-element */
import { IProduct } from '@/types';
import React from 'react';
import { addToCart } from 'redux/slice/cartSlice';
import { CardProduct } from '@/components/card/CardProduct';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

type Props = {
    relatedProducts: IProduct[];
};

export const Related = ({ relatedProducts }: Props) => {
    const dispatch = useDispatch();

    const addCart = (data: IProduct) => {
        dispatch(addToCart(data));
        toast.success('Success');
    };
    return (
        <div className=" pb-16">
            <h2 className="text-base md:text-xl font-medium text-gray-800 uppercase mb-6">sản phẩm tương tự</h2>

            <div className="grid lg:grid-cols-6 sm:grid-cols-3 gap-6">
                {relatedProducts?.map((product) => (
                    <CardProduct key={product._id} product={product} onClick={() => addCart(product)} />
                ))}
            </div>
        </div>
    );
};
