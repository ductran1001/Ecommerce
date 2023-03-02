import React from 'react';
import { Layout } from '@/components/common/Layout';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { SidebarAccount } from '@/components/pages/Account/SidebarAccount';
import { Wishlist } from '@/components/pages/Account/Wishlist';

type Props = {};

const WishlistPage = (props: Props) => {
    const page = 'My Account';
    return (
        <Layout>
            <Breadcrumb page={page} />
            <div className="container lg:grid grid-cols-12 items-start gap-6 pt-4 pb-16">
                <SidebarAccount />
                <Wishlist />
            </div>
        </Layout>
    );
};

export default WishlistPage;
