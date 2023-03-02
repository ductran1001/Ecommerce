"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sidebar = void 0;
const react_router_dom_1 = require("react-router-dom");
const react_redux_1 = require("react-redux");
const authSlice_1 = require("redux/slice/authSlice");
const SidebarList = [
    {
        name: 'Dashboard',
        url: '/admin/dashboard',
        icon: <img src="/icon/Dashboard.png" className="w-8 h-8" alt="Dashboard"/>,
    },
    { name: 'Users', url: '/admin/users', icon: <img src="/icon/Users.png" className="w-8 h-8" alt="Users"/> },
    {
        name: 'Category',
        url: '/admin/categories',
        icon: <img src="/icon/Category.png" className="w-8 h-8" alt="Category"/>,
    },
    { name: 'Color', url: '/admin/colors', icon: <img src="/icon/Color.png" className="w-8 h-8" alt="Color"/> },
    { name: 'Brand', url: '/admin/brands', icon: <img src="/icon/Brands.png" className="w-8 h-8" alt="Brands"/> },
    {
        name: 'Sliders',
        url: '/admin/sliders',
        icon: <img src="/icon/Sliders.png" className="w-8 h-8" alt="Sliders"/>,
    },
    {
        name: 'Orders',
        url: '/admin/orders',
        icon: <img src="/icon/orders.png" className="w-8 h-8" alt="Orders"/>,
    },
    {
        name: 'Products',
        url: '/admin/products',
        icon: <img src="/icon/Products.png" className="w-8 h-8" alt="Products"/>,
    },
];
const Sidebar = ({ showSidebar, handleShowSidebar }) => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const isShow = showSidebar ? '' : 'hidden';
    const handleLogout = () => {
        dispatch((0, authSlice_1.logoutUser)({ user: null }));
        window.localStorage.clear();
        navigate('/admin/login');
    };
    return (<>
            <aside className={`${isShow ? '' : 'z-20'} fixed h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75`}>
                <div className={`${isShow} relative flex-1 md:flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0`}>
                    <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
                        <div className="flex-1 px-3 space-y-1 bg-white divide-y">
                            <ul className="pb-2 space-y-2">
                                <li>
                                    <form className="lg:hidden">
                                        <label htmlFor="mobile-search" className="sr-only">
                                            Search
                                        </label>
                                        <input className="pl-10" type="text" placeholder="Search"/>
                                    </form>
                                </li>

                                {SidebarList.map((sidebar, index) => (<li key={index}>
                                        <react_router_dom_1.Link to={sidebar.url} className="flex items-center p-2 text-sm font-medium text-gray-900 uppercase rounded-lg hover:bg-gray-100">
                                            <div>{sidebar.icon}</div>
                                            <div className="ml-3">{sidebar.name}</div>
                                        </react_router_dom_1.Link>
                                    </li>))}

                                <li>
                                    <button onClick={handleLogout} className="flex items-center w-full p-2 text-sm font-medium text-gray-900 uppercase rounded-lg hover:bg-gray-100">
                                        <img src="/icon/Log-Out.png" className="w-8 h-8" alt="Log-Out"/>
                                        <span className="ml-3">Log Out</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </aside>
            <div onClick={handleShowSidebar} className={`${isShow} bg-gray-900 opacity-50 fixed inset-0 z-10`}/>
        </>);
};
exports.Sidebar = Sidebar;
