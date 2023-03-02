import { Layout } from '@/components/common/Layout';
import { CheckoutForm } from '@/components/pages/Checkout/CheckoutForm';
import { CheckoutSummary } from '@/components/pages/Checkout/CheckoutSummary';
import { RootState } from '@/redux/store';
import { ICategory } from '@/types';
import Link from 'next/link';
import { useSelector } from 'react-redux';

interface ICheckout {
    dataCategories: ICategory[];
}
const Checkout: React.FC<ICheckout> = ({ dataCategories }) => {
    const cart = useSelector((state: RootState) => state.cart);

    return (
        <Layout dataCategories={dataCategories}>
            <div className="bg-white px-6 pt-6 pb-3">
                {cart.length === 0 ? (
                    <div className="text-center py-8">
                        <Link href="/" className="bg-primary text-white px-4 py-2.5 text-sm uppercase">
                            Quay Lại Trang Chủ
                        </Link>
                    </div>
                ) : (
                    <div className="lg:grid grid-cols-12 gap-6 items-start pb-16 pt-4">
                        <CheckoutForm />
                        <CheckoutSummary />
                    </div>
                )}
            </div>
        </Layout>
    );
};
export { getStaticProps } from 'lib/getStaticProps';
export default Checkout;
