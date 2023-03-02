import numeral from 'numeral';
import React from 'react';

type Props = {
    promotion: number;
    price: number;
    text?: string;
};

export const FormatPrice = ({ promotion, price, text = 'text-xs' }: Props) => {
    const getPricePromotion = Math.round(price - (price / 100) * promotion);
    return (
        <div className="flex items-baseline mb-1 space-x-2">
            {promotion > 0 ? (
                <>
                    <span className={`${text} font-semibold font-roboto`}>
                        {promotion > 0 ? numeral(getPricePromotion).format('0,0') : null}
                    </span>
                    <span className="text-sm text-gray-400 line-through font-roboto">
                        {numeral(price).format('0,0')}
                    </span>
                </>
            ) : (
                <span className={`${text} font-semibold font-roboto`}>{numeral(price).format('0,0')}</span>
            )}
        </div>
    );
};
