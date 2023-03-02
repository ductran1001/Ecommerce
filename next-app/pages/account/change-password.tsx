import React from 'react';
import { Layout } from '@/components/common/Layout';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { SidebarAccount } from '@/components/pages/Account/SidebarAccount';
import { ChangePassword } from '@/components/pages/Account/ChangePassword';

type Props = {};

const ChangePasswordPage = (props: Props) => {
    const page = 'My Account';
    return (
        <Layout>
            <Breadcrumb page={page} />
            <div className="container lg:grid grid-cols-12 items-start gap-6 pt-4 pb-16">
                <SidebarAccount />
                <ChangePassword />
            </div>
        </Layout>
    );
};

export default ChangePasswordPage;
