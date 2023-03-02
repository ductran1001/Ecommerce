"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Breadcrumb = void 0;
const react_1 = __importDefault(require("react"));
const fa_1 = require("react-icons/fa");
const Breadcrumb = ({ title, page }) => {
    return (<div className="container flex justify-between py-4">
            <div className="flex items-center gap-3">
                <a href="index.html" className="text-base ">
                    <fa_1.FaHome />
                </a>
                <span className="text-sm text-gray-400">
                    <fa_1.FaChevronRight />
                    <i className="fas fa-chevron-right"/>
                </span>
                <p className="font-medium text-gray-600">{page}</p>

                {title && (<>
                        <span className="text-sm text-gray-400">
                            <fa_1.FaChevronRight />
                        </span>
                        <p className="text-gray-600 font-medium uppercase">{title}</p>
                    </>)}
            </div>
        </div>);
};
exports.Breadcrumb = Breadcrumb;
