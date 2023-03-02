"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardProduct = void 0;
/* eslint-disable @next/next/no-img-element */
const react_1 = __importDefault(require("react"));
const link_1 = __importDefault(require("next/link"));
const fa_1 = require("react-icons/fa");
const FormatPrice_1 = require("../common/FormatPrice");
const CardProduct = ({ product, onClick }) => {
    return (<div className="overflow-hidden bg-white rounded shadow group hover:scale-105">
            <link_1.default href={`/product/${product.slug}`}>
                <img alt={product.name} src={product.imageURL[0]} className="w-full"/>
            </link_1.default>

            <div className="px-4 pt-4 pb-3">
                <link_1.default href={`/product/${product.slug}`}>
                    <h4 className="mb-2 truncate text-sm font-medium text-gray-800 uppercase transition hover:text-primary">
                        {product.name}
                    </h4>
                </link_1.default>
                <div className="flex items-center justify-between mb-1 space-x-2">
                    <FormatPrice_1.FormatPrice promotion={product.promotion} price={product.price}/>
                    <button onClick={onClick}>
                        <fa_1.FaCartPlus className="w-5 h-5 text-primary"/>
                    </button>
                </div>
            </div>
        </div>);
};
exports.CardProduct = CardProduct;
