import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';

type Props = {
    children?: React.ReactNode;
};

export const Main = ({ children }: Props) => {
    const [showSidebar, setShowSidebar] = React.useState(false);
    const { user } = useSelector((state: RootState) => state.auth);

    return (
        <div className="min-h-screen flex flex-col">
            {user && (
                <>
                    <Header showSidebar={showSidebar} handleShowSidebar={() => setShowSidebar((pre) => !pre)} />

                    <div className="flex flex-row overflow-hidden bg-white pt-16 h-screen">
                        <Sidebar showSidebar={showSidebar} handleShowSidebar={() => setShowSidebar((pre) => !pre)} />
                        <main className="h-full w-full bg-gray-50 relative overflow-y-auto md:ml-64">{children}</main>
                    </div>
                </>
            )}

            {!user && (
                <div className="flex flex-row overflow-hidden bg-gray-50 pt-16 h-screen">
                    <main className="h-full w-full bg-gray-50 relative overflow-y-auto">{children}</main>
                </div>
            )}
        </div>
    );
};
