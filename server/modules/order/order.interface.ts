export interface IOrder {
    firstName: string;
    name: string;
    city: string;
    address: string;
    phoneNumber: string;
    email: string;
    status: string;
    orderDetails: IOrderDetails[];
}

export interface IOrderDetails {
    productId: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    promotion: number;
}
