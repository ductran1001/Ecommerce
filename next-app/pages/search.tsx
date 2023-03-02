import React from 'react';
import { useDispatch } from 'react-redux';
import { Layout } from '@/components/common/Layout';
import { ICategory, IProduct } from '@/types';
import { GetServerSideProps } from 'next';
import { axiosClient } from '@/lib/getStaticProps';
import { CardProduct } from '@/components/card/CardProduct';
import { addToCart } from '@/redux/slice/cartSlice';
import toast from 'react-hot-toast';

interface IProps {
    dataCategories: ICategory[];
    dataProductsSearch: IProduct[];
}

const Search = ({ dataCategories, dataProductsSearch }: IProps) => {
    const [slice, setSlice] = React.useState(4);

    const dispatch = useDispatch();

    const addCart = (data: IProduct) => {
        dispatch(addToCart(data));
        toast.success('Success');
    };
    return (
        <Layout dataCategories={dataCategories}>
            {dataProductsSearch?.length > 0 && (
                <div className="bg-white flex flex-col gap-y-4">
                    <div className="pb-12 px-6 py-3 mt-8">
                        <div className="grid gap-6 lg:grid-cols-6 sm:grid-cols-3">
                            {dataProductsSearch?.slice(0, slice).map((product) => (
                                <CardProduct key={product._id} product={product} onClick={() => addCart(product)} />
                            ))}
                        </div>
                        {dataProductsSearch.length !== slice && (
                            <div className="text-center mt-12">
                                <button
                                    onClick={() => setSlice((prev) => prev + 4)}
                                    className="px-6 hover:opacity-75 py-2.5 bg-primary text-white uppercase"
                                >
                                    Xem Thêm
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const getAllCategory = await axiosClient.get('/api/category');
        const dataCategories = getAllCategory.data.contents;

        const getAllProductSearch = await axiosClient.get(`/api/product/search?q=${context.query?.q}`);
        const dataProductsSearch = getAllProductSearch.data.contents;
        // Pass post data to the page via props
        return { props: { dataCategories, dataProductsSearch } };
    } catch (error) {
        return { props: {} };
    }
};
export default Search;
