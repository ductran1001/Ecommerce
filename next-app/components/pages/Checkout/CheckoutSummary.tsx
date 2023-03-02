import { RootState } from '@/redux/store';
import numeral from 'numeral';
import React from 'react';
import { useSelector } from 'react-redux';

export const CheckoutSummary = () => {
    const cart = useSelector((state: RootState) => state.cart);
    let initialValue = 0;
    let sum = cart.reduce(function (total, currentValue) {
        const price = Math.round(currentValue.price - (currentValue.price / 100) * currentValue.promotion);
        const getSum = price * currentValue.quantity;
        return total + getSum;
    }, initialValue);

    const ship = 0;
    const totalALL = sum + ship;
    return (
        <div className="lg:col-span-4 border border-gray-200 px-4 py-4 rounded mt-6 lg:mt-0">
            <h4 className="text-gray-800 text-lg mb-4 font-medium uppercase">ORDER</h4>
            <div className="space-y-1 text-gray-600 pb-3 border-b border-gray-200">
                <div className="flex justify-between font-medium">
                    <p>Tiền hàng</p>
                    <p>{numeral(sum).format('0,0')}</p>
                </div>
                <div className="flex justify-between">
                    <p>Phí giao hàng</p>
                    <p>{ship === 0 ? 'Miễn Phí' : ship}</p>
                </div>
            </div>
            <div className="flex justify-between my-3 text-gray-800 font-semibold uppercase">
                <h4>Tổng</h4>
                <h4>{numeral(totalALL).format('0,0')}</h4>
            </div>
        </div>
    );
};
