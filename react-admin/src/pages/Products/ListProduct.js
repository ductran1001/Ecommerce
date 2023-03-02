"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListProduct = void 0;
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const react_query_1 = require("@tanstack/react-query");
const numeral_1 = __importDefault(require("numeral"));
const Layouts = __importStar(require("components/Layouts"));
const Apis = __importStar(require("api"));
const ListProduct = () => {
    var _a, _b, _c;
    const navigation = (0, react_router_dom_1.useNavigate)();
    const queryClient = (0, react_query_1.useQueryClient)();
    const [checked, setChecked] = react_1.default.useState([]);
    const [categories, setCategories] = react_1.default.useState([]);
    const [linkSearch, setLinkSearch] = react_1.default.useState({
        sort: 'asc',
        categoryLink: 'default',
    });
    const { search } = (0, react_router_dom_1.useLocation)();
    const getCatUrl = (_a = search === null || search === void 0 ? void 0 : search.split('&')[1]) === null || _a === void 0 ? void 0 : _a.replace('category=', '');
    const getSortUrl = (_b = search === null || search === void 0 ? void 0 : search.split('&')[2]) === null || _b === void 0 ? void 0 : _b.replace('sort=', '');
    react_1.default.useEffect(() => {
        getCatUrl
            ? setLinkSearch((prevState) => (Object.assign(Object.assign({}, prevState), { categoryLink: getCatUrl })))
            : setLinkSearch((prevState) => (Object.assign(Object.assign({}, prevState), { categoryLink: 'default' })));
        getSortUrl
            ? setLinkSearch((prevState) => (Object.assign(Object.assign({}, prevState), { sort: getSortUrl })))
            : setLinkSearch((prevState) => (Object.assign(Object.assign({}, prevState), { sort: 'asc' })));
    }, [getCatUrl, getSortUrl]);
    const getPageUrl = (search === null || search === void 0 ? void 0 : search.split('&')[0]) || '?page=1';
    const PAGE = Number(getPageUrl.split('=')[1]) || 1;
    const LIMIT = 10;
    const softDelete = Boolean((0, react_router_dom_1.useLocation)().pathname.includes('/trash'));
    const handleDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
        mutationDelete.mutate(id, {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: [
                        softDelete ? 'products-trash' : 'products',
                        'type',
                        'category',
                        PAGE,
                        linkSearch.sort,
                        linkSearch.categoryLink,
                    ],
                    exact: true,
                });
                react_hot_toast_1.default.success('Delete Success');
            },
            onError(error) {
                var _a, _b;
                const mgs = (_b = ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data).message) !== null && _b !== void 0 ? _b : 'Something went wrong!';
                react_hot_toast_1.default.error(mgs);
            },
        });
    });
    const handleCheckbox = (id) => {
        checked.includes(id) ? setChecked(checked.filter((data) => data !== id)) : setChecked([...checked, id]);
    };
    const handleCheckboxAll = (arrayId, event) => {
        (event === null || event === void 0 ? void 0 : event.target.checked) ? setChecked(arrayId) : setChecked([]);
    };
    const handleDeleteMulti = (item) => __awaiter(void 0, void 0, void 0, function* () {
        if (item.length > 0) {
            mutationDeleteMulti.mutate(item, {
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey: [
                            softDelete ? 'products-trash' : 'products',
                            'type',
                            'category',
                            PAGE,
                            linkSearch.sort,
                            linkSearch.categoryLink,
                        ],
                        exact: true,
                    });
                    react_hot_toast_1.default.success('Delete Success');
                    setChecked([]);
                },
                onError(error) {
                    var _a, _b;
                    const mgs = (_b = ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data).message) !== null && _b !== void 0 ? _b : 'Something went wrong!';
                    react_hot_toast_1.default.error(mgs);
                },
            });
        }
    });
    const handleDeleteMultiTrash = (item) => __awaiter(void 0, void 0, void 0, function* () {
        if (item.length > 0) {
            mutationDeleteMultiTrash.mutate(item, {
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey: [
                            softDelete ? 'products-trash' : 'products',
                            'type',
                            'category',
                            PAGE,
                            linkSearch.sort,
                            linkSearch.categoryLink,
                        ],
                        exact: true,
                    });
                    react_hot_toast_1.default.success('Delete Trash Success');
                    setChecked([]);
                },
                onError(error) {
                    var _a, _b;
                    const mgs = (_b = ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data).message) !== null && _b !== void 0 ? _b : 'Something went wrong!';
                    react_hot_toast_1.default.error(mgs);
                },
            });
        }
    });
    const handleRestoreMulti = (item) => __awaiter(void 0, void 0, void 0, function* () {
        if (item.length > 0) {
            mutationRestoreMulti.mutate(item, {
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey: [
                            softDelete ? 'products-trash' : 'products',
                            'type',
                            'category',
                            PAGE,
                            linkSearch.sort,
                            linkSearch.categoryLink,
                        ],
                        exact: true,
                    });
                    react_hot_toast_1.default.success('Restore Success');
                    setChecked([]);
                },
                onError(error) {
                    var _a, _b;
                    const mgs = (_b = ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data).message) !== null && _b !== void 0 ? _b : 'Something went wrong!';
                    react_hot_toast_1.default.error(mgs);
                },
            });
        }
    });
    const handleSortCat = (event) => {
        event.preventDefault();
        const category_id = event.target.value;
        setLinkSearch((prevState) => (Object.assign(Object.assign({}, prevState), { categoryLink: category_id })));
        const link = `?page=${PAGE}&category=${category_id}&sort=${linkSearch.sort}`;
        navigation(link);
    };
    const handleSortType = (event) => {
        event.preventDefault();
        const type = event.target.value;
        setLinkSearch((prevState) => (Object.assign(Object.assign({}, prevState), { sort: type })));
        const link = `?page=${PAGE}&category=${linkSearch.categoryLink}&sort=${type}`;
        navigation(link);
    };
    const query = (0, react_query_1.useQuery)({
        queryKey: [
            softDelete ? 'products-trash' : 'products',
            'type',
            'category',
            PAGE,
            linkSearch.sort,
            linkSearch.categoryLink,
        ],
        queryFn: () => softDelete
            ? Apis.getListProductsTrash(PAGE, LIMIT, true, linkSearch.categoryLink !== 'default' ? linkSearch.categoryLink : undefined, linkSearch.sort)
            : Apis.getListProducts(PAGE, LIMIT, linkSearch.categoryLink !== 'default' ? linkSearch.categoryLink : undefined, linkSearch.sort),
        keepPreviousData: true,
        retry: 0,
    });
    const queryCategories = (0, react_query_1.useQuery)({
        queryKey: ['categories'],
        queryFn: () => Apis.getListCategories(),
        onSuccess: (data) => setCategories(data.data.contents),
    });
    const mutationDelete = (0, react_query_1.useMutation)({ mutationFn: (id) => Apis.destroyProduct(id) });
    const mutationDeleteMulti = (0, react_query_1.useMutation)({ mutationFn: (id) => Apis.deleteMultiProduct(id) });
    const mutationRestoreMulti = (0, react_query_1.useMutation)({ mutationFn: (id) => Apis.restoreMultiProduct(id) });
    const mutationDeleteMultiTrash = (0, react_query_1.useMutation)({ mutationFn: (id) => Apis.deleteMultiTrashProduct(id) });
    const response = (_c = query.data) === null || _c === void 0 ? void 0 : _c.data;
    if (query.error)
        return Layouts.Error(query.error.message);
    const isLoad = query.isLoading ||
        queryCategories.isLoading ||
        mutationDelete.isLoading ||
        mutationDeleteMulti.isLoading ||
        mutationRestoreMulti.isLoading ||
        mutationDeleteMultiTrash.isLoading;
    return (<div className="flex flex-col h-full gap-8 px-4 pt-12">
            {isLoad ? <Layouts.Loading /> : null}

            <Layouts.Breadcrumb page="products"/>

            <div className="pb-8">
                <div className="flex items-center gap-12">
                    <div className="flex items-center gap-2">
                        <react_router_dom_1.Link to="/admin/products/create" className="flex items-center w-12 h-12">
                            <div className="m-auto">
                                <img src="/icon/plus.png" className="w-10 h-10" alt=""/>
                            </div>
                        </react_router_dom_1.Link>
                        <div className="flex items-center justify-center w-40  text-red-500 border border-gray-200">
                            {softDelete ? (<button onClick={() => handleDeleteMultiTrash(checked)} type="button" className="uppercase py-3">
                                    Delete Trash
                                </button>) : (<button onClick={() => handleDeleteMulti(checked)} type="button" className="uppercase py-3">
                                    Delete Multiple
                                </button>)}
                        </div>
                        <div className="flex items-center justify-center w-40  text-blue-500 border border-gray-200">
                            {softDelete ? (<button onClick={() => handleRestoreMulti(checked)} className="uppercase py-3">
                                    restore items
                                </button>) : (<react_router_dom_1.Link to="/admin/products/trash" className="uppercase py-3">
                                    trash items
                                </react_router_dom_1.Link>)}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className=" flex items-center">
                            <select value={linkSearch.sort} onChange={(event) => handleSortType(event)} className="w-44 text-sm text-gray-600 px-4 py-3 border-gray-300 shadow-sm rounded focus:ring-primary focus:border-primary focus:outline-none">
                                <option value="asc">Default sorting</option>
                                <option value="price">Price low-high</option>
                                <option value="-price">Price high-low</option>
                                <option value="desc">Latest product</option>
                            </select>
                        </div>

                        <div className="flex items-center">
                            {queryCategories.error ? (<div className="text-red-500">
                                    An error has occurred:
                                    {queryCategories.error.message}
                                </div>) : (categories.length > 0 && (<select value={linkSearch.categoryLink} name="category" className="w-44 text-sm text-gray-600 px-4 py-3 border-gray-300 shadow-sm rounded focus:ring-primary focus:border-primary focus:outline-none" onChange={(event) => handleSortCat(event)}>
                                        <option value="default">Sorting Category</option>

                                        {categories.map((category, index) => (<option value={category._id} key={index}>
                                                {category.name}
                                            </option>))}
                                    </select>))}
                        </div>
                    </div>
                </div>

                <div className="w-full my-8 overflow-x-auto">
                    <table className="w-full text-left text-gray-500 bg-white shadow-md sm:rounded-lg">
                        <thead className="text-sm text-gray-700 uppercase bg-slate-300">
                            <tr>
                                <th scope="col" className="p-4">
                                    <div className="flex items-center">
                                        <input onChange={(event) => handleCheckboxAll([...response === null || response === void 0 ? void 0 : response.contents.map((product) => product._id)], event)} className="pl-10" checked={(response === null || response === void 0 ? void 0 : response.contents.length) === checked.length &&
            (response === null || response === void 0 ? void 0 : response.contents.length) > 0} type="checkbox" id="checkbox-all"/>
                                        <label htmlFor="checkbox-all" className="sr-only">
                                            checkbox
                                        </label>
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    Price
                                </th>

                                <th scope="col" className="px-6 py-4">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {response &&
            response.contents.map((pro, index) => {
                var _a;
                return (<tr key={index} className="border-b hover:bg-gray-50">
                                        <td className="w-4 p-4">
                                            <div className="flex items-center">
                                                <input id="checkbox" type="checkbox" checked={checked.includes(pro._id)} onChange={() => handleCheckbox(pro._id)}/>
                                                <label htmlFor="checkbox" className="sr-only">
                                                    checkbox
                                                </label>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 capitalize max-w-[250px]">
                                            <div className="flex items-center w-full gap-2">
                                                <div className="h-40 w-[150px]">
                                                    <img src={pro.imageURL[0]} alt="" className="w-full h-full rounded-lg"/>
                                                </div>
                                                <div className="flex-1">{pro.name}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 capitalize max-w-[150px] truncate">
                                            {(_a = pro === null || pro === void 0 ? void 0 : pro.category) === null || _a === void 0 ? void 0 : _a.name}
                                        </td>
                                        <td className="px-6 py-4 capitalize max-w-[150px] truncate">
                                            {(0, numeral_1.default)(pro.price).format('0,0')}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className={`
                                                ${pro.active ? 'bg-green-500' : 'bg-red-500'} 
                                                h-2.5 w-2.5 rounded-full mr-2 `}/>
                                                {pro.active ? 'Active' : 'Inactive'}
                                            </div>
                                        </td>

                                        <td className="gap-2 px-6 py-4">
                                            <div className="flex items-center mb-2">
                                                <react_router_dom_1.Link to={`/admin/products/update/${pro._id}`} className="mr-2 font-medium text-blue-600 hover:underline">
                                                    <div>
                                                        <img src="/icon/edit-color.png" className="w-6 h-6" alt=""/>
                                                    </div>
                                                </react_router_dom_1.Link>
                                                <button onClick={() => handleDelete(pro._id)} className="font-medium text-red-600 hover:underline">
                                                    <div>
                                                        <img src="/icon/delete.png" className="w-6 h-6" alt=""/>
                                                    </div>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>);
            })}
                        </tbody>
                    </table>

                    {response && (<Layouts.Paginator search={search} navigator={navigation} totalPages={response.pages} currentPage={PAGE}/>)}
                </div>
            </div>
        </div>);
};
exports.ListProduct = ListProduct;
