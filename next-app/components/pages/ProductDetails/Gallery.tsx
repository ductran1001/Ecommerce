/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { IProduct } from '@/types';

type Props = {
    singleProduct: IProduct;
};

export const Gallery = ({ singleProduct }: Props) => {
    const [indexImg, setIndexImg] = React.useState(0);
    return (
        <div>
            <div className="w-1/2 flex items-center m-auto">
                {singleProduct && <img alt="" src={singleProduct?.imageURL[indexImg]} className="w-full" />}
            </div>
            <div className="grid lg:grid-cols-6 sm:grid-cols-4 mt-4 gap-2">
                {singleProduct?.imageURL.map((image, index) => (
                    <div onClick={() => setIndexImg(index)} key={index}>
                        <img
                            alt=""
                            src={image}
                            className="single-img py-2.5 w-full cursor-pointer border border-gray-300"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
