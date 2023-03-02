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

export interface ICategory {
    _id: string;
    name: string;
    slug: string;
    description: string;
    active: boolean;
    image: string;
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
    price: number;
    slug: string;
    description: string;
    user: IUser;
    category: ICategory;
    imageURL: string[];
    promotion: number;
    brand: IBrand;
    color: IColor[];
    quantity: number;
    active: boolean;
}

export interface ISlider {
    _id: string;
    photo: string;
}

export interface IProductGroup {
    _id: string;
    name: string;
    products: IProduct[];
    count: number;
}
export interface IProductFilter {
    status: string;
    results: number;
    pages: number;
    contents: IProduct[];
}
