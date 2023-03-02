"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = void 0;
const react_router_dom_1 = require("react-router-dom");
const Icon_1 = require("./Icon");
const react_redux_1 = require("react-redux");
const Header = ({ showSidebar, handleShowSidebar }) => {
    const { user } = (0, react_redux_1.useSelector)((state) => state.auth);
    return (<nav className="bg-white border-b border-gray-200 fixed z-30 w-full">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start">
                        <button onClick={handleShowSidebar} className="md:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded">
                            {showSidebar ? <Icon_1.CloseIcon /> : <Icon_1.BarIcon />}
                        </button>

                        <react_router_dom_1.Link to="/admin/dashboard" className="text-xl font-bold flex items-center lg:ml-2.5">
                            <img src="/logo512.png" className="h-6 mr-2" alt="Logo"/>
                            <span className="self-center whitespace-nowrap">ADMIN</span>
                        </react_router_dom_1.Link>

                        <form className="hidden lg:block lg:pl-32">
                            <div className="relative">
                                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                    <Icon_1.SearchIcon />
                                </div>
                                <input className="pl-10" type="text" placeholder="Search"/>
                            </div>
                        </form>
                    </div>
                    {user && <div className="font-medium">Hi {user.fullName}</div>}
                </div>
            </div>
        </nav>);
};
exports.Header = Header;
