"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sorting = void 0;
const react_1 = __importDefault(require("react"));
const router_1 = require("next/router");
const Sorting = ({ onClick }) => {
    var _a, _b;
    const router = (0, router_1.useRouter)();
    const handleSortType = (event) => {
        var _a, _b, _c;
        event.preventDefault();
        const sort = event.target.value;
        const brand = ((_a = router.query) === null || _a === void 0 ? void 0 : _a.brand) || 'default';
        const min = ((_b = router.query) === null || _b === void 0 ? void 0 : _b.min) || 0;
        const max = ((_c = router.query) === null || _c === void 0 ? void 0 : _c.max) || 999999999999;
        const query = { sort: sort, brand: brand, min: min, max: max };
        router.push({ pathname: `/category/${router.query.slug}`, query: query });
    };
    return (<div className="mb-4 flex items-center">
            <button onClick={onClick} className="bg-primary border border-primary text-white md:px-10 px-4 md:py-3 py-2 font-medium rounded uppercase block hover:opacity-75 lg:hidden text-sm mr-3 focus:outline-none">
                Bộ Lọc
            </button>
            <select defaultValue={(_b = (_a = router.query) === null || _a === void 0 ? void 0 : _a.sort) !== null && _b !== void 0 ? _b : 'asc'} onChange={(event) => handleSortType(event)} className="w-48 text-sm text-gray-600 px-4 py-3 border-gray-300 shadow-sm rounded focus:ring-primary focus:outline-none">
                <option value="asc">Thứ Tự Mặc Định</option>
                <option value="price">Giá Từ Thấp Đến Cao</option>
                <option value="-price">Giá Từ Cao Đến Thấp</option>
                <option value="desc">Sản Phẩm Mới Nhất</option>
            </select>
        </div>);
};
exports.Sorting = Sorting;
