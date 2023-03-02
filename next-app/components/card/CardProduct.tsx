/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import { FaCartPlus } from 'react-icons/fa';
import { IProduct } from '@/types';
import { FormatPrice } from '../common/FormatPrice';

type Props = {
    product: IProduct;
    onClick?: () => void;
};

export const CardProduct = ({ product, onClick }: Props) => {
    return (
        <div className="overflow-hidden bg-white rounded shadow group hover:scale-105">
            <Link href={`/product/${product.slug}`}>
                <img alt={product.name} src={product.imageURL[0]} className="w-full" />
            </Link>

            <div className="px-4 pt-4 pb-3">
                <Link href={`/product/${product.slug}`}>
                    <h4 className="mb-2 truncate text-sm font-medium text-gray-800 uppercase transition hover:text-primary">
                        {product.name}
                    </h4>
                </Link>
                <div className="flex items-center justify-between mb-1 space-x-2">
                    <FormatPrice promotion={product.promotion} price={product.price} />
                    <button onClick={onClick}>
                        <FaCartPlus className="w-5 h-5 text-primary" />
                    </button>
                </div>
            </div>
        </div>
    );
};
