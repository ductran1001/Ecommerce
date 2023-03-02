"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartSummary = void 0;
const react_1 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
const numeral_1 = __importDefault(require("numeral"));
const link_1 = __importDefault(require("next/link"));
const CartSummary = (props) => {
    const cart = (0, react_redux_1.useSelector)((state) => state.cart);
    let initialValue = 0;
    let sum = cart.reduce(function (total, currentValue) {
        const price = Math.round(currentValue.price - (currentValue.price / 100) * currentValue.promotion);
        const getSum = price * currentValue.quantity;
        return total + getSum;
    }, initialValue);
    const ship = 0;
    const totalALL = sum + ship;
    return (<div className="xl:col-span-3 lg:col-span-4 border border-gray-200 px-4 py-4 rounded mt-6 lg:mt-0">
            <h4 className="text-gray-800 text-lg mb-4 font-medium uppercase">ORDER</h4>
            <div className="space-y-1 text-gray-600 pb-3 border-b border-gray-200">
                <div className="flex justify-between font-medium">
                    <p>Tiền hàng</p>
                    <p>{(0, numeral_1.default)(sum).format('0,0')}</p>
                </div>
                <div className="flex justify-between">
                    <p>Phí giao hàng</p>
                    <p>{ship === 0 ? 'Miễn Phí' : ship}</p>
                </div>
            </div>
            <div className="flex justify-between my-3 text-gray-800 font-semibold uppercase">
                <h4>Tổng</h4>
                <h4>{(0, numeral_1.default)(totalALL).format('0,0')}</h4>
            </div>
            <link_1.default href="/checkout" className="bg-primary text-white px-4 py-3 font-medium rounded-md uppercase hover:opacity-75 text-sm w-full block text-center">
                THANH TOÁN
            </link_1.default>
        </div>);
};
exports.CartSummary = CartSummary;
