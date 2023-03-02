import React from 'react';
import { IProduct } from '@/types';

type Props = {
    singleProduct: IProduct;
};

export const Description = ({ singleProduct }: Props) => {
    return (
        <div className="pb-16">
            <h3 className="border-b border-gray-200 font-roboto text-gray-800 pb-3 font-medium">
                Thông tin chi tiết sản phẩm
            </h3>
            <div className="lg:w-4/5 xl:w-3/5 pt-6">
                <div dangerouslySetInnerHTML={{ __html: singleProduct?.description }}></div>
                <table className="table-auto border-collapse w-full text-left text-gray-600 text-sm mt-6">
                    <tbody>
                        <tr>
                            <th className="py-2 px-4 border border-gray-300 w-40 font-medium">MÀU SẮC</th>
                            <td className="py-2 px-4 border border-gray-300 flex gap-2">
                                {singleProduct?.color?.map((color, index) => (
                                    <p key={index}>{color.title}</p>
                                ))}
                            </td>
                        </tr>
                        <tr>
                            <th className="py-2 px-4 border border-gray-300 w-40 font-medium">THƯƠNG HIỆU</th>
                            <td className="py-2 px-4 border border-gray-300">{singleProduct?.brand.title}</td>
                        </tr>
                        <tr>
                            <th className="py-2 px-4 border border-gray-300 w-40 font-medium">DANH MỤC</th>
                            <td className="py-2 px-4 border border-gray-300">{singleProduct?.category.name}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
