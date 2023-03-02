import { Layout } from '@/components/common/Layout';
import { ProductCart } from '@/components/pages/Cart/ProductCart';
import { CartSummary } from '@/components/pages/Cart/CartSummary';
import { ICategory } from '@/types';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Link from 'next/link';

interface ICart {
    dataCategories: ICategory[];
}
const Cart: React.FC<ICart> = ({ dataCategories }) => {
    const cart = useSelector((state: RootState) => state.cart);

    return (
        <Layout dataCategories={dataCategories}>
            <div className="bg-white flex flex-col gap-y-4">
                {cart.length === 0 ? (
                    <div className="text-center py-8">
                        <Link href="/" className="bg-primary text-white px-4 py-2.5 text-sm uppercase">
                            Quay Lại Trang Chủ
                        </Link>
                    </div>
                ) : (
                    <div className="px-6 lg:grid grid-cols-12 gap-6 items-start pb-16 pt-4">
                        <ProductCart />
                        <CartSummary />
                    </div>
                )}
            </div>
        </Layout>
    );
};
export { getStaticProps } from 'lib/getStaticProps';
export default Cart;
