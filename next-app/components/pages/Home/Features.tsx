/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react';

type Props = {};

export const Features = (props: Props) => {
    return (
        <div className="bg-white px-6 pt-6 pb-3">
            <div className="grid justify-center gap-3 mx-auto lg:w-10/12 sm:grid-cols-3 lg:gap-6">
                <div className="flex items-center justify-center gap-5 px-8 py-4 border rounded-sm border-primary lg:px-3 lg:py-6">
                    <img src="images/icons/delivery-van.svg" className="object-contain w-10 h-12 lg:w-12" />
                    <div>
                        <h4 className="text-lg font-medium uppercase">Miễn phí vận chuyển</h4>
                        <p className="text-xs text-gray-500 lg:text-sm uppercase">Đặt hàng trên 500.000Đ</p>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-5 px-8 py-4 border rounded-sm border-primary lg:px-3 lg:py-6">
                    <img src="images/icons/money-back.svg" className="object-contain w-10 h-12 lg:w-12" />
                    <div>
                        <h4 className="text-lg font-medium uppercase">Hoàn Tiền</h4>
                        <p className="text-xs text-gray-500 lg:text-sm uppercase">30 ngày hoàn tiền</p>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-5 px-8 py-4 border rounded-sm border-primary lg:px-3 lg:py-6">
                    <img src="images/icons/service-hours.svg" className="object-contain w-10 h-12 lg:w-12" />
                    <div>
                        <h4 className="text-lg font-medium uppercase">Hỗ trợ 24/7</h4>
                        <p className="text-xs text-gray-500 lg:text-sm uppercase">Hỗ trợ khách hàng</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
