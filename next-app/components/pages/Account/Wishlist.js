"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wishlist = void 0;
/* eslint-disable @next/next/no-img-element */
const react_1 = __importDefault(require("react"));
const Wishlist = (props) => {
    return (<div className="col-span-9 mt-6 lg:mt-0 space-y-4">
            {/* single wishlist */}
            <div className="flex items-center md:justify-between gap-4 md:gap-6 p-4 border border-gray-200 rounded flex-wrap md:flex-nowrap">
                {/* cart image */}
                <div className="w-28 flex-shrink-0">
                    <img alt="" src="/images/products/product9.jpg" className="w-full"/>
                </div>
                {/* cart image end */}
                {/* cart content */}
                <div className="md:w-1/3 w-full">
                    <h2 className="text-gray-800 mb-1 xl:text-xl text-lg font-medium uppercase">
                        Italian L Shape Sofa
                    </h2>
                    <p className="text-gray-500 text-sm">
                        Availability: <span className="text-green-600">In Stock</span>
                    </p>
                </div>
                {/* cart content end */}
                <div>
                    <p className=" text-lg font-semibold">$320.00</p>
                </div>
                <a href="#" className="ml-auto md:ml-0 block px-6 py-2 text-center text-sm text-white bg-primary border border-primary rounded hover:bg-transparent hover: transition uppercase font-roboto font-medium">
                    Add to cart
                </a>
                <div className="text-gray-600 hover: cursor-pointer">
                    <i className="fas fa-trash"/>
                </div>
            </div>
            {/* single wishlist end */}
            {/* single wishlist */}
            <div className="flex items-center md:justify-between gap-4 md:gap-6 p-4 border border-gray-200 rounded flex-wrap md:flex-nowrap">
                {/* cart image */}
                <div className="w-28 flex-shrink-0">
                    <img alt="" src="/images/products/product9.jpg" className="w-full"/>
                </div>
                {/* cart image end */}
                {/* cart content */}
                <div className="md:w-1/3 w-full">
                    <h2 className="text-gray-800 mb-1 xl:text-xl text-lg font-medium uppercase">
                        Italian L Shape Sofa
                    </h2>
                    <p className="text-gray-500 text-sm">
                        Availability: <span className="text-red-600">Out of Stock</span>
                    </p>
                </div>
                {/* cart content end */}
                <div>
                    <p className=" text-lg font-semibold">$320.00</p>
                </div>
                <a href="#" className="ml-auto md:ml-0 block px-6 py-2 text-center text-sm text-white bg-primary border border-primary rounded 
              uppercase font-roboto font-medium cursor-not-allowed bg-opacity-80">
                    Add to cart
                </a>
                <div className="text-gray-600 hover: cursor-pointer">
                    <i className="fas fa-trash"/>
                </div>
            </div>
            {/* single wishlist end */}
        </div>);
};
exports.Wishlist = Wishlist;
