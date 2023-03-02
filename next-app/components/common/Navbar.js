"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Navbar = void 0;
/* eslint-disable @next/next/no-img-element */
const react_1 = __importDefault(require("react"));
const link_1 = __importDefault(require("next/link"));
const fa_1 = require("react-icons/fa");
const Navbar = ({ dataCategories }) => {
    return (<nav className="hidden bg-gray-800 lg:block">
            <div className="container">
                <div className="flex">
                    <div className="relative flex items-center px-12 py-4 cursor-pointer bg-primary group">
                        <span className="text-white">
                            <fa_1.FaBars />
                        </span>
                        <span className="ml-2 text-white capitalize">Category</span>
                        <div className="absolute left-0 z-50 invisible w-full py-3 transition duration-300 bg-white divide-y divide-gray-300 shadow-md opacity-0 top-full group-hover:opacity-100 group-hover:visible divide-dashed">
                            {dataCategories === null || dataCategories === void 0 ? void 0 : dataCategories.map((category) => (<link_1.default key={category.slug} href={`/danh-muc/${category.slug}`} className="flex items-center px-3 py-3 transition hover:bg-gray-100">
                                    <img alt="" src={category.image} className="object-contain w-6 h-6"/>
                                    <span className="ml-6 text-sm text-gray-600">{category === null || category === void 0 ? void 0 : category.name}</span>
                                </link_1.default>))}
                        </div>
                    </div>

                    <div className="flex items-center justify-between flex-grow pl-12">
                        <div className="flex items-center space-x-6 text-base capitalize">
                            <link_1.default href="/" className="text-gray-200 transition hover:text-white">
                                Home
                            </link_1.default>
                            <link_1.default href="/product" className="text-gray-200 transition hover:text-white">
                                Product
                            </link_1.default>
                            <link_1.default href="/about-us" className="text-gray-200 transition hover:text-white">
                                About us
                            </link_1.default>
                            <link_1.default href="contact-us" className="text-gray-200 transition hover:text-white">
                                Contact us
                            </link_1.default>
                        </div>
                        <link_1.default href="/login" className="ml-auto text-gray-200 transition justify-self-end hover:text-white">
                            Login/Register
                        </link_1.default>
                    </div>
                </div>
            </div>
        </nav>);
};
exports.Navbar = Navbar;
