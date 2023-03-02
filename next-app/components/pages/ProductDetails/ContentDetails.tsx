import React from 'react';
import { FaFacebookF, FaInstagram, FaShoppingBag, FaTwitter } from 'react-icons/fa';
import { IProduct } from '@/types';
import { FormatPrice } from '@/components/common/FormatPrice';
import Link from 'next/link';

type Props = {
    singleProduct: IProduct;
    onClick: () => void;
};

export const ContentDetails = ({ singleProduct, onClick }: Props) => {
    return (
        <div>
            <h2 className="text-2xl font-medium uppercase mb-2">{singleProduct?.name}</h2>
            <div className="space-y-2 uppercase ">
                <p className="text-gray-800 uppercase font-semibold space-x-2">
                    <span>khả dụng: </span>
                    <span className={`${singleProduct.quantity > 0 ? 'text-green-600' : 'text-red-600'} `}>
                        {singleProduct.quantity > 0 ? 'Còn hàng' : 'hết hàng'}
                    </span>
                </p>
                <p className="space-x-2">
                    <span className="text-gray-800 font-semibold">Thương hiệu: </span>
                    <span className="text-gray-600">{singleProduct?.brand.title}</span>
                </p>
                <p className="space-x-2">
                    <span className="text-gray-800 font-semibold">Danh mục: </span>
                    <span className="text-gray-600">{singleProduct?.category.name}</span>
                </p>
            </div>
            <div className="mt-4 flex items-baseline gap-3 uppercase">
                <span className="text-gray-800 font-semibold">Giá: </span>
                <FormatPrice text={'text-base'} promotion={singleProduct?.promotion} price={singleProduct?.price} />
            </div>

            <div className="mt-4">
                <h3 className="uppercase font-semibold text-gray-800 mb-1">Color</h3>
                <div className="flex items-center gap-2">
                    {singleProduct?.color?.map((color, index) => (
                        <div className="color-selector" key={index}>
                            <label
                                style={{ backgroundColor: color?.code }}
                                className="text-xs border border-gray-200 rounded-sm h-5 w-5 flex items-center justify-center cursor-pointer shadow-sm"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-4">
                <h3 className="uppercase font-semibold text-gray-800 mb-1">Quantity</h3>
                <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
                    <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">-</div>
                    <div className="h-8 w-10 flex items-center justify-center">1</div>
                    <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">+</div>
                </div>
            </div>

            <div className="flex gap-3 border-b border-gray-200 pb-5 mt-6">
                <button
                    onClick={onClick}
                    className="bg-primary border border-primary text-white px-8 py-2.5 font-medium rounded uppercase hover:opacity-75 text-sm flex items-center"
                >
                    <span className="mr-2">
                        <FaShoppingBag />
                    </span>
                    THÊM VÀO GIỎ HÀNG
                </button>
            </div>

            <div className="flex space-x-3 mt-4">
                <Link
                    href="#"
                    className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
                >
                    <FaFacebookF />
                </Link>
                <Link
                    href="#"
                    className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
                >
                    <FaTwitter />
                </Link>
                <Link
                    href="#"
                    className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
                >
                    <FaInstagram />
                </Link>
            </div>
        </div>
    );
};
