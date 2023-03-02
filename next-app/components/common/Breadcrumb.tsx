import React from 'react';
import { FaChevronRight, FaHome } from 'react-icons/fa';

interface IProps {
    title?: string;
    page: string;
}
export const Breadcrumb: React.FC<IProps> = ({ title, page }) => {
    return (
        <div className="container flex justify-between py-4">
            <div className="flex items-center gap-3">
                <a href="index.html" className="text-base ">
                    <FaHome />
                </a>
                <span className="text-sm text-gray-400">
                    <FaChevronRight />
                    <i className="fas fa-chevron-right" />
                </span>
                <p className="font-medium text-gray-600">{page}</p>

                {title && (
                    <>
                        <span className="text-sm text-gray-400">
                            <FaChevronRight />
                        </span>
                        <p className="text-gray-600 font-medium uppercase">{title}</p>
                    </>
                )}
            </div>
        </div>
    );
};
