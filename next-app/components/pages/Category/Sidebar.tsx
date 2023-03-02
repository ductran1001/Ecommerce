/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { IBrand } from '@/types';
import { NextRouter, useRouter } from 'next/router';
import { FaTimes } from 'react-icons/fa';
import Link from 'next/link';

type Props = {
    dataBrands: IBrand[];
    hiddenSidebar: boolean;
    onClick: () => void;
};

export const Sidebar = ({ dataBrands, hiddenSidebar, onClick }: Props) => {
    const router = useRouter();
    const sort = router.query?.sort || 'asc';
    const [price, setPrice] = React.useState({
        min: Number(router.query?.min) || 1,
        max: Number(router.query?.max) || 999999999999,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrice((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
    };
    const handleFilterPrice = () => {
        const brand = router.query?.brand || 'default';
        const sort = router.query?.sort || 'asc';
        const query = { sort: sort, brand: brand, min: price.min, max: price.max };
        router.push({ pathname: `/category/${router.query.slug}`, query: query });
    };

    return (
        <>
            {hiddenSidebar ? (
                <div className="col-span-1 bg-white px-4 pt-4 pb-6 shadow rounded overflow-hidden absolute lg:static left-4 top-16 z-10 w-72 lg:w-full lg:block">
                    <div className="divide-gray-200 divide-y space-y-5 relative">
                        <div className="relative">
                            <div
                                onClick={onClick}
                                className="lg:hidden text-gray-400 hover: text-lg absolute right-0 top-0 cursor-pointer"
                            >
                                <FaTimes />
                            </div>
                            <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Thương hiệu</h3>
                            {dataBrands?.map((item) => (
                                <BrandLists
                                    item={item}
                                    key={item._id}
                                    router={router}
                                    sort={sort as string}
                                    price={price}
                                />
                            ))}
                        </div>

                        <div className="pt-4">
                            <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Giá</h3>
                            <div className="mt-4 flex items-center mb-3">
                                <input
                                    type="number"
                                    min={price.min}
                                    max={price.max}
                                    defaultValue={1}
                                    name="min"
                                    onChange={(event) => handleChange(event)}
                                    className="w-full border-gray-300 focus:ring-0 focus:border-primary px-3 py-1 text-gray-600 text-sm shadow-sm rounded"
                                    placeholder="min"
                                />
                                <span className="mx-3 text-gray-500">-</span>
                                <input
                                    name="max"
                                    type="number"
                                    min={price.min}
                                    max={price.max}
                                    onChange={(event) => handleChange(event)}
                                    className="w-full border-gray-300 focus:ring-0 focus:border-primary px-3 py-1 text-gray-600 text-sm shadow-sm rounded"
                                    placeholder="max"
                                />
                            </div>
                            <button
                                onClick={() => handleFilterPrice()}
                                className=" bg-primary text-white px-4 py-3 font-medium rounded-md uppercase hover:opacity-75 text-sm w-full block text-center"
                            >
                                Lọc
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

interface IProps {
    item: IBrand;
    router: NextRouter;
    sort: string;
    price: {
        min: number;
        max: number;
    };
}
const BrandLists = ({ item, router, sort, price }: IProps) => {
    const link = `${router.query.slug}?sort=${sort}&brand=${item?._id}&min=${price.min}&max=${price.max}`;
    return (
        <Link href={link} className="space-y-2 mb-2">
            <div className="flex items-center">
                <label
                    htmlFor={item?._id}
                    className="text-gray-600 space-y-2 flex gap-2 items-center ml-3 cursor-pointer"
                >
                    {router.query.brand === item?._id ? (
                        <img src="/images/check.png" className="w-6 h-6" alt="" />
                    ) : (
                        <div className="w-4 h-4 border mr-2" />
                    )}
                    {item?.title}
                </label>
            </div>
        </Link>
    );
};
