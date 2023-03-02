import * as Yup from 'yup';
export const productSchema = Yup.object({
    body: Yup.object({
        name: Yup.string().required(),
        category: Yup.string().required(),
        brand: Yup.string().required(),
        imageURL: Yup.array().required(),
        quantity: Yup.number().required(),
        price: Yup.number().typeError('Price must be a number!').required().min(1),
        description: Yup.string().required(),
    }),
});
