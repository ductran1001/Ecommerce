"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const react_1 = __importDefault(require("react"));
const api_1 = require("api");
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const Page = __importStar(require("pages"));
const IsRedirect = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const token = window.localStorage.getItem('token');
    const refreshToken = window.localStorage.getItem('refreshToken');
    react_1.default.useEffect(() => {
        if (token && refreshToken)
            (0, api_1.getUserApi)(dispatch);
        if (!token || !refreshToken)
            window.localStorage.clear();
    }, [token, refreshToken, dispatch]);
    const { user } = (0, react_redux_1.useSelector)((state) => state.auth);
    const isRedirect = !user && !refreshToken && !token;
    return isRedirect;
};
const PrivateRoutes = () => {
    const isRedirect = IsRedirect();
    return isRedirect ? <react_router_dom_1.Navigate to="/admin/login" replace/> : <react_router_dom_1.Outlet />;
};
const PrivateRoutesAdmin = () => {
    const { user } = (0, react_redux_1.useSelector)((state) => state.auth);
    if (user) {
        const isRedirect = Boolean(user.role === 'admin');
        return isRedirect ? (<react_router_dom_1.Outlet />) : ((react_hot_toast_1.default.error('You are not an administrator'), (<react_router_dom_1.Navigate to="/admin/dashboard" replace/>)));
    }
    else {
        return <react_router_dom_1.Outlet />;
    }
};
exports.routes = [
    {
        path: '/admin/login',
        element: <Page.Login />,
    },
    {
        path: '/admin/register',
        element: <Page.Register />,
    },
    {
        element: <PrivateRoutes />,
        children: [
            { path: '/admin/dashboard', element: <Page.Dashboard /> },
            { path: '/', element: <Page.Dashboard /> },
            {
                element: <PrivateRoutesAdmin />,
                children: [
                    { path: '/admin/users', element: <Page.ListUser /> },
                    { path: '/admin/users/create', element: <Page.CreateUser /> },
                    { path: '/admin/users/update/:id', element: <Page.UpdateUser /> },
                    { path: '/admin/users/updatePassword/:id', element: <Page.UpdatePassword /> },
                ],
            },
            { path: '/admin/categories', element: <Page.ListCategory /> },
            { path: '/admin/categories/trash', element: <Page.ListCategory /> },
            { path: '/admin/categories/create', element: <Page.CreateCategory /> },
            { path: '/admin/categories/update/:id', element: <Page.UpdateCategory /> },
            { path: '/admin/colors', element: <Page.ListColor /> },
            // { path: '/admin/colors/trash', element: <Page.ListColor /> },
            { path: '/admin/colors/create', element: <Page.CreateColor /> },
            { path: '/admin/colors/update/:id', element: <Page.UpdateColor /> },
            { path: '/admin/brands', element: <Page.ListBrand /> },
            // { path: '/admin/brands/trash', element: <Page.ListBrand /> },
            { path: '/admin/brands/create', element: <Page.CreateBrand /> },
            { path: '/admin/brands/update/:id', element: <Page.UpdateBrand /> },
            { path: '/admin/sliders', element: <Page.ListSlider /> },
            { path: '/admin/orders', element: <Page.ListOrder /> },
            { path: '/admin/orders/create', element: <Page.CreateOrder /> },
            { path: '/admin/orders/update/:id', element: <Page.UpdateOrder /> },
            { path: '/admin/products', element: <Page.ListProduct /> },
            { path: '/admin/products/trash', element: <Page.ListProduct /> },
            { path: '/admin/products/create', element: <Page.CreateProduct /> },
            { path: '/admin/products/update/:id', element: <Page.UpdateProduct /> },
        ],
    },
    { path: '*', element: <Page.NotFound /> },
];
