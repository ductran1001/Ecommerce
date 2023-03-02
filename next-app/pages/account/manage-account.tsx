import React from 'react';
import { Layout } from '@/components/common/Layout';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { SidebarAccount } from '@/components/pages/Account/SidebarAccount';
import { ManageAccount } from '@/components/pages/Account/ManageAccount';

type Props = {};

const ManageAccountPage = (props: Props) => {
    const page = 'My Account';
    return (
        <Layout>
            <Breadcrumb page={page} />
            <div className="container lg:grid grid-cols-12 items-start gap-6 pt-4 pb-16">
                <SidebarAccount />
                <ManageAccount />
            </div>
        </Layout>
    );
};

export default ManageAccountPage;
