/* eslint-disable @next/next/no-img-element */
import { Layout } from '@/components/common/Layout';
import Link from 'next/link';

export default function OrderCompletePage() {
    return (
        <Layout>
            <div className="max-w-3xl mx-auto px-4 pt-16 pb-24 text-center">
                <div className="mb-8">
                    <img alt="" src="/images/complete.png" className="w-16 inline-block" />
                </div>
                <h2 className="text-gray-800 font-medium text-3xl mb-3">YOUR ORDER IS COMPLETED!</h2>
                <p className="text-gray-600 ">
                    Thank you for your order! Your order is being processed and will be completed within 3-6 hours. You
                    will receive an email confirmation when your order is completed.
                </p>
                <div className="mt-10">
                    <Link
                        href="/"
                        className="bg-primary text-white px-6 py-3 font-medium rounded-md uppercase hover:opacity-75 text-center"
                    >
                        Continue shopping
                    </Link>
                </div>
            </div>
        </Layout>
    );
}
