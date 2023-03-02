import * as Yup from 'yup';
export const createCategorySchema = Yup.object({
    body: Yup.object({
        name: Yup.string().min(3).required(),
        description: Yup.string().required(),
    }),
});
