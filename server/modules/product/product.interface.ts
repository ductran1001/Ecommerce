export interface IProduct {
    name: string;
    slug: string;
    description: string;
    user: string;
    category: string;
    imageURL: string[];
    active: boolean;
    softDelete: boolean;
    brand: string;
    sold: number;
    color: string[];
    price: number;
    promotion: number;
    quantity: number;
}
