import Head from 'next/head';
import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ICategory } from '@/types';

type IProps = {
    children?: React.ReactNode;
    dataCategories?: ICategory[];
};

export const Layout = ({ children, dataCategories }: IProps) => {
    return (
        <>
            <Head>
                <title>Home</title>
                <meta name="description" content="Generated by Home" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header dataCategories={dataCategories} />
            <main className="md:mt-0 mt-16">{children}</main>
            <Footer />
        </>
    );
};
