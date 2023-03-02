import React from 'react';
import { IProductFilter, IProduct } from '@/types';
import { CardProduct } from '@/components/card/CardProduct';
import { addToCart } from 'redux/slice/cartSlice';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

type Props = {
    dataProductFilter: IProductFilter;
};

export const ProductWrapper = ({ dataProductFilter }: Props) => {
    const dispatch = useDispatch();

    const addCart = (data: IProduct) => {
        dispatch(addToCart(data));
        toast.success('Success');
    };
    return (
        <div className="grid lg:grid-cols-4 sm:grid-cols-3 gap-6">
            {dataProductFilter?.contents?.map((product) => (
                <CardProduct key={product._id} product={product} onClick={() => addCart(product)} />
            ))}
        </div>
    );
};
