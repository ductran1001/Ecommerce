import React from 'react';
import { Layout } from '@/components/common/Layout';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { SidebarAccount } from '@/components/pages/Account/SidebarAccount';
import { ProfileInformation } from '@/components/pages/Account/ProfileInformation';

type Props = {};

const Manage = (props: Props) => {
    const page = 'My Account';
    return (
        <Layout>
            <Breadcrumb page={page} />
            <div className="container lg:grid grid-cols-12 items-start gap-6 pt-4 pb-16">
                <SidebarAccount />
                <ProfileInformation />
            </div>
        </Layout>
    );
};

export default Manage;
