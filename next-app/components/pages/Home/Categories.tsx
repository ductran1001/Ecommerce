/* eslint-disable @next/next/no-img-element */
import { ICategory } from '@/types';
import Link from 'next/link';
import React from 'react';

type IProps = {
    dataCategories?: ICategory[];
};

export const Categories = ({ dataCategories }: IProps) => {
    return (
        <div className="container pb-16">
            <h2 className="mb-6 text-2xl font-medium text-gray-800 uppercase md:text-3xl">Category</h2>
            <div className="grid gap-3 lg:grid-cols-6 sm:grid-cols-4">
                {dataCategories?.map((category: ICategory) => (
                    <div key={category.slug} className="relative overflow-hidden rounded-sm group">
                        <div className="w-40 h-40">
                            <img src={category?.image} alt={category.name} className="w-full" />
                        </div>

                        <Link
                            href={`/danh-muc/${category.slug}`}
                            className="absolute inset-0 flex items-center justify-center text-xl font-medium tracking-wide text-white transition bg-black bg-opacity-40 group-hover:bg-opacity-50 font-roboto"
                        >
                            {category?.name}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};
