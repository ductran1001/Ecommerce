"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Description = void 0;
const react_1 = __importDefault(require("react"));
const Description = ({ singleProduct }) => {
    var _a;
    return (<div className="pb-16">
            <h3 className="border-b border-gray-200 font-roboto text-gray-800 pb-3 font-medium">
                Thông tin chi tiết sản phẩm
            </h3>
            <div className="lg:w-4/5 xl:w-3/5 pt-6">
                <div dangerouslySetInnerHTML={{ __html: singleProduct === null || singleProduct === void 0 ? void 0 : singleProduct.description }}></div>
                <table className="table-auto border-collapse w-full text-left text-gray-600 text-sm mt-6">
                    <tbody>
                        <tr>
                            <th className="py-2 px-4 border border-gray-300 w-40 font-medium">MÀU SẮC</th>
                            <td className="py-2 px-4 border border-gray-300 flex gap-2">
                                {(_a = singleProduct === null || singleProduct === void 0 ? void 0 : singleProduct.color) === null || _a === void 0 ? void 0 : _a.map((color, index) => (<p key={index}>{color.title}</p>))}
                            </td>
                        </tr>
                        <tr>
                            <th className="py-2 px-4 border border-gray-300 w-40 font-medium">THƯƠNG HIỆU</th>
                            <td className="py-2 px-4 border border-gray-300">{singleProduct === null || singleProduct === void 0 ? void 0 : singleProduct.brand.title}</td>
                        </tr>
                        <tr>
                            <th className="py-2 px-4 border border-gray-300 w-40 font-medium">DANH MỤC</th>
                            <td className="py-2 px-4 border border-gray-300">{singleProduct === null || singleProduct === void 0 ? void 0 : singleProduct.category.name}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>);
};
exports.Description = Description;
