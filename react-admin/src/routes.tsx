import React from 'react';
import { getUserApi } from 'api';
import { RootState } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import toast from 'react-hot-toast';
import * as Page from 'pages';

const IsRedirect = () => {
    const dispatch = useDispatch();
    const token = window.localStorage.getItem('token');
    const refreshToken = window.localStorage.getItem('refreshToken');

    React.useEffect(() => {
        if (token && refreshToken) getUserApi(dispatch);
        if (!token || !refreshToken) window.localStorage.clear();
    }, [token, refreshToken, dispatch]);

    const { user } = useSelector((state: RootState) => state.auth);

    const isRedirect = !user && !refreshToken && !token;

    return isRedirect;
};

const PrivateRoutes = () => {
    const isRedirect = IsRedirect();

    return isRedirect ? <Navigate to="/admin/login" replace /> : <Outlet />;
};

const PrivateRoutesAdmin = () => {
    const { user } = useSelector((state: RootState) => state.auth);

    if (user) {
        const isRedirect = Boolean(user.role === 'admin');

        return isRedirect ? (
            <Outlet />
        ) : (
            (toast.error('You are not an administrator'), (<Navigate to="/admin/dashboard" replace />))
        );
    } else {
        return <Outlet />;
    }
};

export const routes = [
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
