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
exports.ListUser = void 0;
const react_router_dom_1 = require("react-router-dom");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const react_query_1 = require("@tanstack/react-query");
const Layouts = __importStar(require("components/Layouts"));
const Apis = __importStar(require("api"));
const TheadTable = [{ name: 'Name' }, { name: 'Position' }, { name: 'Status' }, { name: 'Action' }];
const ListUser = () => {
    var _a;
    const queryClient = (0, react_query_1.useQueryClient)();
    const queryString = (0, react_router_dom_1.useLocation)().search || '?page=1';
    const PAGE = Number(queryString.split('=')[1]);
    const LIMIT = 10;
    const handleDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
        mutationDelete.mutate(id, {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ['users', PAGE],
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
    const mutationDelete = (0, react_query_1.useMutation)({ mutationFn: (id) => Apis.destroyUser(id) });
    const query = (0, react_query_1.useQuery)({
        queryKey: ['users', PAGE],
        queryFn: () => Apis.getListUsers(PAGE, LIMIT),
        keepPreviousData: true,
        retry: 0,
    });
    const response = (_a = query.data) === null || _a === void 0 ? void 0 : _a.data;
    if (query.error)
        return Layouts.Error(query.error.message);
    return (<div className="flex flex-col h-full gap-8 px-4 pt-12">
            {query.isLoading || mutationDelete.isLoading ? <Layouts.Loading /> : null}

            <Layouts.Breadcrumb page="users"/>

            <div className="pb-8">
                <react_router_dom_1.Link to="/admin/users/create" className="flex items-center w-12 h-12">
                    <div className="m-auto">
                        <img src="/icon/plus.png" className="w-10 h-10" alt=""/>
                    </div>
                </react_router_dom_1.Link>

                <div className="w-full my-8 overflow-x-auto">
                    <table className="w-full text-left text-gray-500 bg-white shadow-md sm:rounded-lg">
                        <thead className="text-sm text-gray-700 uppercase bg-slate-300">
                            <tr>
                                <th scope="col" className="p-4">
                                    <div className="flex items-center">
                                        <input className="pl-10" id="checkbox-all-search" type="checkbox"/>
                                        <label htmlFor="checkbox-all-search" className="sr-only">
                                            checkbox
                                        </label>
                                    </div>
                                </th>
                                {TheadTable.map((item, index) => (<th key={index} scope="col" className="px-6 py-4">
                                        {item.name}
                                    </th>))}
                            </tr>
                        </thead>
                        <tbody>
                            {response &&
            response.contents.map((user, index) => (<tr key={index} className="bg-white border-b hover:bg-gray-50">
                                        <td className="w-4 p-4">
                                            <div className="flex items-center">
                                                <input id="checkbox-table-search-1" type="checkbox"/>
                                                <label htmlFor="checkbox-table-search-1" className="sr-only">
                                                    checkbox
                                                </label>
                                            </div>
                                        </td>
                                        <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
                                            <img className="w-10 h-10 rounded-full" src={user.avatar} alt={user.fullName}/>
                                            <div className="pl-3">
                                                <div className="text-base font-semibold">{user.fullName}</div>
                                                <div className="font-normal text-gray-500">{user.email}</div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4 capitalize">
                                            <div className="flex items-center">{user.role}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"/> Active
                                            </div>
                                        </td>

                                        <td className="gap-2 px-6 py-4">
                                            <div className="flex items-center mb-2">
                                                <react_router_dom_1.Link to={`/admin/users/update/${user._id}`} className="mr-2 font-medium text-blue-600 hover:underline">
                                                    <div>
                                                        <img src="/icon/edit-color.png" className="w-6 h-6" alt=""/>
                                                    </div>
                                                </react_router_dom_1.Link>
                                                <button onClick={() => handleDelete(user._id)} className="font-medium text-red-600 hover:underline">
                                                    <div>
                                                        <img src="/icon/delete.png" className="w-6 h-6" alt=""/>
                                                    </div>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>))}
                        </tbody>
                    </table>
                    {/* {response && (
            <Layouts.Paginator
                totalPages={response.totalPages as number}
                currentPage={response.currentPage as number}
            />
        )} */}
                </div>
            </div>
        </div>);
};
exports.ListUser = ListUser;
