import { Banner } from '@/components/pages/Home/Banner';
import { Features } from '@/components/pages/Home/Features';
import { Layout } from '@/components/common/Layout';
import { ICategory, ISlider, IProductGroup } from '@/types';
import { ProductHome } from '@/components/pages/Home/ProductHome';

interface IHome {
    dataCategories: ICategory[];
    dataSliders: ISlider[];
    dataProductsGroupCategory: IProductGroup[];
}

const Home: React.FC<IHome> = ({ dataSliders, dataCategories, dataProductsGroupCategory }) => {
    return (
        <Layout dataCategories={dataCategories}>
            <Banner dataSliders={dataSliders} />
            <div className="bg-white flex flex-col gap-y-4">
                <Features />
                <ProductHome dataProductsGroupCategory={dataProductsGroupCategory} />
            </div>
        </Layout>
    );
};

export { getStaticProps } from 'lib/getStaticProps';
export default Home;
