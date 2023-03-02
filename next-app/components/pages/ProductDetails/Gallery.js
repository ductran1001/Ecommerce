"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gallery = void 0;
/* eslint-disable @next/next/no-img-element */
const react_1 = __importDefault(require("react"));
const Gallery = ({ singleProduct }) => {
    const [indexImg, setIndexImg] = react_1.default.useState(0);
    return (<div>
            <div className="w-1/2 flex items-center m-auto">
                {singleProduct && <img alt="" src={singleProduct === null || singleProduct === void 0 ? void 0 : singleProduct.imageURL[indexImg]} className="w-full"/>}
            </div>
            <div className="grid lg:grid-cols-6 sm:grid-cols-4 mt-4 gap-2">
                {singleProduct === null || singleProduct === void 0 ? void 0 : singleProduct.imageURL.map((image, index) => (<div onClick={() => setIndexImg(index)} key={index}>
                        <img alt="" src={image} className="single-img py-2.5 w-full cursor-pointer border border-gray-300"/>
                    </div>))}
            </div>
        </div>);
};
exports.Gallery = Gallery;
