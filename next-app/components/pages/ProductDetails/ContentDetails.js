"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentDetails = void 0;
const react_1 = __importDefault(require("react"));
const fa_1 = require("react-icons/fa");
const FormatPrice_1 = require("@/components/common/FormatPrice");
const link_1 = __importDefault(require("next/link"));
const ContentDetails = ({ singleProduct, onClick }) => {
    var _a;
    return (<div>
            <h2 className="text-2xl font-medium uppercase mb-2">{singleProduct === null || singleProduct === void 0 ? void 0 : singleProduct.name}</h2>
            <div className="space-y-2 uppercase ">
                <p className="text-gray-800 uppercase font-semibold space-x-2">
                    <span>khả dụng: </span>
                    <span className={`${singleProduct.quantity > 0 ? 'text-green-600' : 'text-red-600'} `}>
                        {singleProduct.quantity > 0 ? 'Còn hàng' : 'hết hàng'}
                    </span>
                </p>
                <p className="space-x-2">
                    <span className="text-gray-800 font-semibold">Thương hiệu: </span>
                    <span className="text-gray-600">{singleProduct === null || singleProduct === void 0 ? void 0 : singleProduct.brand.title}</span>
                </p>
                <p className="space-x-2">
                    <span className="text-gray-800 font-semibold">Danh mục: </span>
                    <span className="text-gray-600">{singleProduct === null || singleProduct === void 0 ? void 0 : singleProduct.category.name}</span>
                </p>
            </div>
            <div className="mt-4 flex items-baseline gap-3 uppercase">
                <span className="text-gray-800 font-semibold">Giá: </span>
                <FormatPrice_1.FormatPrice text={'text-base'} promotion={singleProduct === null || singleProduct === void 0 ? void 0 : singleProduct.promotion} price={singleProduct === null || singleProduct === void 0 ? void 0 : singleProduct.price}/>
            </div>

            <div className="mt-4">
                <h3 className="uppercase font-semibold text-gray-800 mb-1">Color</h3>
                <div className="flex items-center gap-2">
                    {(_a = singleProduct === null || singleProduct === void 0 ? void 0 : singleProduct.color) === null || _a === void 0 ? void 0 : _a.map((color, index) => (<div className="color-selector" key={index}>
                            <label style={{ backgroundColor: color === null || color === void 0 ? void 0 : color.code }} className="text-xs border border-gray-200 rounded-sm h-5 w-5 flex items-center justify-center cursor-pointer shadow-sm"/>
                        </div>))}
                </div>
            </div>

            <div className="mt-4">
                <h3 className="uppercase font-semibold text-gray-800 mb-1">Quantity</h3>
                <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
                    <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">-</div>
                    <div className="h-8 w-10 flex items-center justify-center">1</div>
                    <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">+</div>
                </div>
            </div>

            <div className="flex gap-3 border-b border-gray-200 pb-5 mt-6">
                <button onClick={onClick} className="bg-primary border border-primary text-white px-8 py-2.5 font-medium rounded uppercase hover:opacity-75 text-sm flex items-center">
                    <span className="mr-2">
                        <fa_1.FaShoppingBag />
                    </span>
                    THÊM VÀO GIỎ HÀNG
                </button>
            </div>

            <div className="flex space-x-3 mt-4">
                <link_1.default href="#" className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center">
                    <fa_1.FaFacebookF />
                </link_1.default>
                <link_1.default href="#" className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center">
                    <fa_1.FaTwitter />
                </link_1.default>
                <link_1.default href="#" className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center">
                    <fa_1.FaInstagram />
                </link_1.default>
            </div>
        </div>);
};
exports.ContentDetails = ContentDetails;
