"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Breadcrumb = void 0;
const react_router_dom_1 = require("react-router-dom");
const Breadcrumb = ({ page, sub }) => {
    return (<nav className="flex uppercase">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                    <react_router_dom_1.Link to="/admin/dashboard" className="inline-flex items-center font-medium text-gray-700 hover:text-blue-600">
                        <img src="/icon/Home.png" alt="" className="w-6 h-6 mr-2 bg-white"/>
                        Dashboard
                    </react_router_dom_1.Link>
                </li>
                <li className="inline-flex items-center">
                    <react_router_dom_1.Link to={`/admin/${page}`} className="inline-flex items-center font-medium text-gray-700 hover:text-blue-600">
                        <img src="/icon/arrow.png" className="w-6 h-6 mr-2" alt=""/>
                        {page}
                    </react_router_dom_1.Link>
                </li>
                {sub && (<li>
                        <div className="flex items-center">
                            <img src="/icon/arrow.png" className="w-6 h-6 mr-2" alt=""/>
                            <span className="font-medium text-gray-500">{sub}</span>
                        </div>
                    </li>)}
            </ol>
        </nav>);
};
exports.Breadcrumb = Breadcrumb;
