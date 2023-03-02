/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
import { FaAddressCard, FaGift, FaRegCreditCard, FaRegHeart, FaSignInAlt } from 'react-icons/fa';

type Props = {};

export const SidebarAccount = (props: Props) => {
    return (
        <div className="col-span-3">
            {/* account profile */}
            <div className="px-4 py-3 shadow flex items-center gap-4">
                <div className="flex-shrink-0">
                    <img
                        alt=""
                        src="/images/avatar.png"
                        className="rounded-full w-14 h-14 p-1 border border-gray-200 object-cover"
                    />
                </div>
                <div>
                    <p className="text-gray-600">Hello,</p>
                    <h4 className="text-gray-800 capitalize font-medium">Russell Ahmed</h4>
                </div>
            </div>
            {/* account profile end */}
            {/* profile links */}
            <div className="mt-6 bg-white shadow rounded p-4 divide-y divide-gray-200 space-y-4 text-gray-600">
                {/* single link */}
                <div className="space-y-1 pl-8">
                    <Link
                        href="/account/manage-account"
                        className="relative text-base font-medium capitalize hover: transition block"
                    >
                        Manage account
                        <span className="absolute -left-8 top-0 text-base">
                            <FaAddressCard />
                        </span>
                    </Link>
                    <Link href="/account/profile-information" className="hover: transition capitalize block ">
                        Profile information
                    </Link>
                    <Link href="/account/manage-address" className="hover: transition capitalize block">
                        Manage address
                    </Link>
                    <Link href="/account/change-password" className="hover: transition capitalize block">
                        change password
                    </Link>
                </div>
                {/* single link end */}
                {/* single link */}
                <div className="space-y-1 pl-8 pt-4">
                    <Link
                        href="#"
                        className="relative medium capitalize text-gray-800 font-medium hover: transition block"
                    >
                        My order history
                        <span className="absolute -left-8 top-0 text-base">
                            <FaGift />
                        </span>
                    </Link>
                    <a href="#" className="hover: transition block capitalize">
                        my returns
                    </a>
                    <a href="#" className="hover: transition block capitalize">
                        my cancellations
                    </a>
                    <a href="#" className="hover: transition block capitalize">
                        my reviews
                    </a>
                </div>
                {/* single link end */}
                {/* single link */}
                <div className="space-y-1 pl-8 pt-4">
                    <a
                        href="#"
                        className="relative medium capitalize text-gray-800 font-medium hover: transition block"
                    >
                        Payment methods
                        <span className="absolute -left-8 top-0 text-base">
                            <FaRegCreditCard />
                        </span>
                    </a>
                    <a href="#" className="hover: transition block capitalize">
                        Voucher
                    </a>
                </div>
                {/* single link end */}
                {/* single link */}
                <div className="pl-8 pt-4">
                    <Link
                        href="/account/wish-list"
                        className="relative medium capitalize text-gray-800 font-medium hover: transition block"
                    >
                        my wishlist
                        <span className="absolute -left-8 top-0 text-base">
                            <FaRegHeart />
                        </span>
                    </Link>
                </div>
                {/* single link end */}
                {/* single link */}
                <div className="pl-8 pt-4">
                    <a
                        href="#"
                        className="relative medium capitalize text-gray-800 font-medium hover: transition block"
                    >
                        logout
                        <span className="absolute -left-8 top-0 text-base">
                            <FaSignInAlt />
                        </span>
                    </a>
                </div>
                {/* single link end */}
            </div>
            {/* profile links end */}
        </div>
    );
};
