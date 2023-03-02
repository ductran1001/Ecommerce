"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sidebar = void 0;
/* eslint-disable @next/next/no-img-element */
const react_1 = __importDefault(require("react"));
const router_1 = require("next/router");
const fa_1 = require("react-icons/fa");
const link_1 = __importDefault(require("next/link"));
const Sidebar = ({ dataBrands, hiddenSidebar, onClick }) => {
    var _a, _b, _c;
    const router = (0, router_1.useRouter)();
    const sort = ((_a = router.query) === null || _a === void 0 ? void 0 : _a.sort) || 'asc';
    const [price, setPrice] = react_1.default.useState({
        min: Number((_b = router.query) === null || _b === void 0 ? void 0 : _b.min) || 1,
        max: Number((_c = router.query) === null || _c === void 0 ? void 0 : _c.max) || 999999999999,
    });
    const handleChange = (event) => {
        setPrice((prevState) => (Object.assign(Object.assign({}, prevState), { [event.target.name]: event.target.value })));
    };
    const handleFilterPrice = () => {
        var _a, _b;
        const brand = ((_a = router.query) === null || _a === void 0 ? void 0 : _a.brand) || 'default';
        const sort = ((_b = router.query) === null || _b === void 0 ? void 0 : _b.sort) || 'asc';
        const query = { sort: sort, brand: brand, min: price.min, max: price.max };
        router.push({ pathname: `/category/${router.query.slug}`, query: query });
    };
    return (<>
            {hiddenSidebar ? (<div className="col-span-1 bg-white px-4 pt-4 pb-6 shadow rounded overflow-hidden absolute lg:static left-4 top-16 z-10 w-72 lg:w-full lg:block">
                    <div className="divide-gray-200 divide-y space-y-5 relative">
                        <div className="relative">
                            <div onClick={onClick} className="lg:hidden text-gray-400 hover: text-lg absolute right-0 top-0 cursor-pointer">
                                <fa_1.FaTimes />
                            </div>
                            <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Thương hiệu</h3>
                            {dataBrands === null || dataBrands === void 0 ? void 0 : dataBrands.map((item) => (<BrandLists item={item} key={item._id} router={router} sort={sort} price={price}/>))}
                        </div>

                        <div className="pt-4">
                            <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Giá</h3>
                            <div className="mt-4 flex items-center mb-3">
                                <input type="number" min={price.min} max={price.max} defaultValue={1} name="min" onChange={(event) => handleChange(event)} className="w-full border-gray-300 focus:ring-0 focus:border-primary px-3 py-1 text-gray-600 text-sm shadow-sm rounded" placeholder="min"/>
                                <span className="mx-3 text-gray-500">-</span>
                                <input name="max" type="number" min={price.min} max={price.max} onChange={(event) => handleChange(event)} className="w-full border-gray-300 focus:ring-0 focus:border-primary px-3 py-1 text-gray-600 text-sm shadow-sm rounded" placeholder="max"/>
                            </div>
                            <button onClick={() => handleFilterPrice()} className=" bg-primary text-white px-4 py-3 font-medium rounded-md uppercase hover:opacity-75 text-sm w-full block text-center">
                                Lọc
                            </button>
                        </div>
                    </div>
                </div>) : null}
        </>);
};
exports.Sidebar = Sidebar;
const BrandLists = ({ item, router, sort, price }) => {
    const link = `${router.query.slug}?sort=${sort}&brand=${item === null || item === void 0 ? void 0 : item._id}&min=${price.min}&max=${price.max}`;
    return (<link_1.default href={link} className="space-y-2 mb-2">
            <div className="flex items-center">
                <label htmlFor={item === null || item === void 0 ? void 0 : item._id} className="text-gray-600 space-y-2 flex gap-2 items-center ml-3 cursor-pointer">
                    {router.query.brand === (item === null || item === void 0 ? void 0 : item._id) ? (<img src="/images/check.png" className="w-6 h-6" alt=""/>) : (<div className="w-4 h-4 border mr-2"/>)}
                    {item === null || item === void 0 ? void 0 : item.title}
                </label>
            </div>
        </link_1.default>);
};
