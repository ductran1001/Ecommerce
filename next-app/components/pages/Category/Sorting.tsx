import React from 'react';
import { useRouter } from 'next/router';

type Props = {
    onClick: () => void;
};

export const Sorting = ({ onClick }: Props) => {
    const router = useRouter();

    const handleSortType = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        event.preventDefault();
        const sort = event.target.value;
        const brand = router.query?.brand || 'default';
        const min = router.query?.min || 0;
        const max = router.query?.max || 999999999999;
        const query = { sort: sort, brand: brand, min: min, max: max };
        router.push({ pathname: `/category/${router.query.slug}`, query: query });
    };
    return (
        <div className="mb-4 flex items-center">
            <button
                onClick={onClick}
                className="bg-primary border border-primary text-white md:px-10 px-4 md:py-3 py-2 font-medium rounded uppercase block hover:opacity-75 lg:hidden text-sm mr-3 focus:outline-none"
            >
                Bộ Lọc
            </button>
            <select
                defaultValue={router.query?.sort ?? 'asc'}
                onChange={(event) => handleSortType(event)}
                className="w-48 text-sm text-gray-600 px-4 py-3 border-gray-300 shadow-sm rounded focus:ring-primary focus:outline-none"
            >
                <option value="asc">Thứ Tự Mặc Định</option>
                <option value="price">Giá Từ Thấp Đến Cao</option>
                <option value="-price">Giá Từ Cao Đến Thấp</option>
                <option value="desc">Sản Phẩm Mới Nhất</option>
            </select>
        </div>
    );
};
