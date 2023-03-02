import React from 'react';
import { Layout } from '@/components/common/Layout';
import { ICategory, IBrand, IProductFilter } from '@/types';
import { GetServerSideProps } from 'next';
import { axiosClient } from 'lib/getStaticProps';
import { Sidebar } from '@/components/pages/Category/Sidebar';
import { Sorting } from '@/components/pages/Category/Sorting';
import { ProductWrapper } from '@/components/pages/Category/ProductWrapper';
interface IProps {
    dataCategories: ICategory[];
    dataBrands: IBrand[];
    dataProductFilter: IProductFilter;
}

const CategoryPage = ({ dataCategories, dataBrands, dataProductFilter }: IProps) => {
    const [hiddenSidebar, setHiddenSidebar] = React.useState(true);

    return (
        <Layout dataCategories={dataCategories}>
            <div className="bg-white flex flex-col gap-y-4">
                <div className="bg-white px-6 grid lg:grid-cols-4 gap-6 pt-4 pb-16 items-start relative">
                    <Sidebar
                        onClick={() => setHiddenSidebar(false)}
                        dataBrands={dataBrands}
                        hiddenSidebar={hiddenSidebar}
                    />
                    <div className="col-span-3">
                        <Sorting onClick={() => setHiddenSidebar((prev) => !prev)} />
                        <ProductWrapper dataProductFilter={dataProductFilter} />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const categoryId = context.query?.slug;
    const brandId = context.query?.brand;
    const sort = context.query?.sort || 'asc';
    const min = context.query?.min || 0;
    const max = context.query?.max || 999999999999;

    let query = `?sort=${sort}&category=${categoryId}&price[lte]=${max}&price[gte]=${min}`;

    if (brandId && brandId !== 'default') {
        query = query + `&brand=${brandId}`;
    }
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1

    try {
        const getProductFilter = (await axiosClient(`/api/product${query}`)) ?? [];
        const dataProductFilter = getProductFilter.data ?? [];

        const getAllCategory = await axiosClient.get('/api/category');
        const dataCategories = getAllCategory.data.contents;

        const getAllBrand = await axiosClient.get('/api/brand');
        const dataBrands = getAllBrand.data.contents ?? [];

        // Pass post data to the page via props
        return { props: { dataCategories, dataBrands, dataProductFilter } };
    } catch (error) {
        return { props: {} };
    }
};
export default CategoryPage;
