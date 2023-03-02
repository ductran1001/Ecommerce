/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import { getCart } from '@/redux/slice/cartSlice';
import { ICategory } from '@/types';
import { FaListUl, FaCartPlus, FaHome, FaUser, FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/router';

type IProps = {
    dataCategories?: ICategory[];
};

export const Header = ({ dataCategories }: IProps) => {
    const router = useRouter();
    const [showSidebar, setShowSidebar] = React.useState(false);
    const cart = useSelector((state: RootState) => state.cart);
    const [search, setSearch] = React.useState('');
    const dispatch = useDispatch();

    const getFromLocalStorage = (key: string) => {
        if (!key || typeof window === 'undefined') {
            return '';
        }
        return localStorage.getItem(key);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleClickSearch = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        router.push(`/search?q=${search}`);
    };

    React.useEffect(() => {
        let items = JSON.parse(getFromLocalStorage('cart') as string);
        if (items && cart.length === 0) {
            for (let index = 0; index < items.length; index++) {
                const element = items[index];
                dispatch(getCart(element));
            }
        }
    }, [dispatch, cart.length]);

    return (
        <>
            {showSidebar ? <div className="fixed h-full w-full bg-white opacity-60 z-20"></div> : null}
            <div
                className={`top-0 left-0 w-2/3 bg-blue-600 p-10 text-white fixed h-full z-40 ease-in-out duration-300 ${
                    showSidebar ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div
                    className="absolute right-4 text-2xl cursor-pointer top-2 text-center w-10 h-10 border"
                    onClick={() => setShowSidebar(false)}
                >
                    x
                </div>
                <div className="flex flex-col gap-y-4">
                    <div className="flex flex-col gap-y-4">
                        {dataCategories?.map((category) => (
                            <Link
                                href={`/category/${category._id}`}
                                key={category._id}
                                className="gap-1 c py-1 flex items-center text-sm font-medium"
                            >
                                <div>
                                    <img className="w-6 h-6" src={category.image} alt="" />
                                </div>
                                <div className="hover:text-primary">{category.name}</div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <div className="fixed top-0 left-0 flex items-center z-20 justify-between px-6 w-full py-3 bg-white border-b border-gray-300 shadow-sm md:hidden">
                <Link href="/" className="flex items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                        />
                    </svg>
                </Link>

                <div className="flex items-center">
                    <input
                        onChange={(event) => handleChange(event)}
                        type="text"
                        className="w-full rounded-md border border-[#DDE2E4] px-3 py-2 text-sm"
                        defaultValue=""
                        placeholder="Search ..."
                    />
                    <button onClick={(event) => handleClickSearch(event)} className="-ml-6 text-primary">
                        <FaSearch />
                    </button>
                </div>
            </div>

            <div className="bg-white">
                <div className="p-6 border md:block hidden">
                    <div className="flex justify-between">
                        <Link href="/" className="md:flex hidden items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-red-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                                />
                            </svg>
                            <span className="ml-2 font-semibold text-[#252C32]">Market</span>
                        </Link>
                        <div className="md:flex hidden flex-1 sm:ml-6 xl:max-w-xl lg:max-w-lg">
                            <input
                                onChange={(event) => handleChange(event)}
                                type="text"
                                className="w-full border flex-1 border-[#DDE2E4] px-3 py-2 text-sm"
                                defaultValue=""
                                placeholder="Tìm Kiếm ..."
                            />
                            <div className="flex bg-primary px-4 py-2 text-white">
                                <button
                                    onClick={(event) => handleClickSearch(event)}
                                    className="uppercase text-sm hover:opacity-70 font-medium"
                                >
                                    Tìm Kiếm
                                </button>
                            </div>
                        </div>
                        <div className="flex ml-2">
                            <div className="md:flex hidden items-center px-4 py-2 rounded-md cursor-pointer gap-x-1">
                                <div className="relative">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5 text-gray-500"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                    </svg>
                                    <span className="absolute flex items-center justify-center w-4 h-4 p-2 text-xs text-white bg-red-500 rounded-full -top-2 -right-2">
                                        {cart?.length ?? 0}
                                    </span>
                                </div>
                                <Link href="/cart" className="text-sm font-medium uppercase hover:text-primary">
                                    Giỏ hàng
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="md:flex hidden justify-between mt-4">
                        <div className="flex flex-wrap gap-x-8">
                            {dataCategories?.map((category) => (
                                <Link
                                    href={`/category/${category._id}`}
                                    key={category._id}
                                    className="gap-1 uppercase py-1 flex items-center text-sm font-medium"
                                >
                                    <div>
                                        <img className="w-6 h-6" src={category.image} alt="" />
                                    </div>
                                    <div className="hover:text-primary">{category.name}</div>
                                </Link>
                            ))}
                        </div>
                        {/* <span className="px-2 py-1 text-sm font-medium rounded-sm cursor-pointer uppercase hover:text-primary">
                            Trở thành người bán
                        </span> */}
                    </div>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 z-40 flex items-start justify-between w-full px-6 py-3 bg-white border-t border-gray-300 shadow-sm md:hidden">
                <Link href="/" className="relative block text-center text-gray-700 transition hover:">
                    <div className="text-2xl">
                        <FaHome className="w-full mb-2" />
                    </div>
                    <div className="text-xs leading-3">Home</div>
                </Link>
                <button
                    onClick={() => setShowSidebar(!showSidebar)}
                    className="relative block text-center text-gray-700 transition hover:"
                >
                    <div className="text-2xl">
                        <FaListUl className="w-full mb-2" />
                    </div>
                    <div className="text-xs leading-3">Danh Mục</div>
                </button>
                <Link href="/car" className="relative text-center text-gray-700 transition hover:">
                    <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white rounded-full -right-3 -top-1 bg-primary">
                        {cart?.length ?? 0}
                    </span>
                    <div className="text-2xl">
                        <FaCartPlus className="w-full mb-2" />
                    </div>
                    <div className="text-xs leading-3 uppercase">Giỏ Hàng</div>
                </Link>
            </div>
        </>
    );
};
