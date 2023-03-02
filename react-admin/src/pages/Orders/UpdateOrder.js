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
exports.UpdateOrder = void 0;
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const react_query_1 = require("@tanstack/react-query");
const Utils = __importStar(require("utils"));
const Layouts = __importStar(require("components/Layouts"));
const Apis = __importStar(require("api"));
const numeral_1 = __importDefault(require("numeral"));
const UpdateOrder = () => {
    const { id } = (0, react_router_dom_1.useParams)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [order, setOrder] = react_1.default.useState(Utils.initialStateOrderForm);
    const mutationUpdate = (0, react_query_1.useMutation)({
        mutationFn: (body) => Apis.updateOrder(id, body),
    });
    const handleSubmit = (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        const status = order.status;
        mutationUpdate.mutate(status, {
            onSuccess: () => {
                react_hot_toast_1.default.success('Update Success');
                navigate('/admin/orders');
            },
            onError(error) {
                var _a, _b;
                const mgs = (_b = ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data).message) !== null && _b !== void 0 ? _b : 'Something went wrong!';
                react_hot_toast_1.default.error(mgs);
            },
        });
    });
    const handleChange = (event) => {
        event.preventDefault();
        setOrder((prevState) => (Object.assign(Object.assign({}, prevState), { status: event.target.value })));
    };
    const queryOrder = (0, react_query_1.useQuery)({
        queryKey: ['order', id],
        queryFn: () => Apis.getOrderById(id),
        enabled: id !== undefined,
        onSuccess: (data) => setOrder((prevState) => (Object.assign(Object.assign({}, prevState), data.data.contents))),
    });
    let initialValue = 0;
    let sum = order === null || order === void 0 ? void 0 : order.orderDetails.reduce(function (total, currentValue) {
        const price = Math.round(currentValue.price - (currentValue.price / 100) * currentValue.promotion);
        const getSum = price * currentValue.quantity;
        return total + getSum;
    }, initialValue);
    if (queryOrder.error)
        return Layouts.Error(queryOrder.error.message);
    return (<div className="flex flex-col h-full gap-10 px-4 pt-12">
            {queryOrder.isLoading || mutationUpdate.isLoading ? <Layouts.Loading /> : null}
            <Layouts.Breadcrumb page="orders" sub="update"/>
            {order && (<div className="flex flex-col items-center justify-center">
                    <div className="flex md:flex-row flex-col w-full px-4 py-12 mb-12 bg-white rounded-md shadow-md sm:px-6 md:px-8 lg:px-10">
                        <div className="flex w-full justify-between flex-col">
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-left text-gray-500">
                                    <thead className="text-gray-700 uppercase bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                <span className="sr-only">Image</span>
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Product
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Qty
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Price
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Promotion
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Total
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.orderDetails.map((item, i) => (<tr key={i} className="bg-white border-b hover:bg-gray-50">
                                                <td className="px-6 py-4 capitalize max-w-[250px]">
                                                    <div className="flex items-center w-full gap-2">
                                                        <div className="h-40 w-[150px]">
                                                            <img src={item.image} alt="" className="w-full h-full rounded-lg"/>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                                                <td className="px-6 py-4">{item.quantity}</td>
                                                <td className="px-6 py-4">{(0, numeral_1.default)(item.price).format('0,0')}</td>
                                                <td className="px-6 py-4">{item.promotion}</td>
                                                <td className="px-6 py-4">
                                                    {(0, numeral_1.default)(item.price - (item.price / 100) * item.promotion).format('0,0')}
                                                </td>
                                            </tr>))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="py-4 justify-between flex lg:flex-row flex-col gap-4 mt-2">
                                <div className="border py-2.5 pb-8 px-4">
                                    <div className="px-1 py-4">
                                        Customer Name : {order.firstName} {order.name}
                                    </div>
                                    <div className="px-1 py-4">Phone Number : {order.phoneNumber}</div>
                                    <div className="px-1 py-4">Customer Email : {order.email}</div>
                                    <div className="px-1 py-4">
                                        Address : {order.address}, {order.city}
                                    </div>
                                    <form onSubmit={(event) => handleSubmit(event)} className="flex gap-4">
                                        <select onChange={(event) => handleChange(event)} value={order.status} className="w-44 text-sm text-gray-600 px-4 py-3 border border-gray-300 shadow-sm rounded uppercase focus:outline-none">
                                            <option value="waiting">waiting</option>
                                            <option value="delivery">delivery</option>
                                            <option value="complete">complete</option>
                                        </select>
                                        <div className="w-44">
                                            <button className="w-full px-4 py-2.5 bg-green-500 text-white uppercase hover:opacity-75">
                                                Update
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                <div className="text-lg uppercase font-semibold text-red-500">
                                    SUM: {(0, numeral_1.default)(sum).format('0,0')} VND
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)}
        </div>);
};
exports.UpdateOrder = UpdateOrder;
