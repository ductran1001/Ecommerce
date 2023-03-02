import React from 'react';
import { Layout } from '@/components/common/Layout';
import { Gallery } from '@/components/pages/ProductDetails/Gallery';
import { ContentDetails } from '@/components/pages/ProductDetails/ContentDetails';
import { Description } from '@/components/pages/ProductDetails/Description';
import { Related } from '@/components/pages/ProductDetails/Related';
import { ICategory, IProduct, IProductGroup } from '@/types';
import { GetStaticProps } from 'next';
import { axiosClient } from 'lib/getStaticProps';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/slice/cartSlice';
import toast from 'react-hot-toast';

interface IProps {
    dataCategories: ICategory[];
    singleProduct: IProduct;
    dataProductsGroupCategory: IProductGroup[];
}

const ProductDetails = ({ dataCategories, singleProduct, dataProductsGroupCategory }: IProps) => {
    const dispatch = useDispatch();

    const addCart = (data: IProduct) => {
        dispatch(addToCart(data));
        toast.success('Success');
    };

    const filterProductByCategory =
        dataProductsGroupCategory?.filter((product) => product._id === singleProduct.category._id) ?? [];
    const relatedProducts = filterProductByCategory[0]?.products?.filter((pro) => pro._id !== singleProduct._id) ?? [];

    return (
        <Layout dataCategories={dataCategories}>
            <div className="flex flex-col bg-white gap-y-4">
                <div className="grid gap-6 px-6 py-3 pt-4 pb-6 lg:grid-cols-2">
                    <Gallery singleProduct={singleProduct} />
                    <ContentDetails singleProduct={singleProduct} onClick={() => addCart(singleProduct)} />
                </div>
                <div className="px-6 py-3">
                    <Description singleProduct={singleProduct} />
                    <Related relatedProducts={relatedProducts} />
                </div>
            </div>
        </Layout>
    );
};

export async function getStaticPaths() {
    // Call an external API endpoint to get posts

    const getAllProducts = await axiosClient.get('/api/product');
    const data = getAllProducts.data.contents;

    // Get the paths we want to prerender based on posts
    // In production environments, prerender all pages
    // (slower builds, but faster initial page load)
    const paths = data.map((product: IProduct) => ({
        params: { slug: product.slug },
    }));

    // { fallback: false } means other routes should 404
    return { paths, fallback: true };
}

export const getStaticProps: GetStaticProps = async (context) => {
    const slug = context.params?.slug;

    try {
        // params contains the post `id`.
        // If the route is like /posts/1, then params.id is 1
        const getAllCategory = await axiosClient.get('/api/category');
        const dataCategories = getAllCategory.data.contents;

        const product = await axiosClient(`/api/product-get-by-slug/${slug}`);
        const singleProduct = product.data.contents;

        const getAllProductsGroupCategory = await axiosClient.get('/api/product-group-category');
        const dataProductsGroupCategory = getAllProductsGroupCategory.data;

        // Pass post data to the page via props
        return { props: { dataCategories, singleProduct, dataProductsGroupCategory } };
    } catch (error) {
        return { props: {} };
    }
};
export default ProductDetails;
