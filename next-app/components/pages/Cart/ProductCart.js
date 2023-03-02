"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCart = void 0;
/* eslint-disable @next/next/no-img-element */
const react_1 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
const numeral_1 = __importDefault(require("numeral"));
const FormatPrice_1 = require("@/components/common/FormatPrice");
const fa_1 = require("react-icons/fa");
const cartSlice_1 = require("@/redux/slice/cartSlice");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const ProductCart = (props) => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const cart = (0, react_redux_1.useSelector)((state) => state.cart);
    const handleDelete = (id) => {
        dispatch((0, cartSlice_1.removeCartItem)(id));
        react_hot_toast_1.default.success('successfully');
    };
    const handleIncrement = (id) => {
        dispatch((0, cartSlice_1.increment)(id));
        react_hot_toast_1.default.success('successfully');
    };
    const handleDecrement = (id, quantity) => {
        if (quantity > 1) {
            dispatch((0, cartSlice_1.decrement)(id));
            react_hot_toast_1.default.success('successfully');
        }
    };
    return (<div className="xl:col-span-9 lg:col-span-8 md:mt-0 mt-16">
            <div className="bg-primary text-white py-4 uppercase font-medium pl-12 pr-20 xl:pr-28 mb-4 hidden md:flex">
                <p className="text-center">Sản Phẩm</p>
                <p className="text-center ml-auto mr-16 xl:mr-24">Số Lượng</p>
                <p className="text-center">Tổng</p>
            </div>

            <div className="space-y-4">
                {cart.map((item, index) => (<div key={index} className="flex items-center md:justify-between gap-4 md:gap-6 p-4 border border-gray-200 rounded flex-wrap md:flex-nowrap">
                        <div className="w-32 flex-shrink-0">
                            <img alt={item.name} src={item.image} className="w-full"/>
                        </div>

                        <div className="md:w-1/3 w-full">
                            <h2 className="text-gray-800 mb-3 xl:text-xl text-lg font-medium uppercase">{item.name}</h2>
                            <div className="font-semibold">
                                <FormatPrice_1.FormatPrice promotion={item.promotion} price={item.price}/>
                            </div>
                            <p className="text-gray-500">Size: M</p>
                        </div>

                        <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300">
                            <div className={`${item.quantity > 1 ? 'cursor-pointer' : 'cursor-not-allowed'} h-8 w-8 text-xl flex items-center justify-center select-none`} onClick={() => handleDecrement(item._id, item.quantity)}>
                                -
                            </div>
                            <div className="h-8 w-10 flex items-center justify-center">{item.quantity}</div>
                            <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none" onClick={() => handleIncrement(item._id)}>
                                +
                            </div>
                        </div>

                        <div className="ml-auto md:ml-0">
                            <div className="text-lg font-semibold">
                                <GetTotals promotion={item.promotion} price={item.price} quantity={item.quantity}/>
                            </div>
                        </div>
                        <div onClick={() => handleDelete(item._id)} className="text-gray-600 hover: cursor-pointer">
                            <fa_1.FaTrash />
                        </div>
                    </div>))}
            </div>
        </div>);
};
exports.ProductCart = ProductCart;
const GetTotals = ({ promotion, price, quantity }) => {
    const getPricePromotion = Math.round(price - (price / 100) * promotion);
    const total = quantity * getPricePromotion;
    return <div>{(0, numeral_1.default)(total).format('0,0')}</div>;
};
