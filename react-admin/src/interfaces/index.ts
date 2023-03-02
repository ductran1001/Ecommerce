export interface IUser {
    _id: string;
    fullName: string;
    email: string;
    password?: string;
    avatar: string;
    address: string;
    role: string;
    phoneNumber: string;
    createdAt: string;
    updatedAt: string;
}

export interface IAuth {
    user?: IUser | null;
}

export interface IError {
    message: string;
}

export interface ICategory {
    _id: string;
    name: string;
    image: string;
    slug: string;
    description: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface IColor {
    _id: string;
    title: string;
    code: string;
    createdAt: string;
    updatedAt: string;
}

export interface IBrand {
    _id: string;
    title: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
}

export interface IProduct {
    _id: string;
    name: string;
    price: number | string;
    slug: string;
    description: string;
    user: IUser;
    category: ICategory;
    imageURL: string[];
    promotion: number;
    active: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface IOrder {
    _id?: string;
    firstName: string;
    name: string;
    city: string;
    address: string;
    phoneNumber: string;
    email: string;
    status: string;
    orderDetails: IOrderDetails[];
    createdAt?: string;
    updatedAt?: string;
}

export interface IOrderDetails {
    productId: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    promotion: number;
}
