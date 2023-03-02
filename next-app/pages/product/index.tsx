import { Layout } from '@/components/common/Layout';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { ICategory, IProduct, ISlider } from '@/types';

interface IProps {
    dataCategories: ICategory[];
    dataProducts: IProduct[];
    dataSliders: ISlider[];
}

const ProductPage: React.FC<IProps> = ({ dataSliders, dataCategories, dataProducts }) => {
    const page = 'Product';

    return (
        <Layout>
            <Breadcrumb page={page} />

            <div className="container relative grid items-start gap-6 pt-4 pb-16 lg:grid-cols-4"></div>
        </Layout>
    );
};
export default ProductPage;

export { getStaticProps } from 'lib/getStaticProps';
