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
exports.ListCategory = void 0;
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const react_query_1 = require("@tanstack/react-query");
const Layouts = __importStar(require("components/Layouts"));
const Apis = __importStar(require("api"));
const ListCategory = () => {
    var _a;
    const queryClient = (0, react_query_1.useQueryClient)();
    const [checked, setChecked] = react_1.default.useState([]);
    const queryString = (0, react_router_dom_1.useLocation)().search || '?page=1';
    const PAGE = Number(queryString.split('=')[1]);
    const LIMIT = 10;
    const softDelete = Boolean((0, react_router_dom_1.useLocation)().pathname.includes('/trash'));
    const navigation = (0, react_router_dom_1.useNavigate)();
    const handleDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
        mutationDelete.mutate(id, {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: [softDelete ? 'categories-trash' : 'categories', PAGE],
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
                        queryKey: [softDelete ? 'categories-trash' : 'categories', PAGE],
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
                        queryKey: [softDelete ? 'categories-trash' : 'categories', PAGE],
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
                        queryKey: [softDelete ? 'categories-trash' : 'categories', PAGE],
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
    const mutationDelete = (0, react_query_1.useMutation)({ mutationFn: (id) => Apis.destroyCategory(id) });
    const mutationDeleteMulti = (0, react_query_1.useMutation)({ mutationFn: (id) => Apis.deleteMultiCategory(id) });
    const mutationRestoreMulti = (0, react_query_1.useMutation)({ mutationFn: (id) => Apis.restoreMultiCategory(id) });
    const mutationDeleteMultiTrash = (0, react_query_1.useMutation)({ mutationFn: (id) => Apis.deleteMultiTrashCategory(id) });
    const query = (0, react_query_1.useQuery)({
        queryKey: [softDelete ? 'categories-trash' : 'categories', PAGE],
        queryFn: () => softDelete
            ? Apis.getListCategoriesTrash(PAGE, LIMIT, true)
            : Apis.getListCategories(PAGE, LIMIT),
        keepPreviousData: true,
        retry: 0,
    });
    const response = (_a = query.data) === null || _a === void 0 ? void 0 : _a.data;
    if (query.error)
        return Layouts.Error(query.error.message);
    const isLoad = query.isLoading ||
        mutationDelete.isLoading ||
        mutationDeleteMulti.isLoading ||
        mutationRestoreMulti.isLoading ||
        mutationDeleteMultiTrash.isLoading;
    return (<div className="flex flex-col h-full gap-8 px-4 pt-12">
            {isLoad ? <Layouts.Loading /> : null}

            <Layouts.Breadcrumb page="categories"/>
            <div className="pb-8">
                <div className="flex items-center gap-2">
                    <react_router_dom_1.Link to="/admin/categories/create" className="flex items-center w-12 h-12">
                        <div className="m-auto">
                            <img src="/icon/plus.png" className="w-10 h-10" alt=""/>
                        </div>
                    </react_router_dom_1.Link>
                    <div className="flex items-center justify-center w-40 h-16 text-red-500 border border-gray-200">
                        {softDelete ? (<button onClick={() => handleDeleteMultiTrash(checked)} type="button" className="uppercase">
                                Delete Trash
                            </button>) : (<button onClick={() => handleDeleteMulti(checked)} type="button" className="uppercase">
                                Delete Multiple
                            </button>)}
                    </div>
                    <div className="flex items-center justify-center w-40 h-16 text-blue-500 border border-gray-200">
                        {softDelete ? (<button onClick={() => handleRestoreMulti(checked)} className="uppercase">
                                restore items
                            </button>) : (<react_router_dom_1.Link to="/admin/categories/trash" className="uppercase">
                                trash items
                            </react_router_dom_1.Link>)}
                    </div>
                </div>

                <div className="w-full my-8 overflow-x-auto">
                    <table className="w-full text-left text-gray-500 bg-white shadow-md sm:rounded-lg">
                        <thead className="text-sm text-gray-700 uppercase bg-slate-300">
                            <tr>
                                <th scope="col" className="p-4">
                                    <div className="flex items-center">
                                        <input onChange={(event) => handleCheckboxAll([...response === null || response === void 0 ? void 0 : response.contents.map((cate) => cate._id)], event)} className="pl-10" checked={(response === null || response === void 0 ? void 0 : response.contents.length) === checked.length &&
            (response === null || response === void 0 ? void 0 : response.contents.length) > 0} type="checkbox" id="checkbox-all"/>
                                        <label htmlFor="checkbox-all-search" className="sr-only">
                                            checkbox
                                        </label>
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    Description
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
            response.contents.map((category, index) => (<tr key={index} className="border-b hover:bg-gray-50">
                                        <td className="w-4 p-4">
                                            <div className="flex items-center">
                                                <input id="checkbox" type="checkbox" checked={checked.includes(category._id)} onChange={() => handleCheckbox(category._id)}/>
                                                <label htmlFor="checkbox" className="sr-only">
                                                    checkbox
                                                </label>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 capitalize">
                                            <div className="flex items-center w-full gap-2">
                                                <div className="h-24 w-[100px]">
                                                    <img src={category.image} alt="" className="w-full h-full rounded-lg"/>
                                                </div>
                                                <div className="flex-1">{category.name}</div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 capitalize max-w-[180px] truncate">
                                            {category.description}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className={`
                                                ${category.active ? 'bg-green-500' : 'bg-red-500'} 
                                                h-2.5 w-2.5 rounded-full mr-2 `}/>
                                                {category.active ? 'Active' : 'Inactive'}
                                            </div>
                                        </td>
                                        <td className="gap-2 px-6 py-4">
                                            <div className="flex items-center mb-2">
                                                <react_router_dom_1.Link to={`/admin/categories/update/${category._id}`} className="mr-2 font-medium text-blue-600 hover:underline">
                                                    <div>
                                                        <img src="/icon/edit-color.png" className="w-6 h-6" alt=""/>
                                                    </div>
                                                </react_router_dom_1.Link>
                                                <button onClick={() => handleDelete(category._id)} className="font-medium text-red-600 hover:underline">
                                                    <div>
                                                        <img src="/icon/delete.png" className="w-6 h-6" alt=""/>
                                                    </div>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>))}
                        </tbody>
                    </table>
                    {response && (<Layouts.Paginator navigator={navigation} totalPages={response.pages} currentPage={PAGE}/>)}
                </div>
            </div>
        </div>);
};
exports.ListCategory = ListCategory;
