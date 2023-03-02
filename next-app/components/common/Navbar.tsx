/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import { ICategory } from '@/types';
import { FaBars } from 'react-icons/fa';

type IProps = {
    dataCategories?: ICategory[];
};

export const Navbar = ({ dataCategories }: IProps) => {
    return (
        <nav className="hidden bg-gray-800 lg:block">
            <div className="container">
                <div className="flex">
                    <div className="relative flex items-center px-12 py-4 cursor-pointer bg-primary group">
                        <span className="text-white">
                            <FaBars />
                        </span>
                        <span className="ml-2 text-white capitalize">Category</span>
                        <div className="absolute left-0 z-50 invisible w-full py-3 transition duration-300 bg-white divide-y divide-gray-300 shadow-md opacity-0 top-full group-hover:opacity-100 group-hover:visible divide-dashed">
                            {dataCategories?.map((category: ICategory) => (
                                <Link
                                    key={category.slug}
                                    href={`/danh-muc/${category.slug}`}
                                    className="flex items-center px-3 py-3 transition hover:bg-gray-100"
                                >
                                    <img alt="" src={category.image} className="object-contain w-6 h-6" />
                                    <span className="ml-6 text-sm text-gray-600">{category?.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-between flex-grow pl-12">
                        <div className="flex items-center space-x-6 text-base capitalize">
                            <Link href="/" className="text-gray-200 transition hover:text-white">
                                Home
                            </Link>
                            <Link href="/product" className="text-gray-200 transition hover:text-white">
                                Product
                            </Link>
                            <Link href="/about-us" className="text-gray-200 transition hover:text-white">
                                About us
                            </Link>
                            <Link href="contact-us" className="text-gray-200 transition hover:text-white">
                                Contact us
                            </Link>
                        </div>
                        <Link
                            href="/login"
                            className="ml-auto text-gray-200 transition justify-self-end hover:text-white"
                        >
                            Login/Register
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};
