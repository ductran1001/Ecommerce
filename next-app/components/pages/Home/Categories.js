"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categories = void 0;
const link_1 = __importDefault(require("next/link"));
const react_1 = __importDefault(require("react"));
const Categories = ({ dataCategories }) => {
    return (<div className="container pb-16">
            <h2 className="mb-6 text-2xl font-medium text-gray-800 uppercase md:text-3xl">Category</h2>
            <div className="grid gap-3 lg:grid-cols-6 sm:grid-cols-4">
                {dataCategories === null || dataCategories === void 0 ? void 0 : dataCategories.map((category) => (<div key={category.slug} className="relative overflow-hidden rounded-sm group">
                        <div className="w-40 h-40">
                            <img src={category === null || category === void 0 ? void 0 : category.image} alt={category.name} className="w-full"/>
                        </div>

                        <link_1.default href={`/danh-muc/${category.slug}`} className="absolute inset-0 flex items-center justify-center text-xl font-medium tracking-wide text-white transition bg-black bg-opacity-40 group-hover:bg-opacity-50 font-roboto">
                            {category === null || category === void 0 ? void 0 : category.name}
                        </link_1.default>
                    </div>))}
            </div>
        </div>);
};
exports.Categories = Categories;
