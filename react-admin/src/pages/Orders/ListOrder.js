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
exports.ListOrder = void 0;
const react_router_dom_1 = require("react-router-dom");
const react_query_1 = require("@tanstack/react-query");
const Layouts = __importStar(require("components/Layouts"));
const Apis = __importStar(require("api"));
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const ListOrder = () => {
    var _a;
    const queryClient = (0, react_query_1.useQueryClient)();
    const navigation = (0, react_router_dom_1.useNavigate)();
    const queryString = (0, react_router_dom_1.useLocation)().search || '?page=1';
    const PAGE = Number(queryString.split('=')[1]);
    const LIMIT = 10;
    const handleDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
        mutationDelete.mutate(id, {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ['orders', PAGE],
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
    const mutationDelete = (0, react_query_1.useMutation)({ mutationFn: (id) => Apis.destroyOrder(id) });
    const query = (0, react_query_1.useQuery)({
        queryKey: ['orders', PAGE],
        queryFn: () => Apis.getListOrders(PAGE, LIMIT),
        keepPreviousData: true,
        retry: 0,
    });
    const response = (_a = query.data) === null || _a === void 0 ? void 0 : _a.data;
    if (query.error)
        return Layouts.Error(query.error.message);
    const isLoad = query.isLoading || mutationDelete.isLoading;
    return (<div className="flex flex-col h-full gap-8 px-4 pt-12">
            {isLoad ? <Layouts.Loading /> : null}

            <Layouts.Breadcrumb page="orders"/>
            <div className="pb-8">
                <div className="w-full my-8 overflow-x-auto">
                    <table className="w-full text-left text-gray-500 bg-white shadow-md sm:rounded-lg">
                        <thead className="text-sm text-gray-700 uppercase bg-slate-300">
                            <tr>
                                <th scope="col" className="px-6 py-4">
                                    #
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    Customer Name
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    Phone Number
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    Customer Email
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    Address
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
            response.contents.map((order, index) => (<tr key={index} className="border-b hover:bg-gray-50">
                                        <td className="gap-2 px-6 py-4">{(index += 1)}</td>

                                        <td className="px-6 py-4 capitalize">
                                            {order.firstName} {order.name}
                                        </td>
                                        <td className="px-6 py-4 capitalize">{order.phoneNumber}</td>
                                        <td className="px-6 py-4">{order.email}</td>
                                        <td className="px-6 py-4 capitalize ">
                                            {order.address} , {order.city}
                                        </td>
                                        <td className={`px-6 py-4 uppercase ${order.status === 'complete'
                    ? 'text-green-500'
                    : order.status === 'waiting'
                        ? 'text-red-500'
                        : 'text-yellow-500'}`}>
                                            {order.status}
                                        </td>

                                        <td className="gap-2 px-6 py-4">
                                            <div className="flex items-center mb-2">
                                                <react_router_dom_1.Link to={`/admin/orders/update/${order._id}`} className="mr-2 font-medium text-blue-600 hover:underline">
                                                    <div>
                                                        <img src="/icon/edit-color.png" className="w-6 h-6" alt=""/>
                                                    </div>
                                                </react_router_dom_1.Link>
                                                <button onClick={() => handleDelete(order._id)} className="font-medium text-red-600 hover:underline">
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
exports.ListOrder = ListOrder;
