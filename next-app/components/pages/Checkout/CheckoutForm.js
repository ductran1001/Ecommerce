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
exports.CheckoutForm = exports.createBrandSchema = void 0;
/* eslint-disable @next/next/no-img-element */
const react_1 = __importDefault(require("react"));
const react_hook_form_1 = require("react-hook-form");
const yup_1 = require("@hookform/resolvers/yup");
const react_redux_1 = require("react-redux");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const Yup = __importStar(require("yup"));
const getStaticProps_1 = require("@/lib/getStaticProps");
const cartSlice_1 = require("@/redux/slice/cartSlice");
exports.createBrandSchema = Yup.object().shape({
    firstName: Yup.string().required('Họ là trường bắt buộc'),
    name: Yup.string().required('Tên là trường bắt buộc'),
    city: Yup.string().required('Thành Phố/Tỉnh Thành là trường bắt buộc'),
    address: Yup.string().required('Địa Chỉ là trường bắt buộc'),
    phoneNumber: Yup.string().matches(/^\d{3}\d{3}\d{4}$/, 'Số điện thoại không hợp lệ'),
    email: Yup.string().required('Email là trường bắt buộc').email('Email không hợp lệ'),
});
const CheckoutForm = () => {
    const cart = (0, react_redux_1.useSelector)((state) => state.cart);
    const dispatch = (0, react_redux_1.useDispatch)();
    const { register, handleSubmit, reset, formState: { errors, isValid }, } = (0, react_hook_form_1.useForm)({
        resolver: (0, yup_1.yupResolver)(exports.createBrandSchema),
        mode: 'onChange',
    });
    const onSubmit = (data) => __awaiter(void 0, void 0, void 0, function* () {
        const newData = Object.assign(Object.assign({}, data), { orderDetails: cart });
        try {
            const response = yield getStaticProps_1.axiosClient.post('/api/order', newData);
            if (response.data.status === 'success') {
                react_hot_toast_1.default.success('Success');
                dispatch((0, cartSlice_1.resetCart)());
                reset();
            }
        }
        catch (error) {
            react_hot_toast_1.default.error('Some thing went wrong ! please try again');
        }
    });
    return (<div className="lg:col-span-8 border border-gray-200 px-4 py-4 rounded">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="text-lg font-medium flex uppercase justify-center items-center gap-4 flex-col my-8">
                    <img src="/images/checkout.png" alt="" className="w-20 h-20"/>
                </div>
                <div className="space-y-4 md:px-8 pb-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-gray-600 mb-2 block">
                                Họ <span className="">*</span>
                            </label>
                            <input {...register('firstName')} className="pl-2" name="firstName" type="text"/>
                            {(errors === null || errors === void 0 ? void 0 : errors.firstName) && <ErrMess message={errors.firstName.message}/>}
                        </div>
                        <div>
                            <label className="text-gray-600 mb-2 block">
                                Tên <span className="">*</span>
                            </label>
                            <input {...register('name')} className="pl-2" name="name" type="text"/>
                            {(errors === null || errors === void 0 ? void 0 : errors.name) && <ErrMess message={errors.name.message}/>}
                        </div>
                    </div>

                    <div>
                        <label className="text-gray-600 mb-2 block">
                            Thành Phố/Tỉnh Thành <span className="">*</span>
                        </label>
                        <input {...register('city')} className="pl-2" name="city" type="text"/>
                        {(errors === null || errors === void 0 ? void 0 : errors.city) && <ErrMess message={errors.city.message}/>}
                    </div>
                    <div>
                        <label className="text-gray-600 mb-2 block">
                            Địa Chỉ <span className="">*</span>
                        </label>
                        <input {...register('address')} className="pl-2" name="address" type="text"/>
                        {(errors === null || errors === void 0 ? void 0 : errors.address) && <ErrMess message={errors.address.message}/>}
                    </div>

                    <div>
                        <label className="text-gray-600 mb-2 block">
                            Số Điện Thoại <span className="">*</span>
                        </label>
                        <input {...register('phoneNumber')} className="pl-2" name="phoneNumber" type="text"/>
                        {(errors === null || errors === void 0 ? void 0 : errors.phoneNumber) && <ErrMess message={errors.phoneNumber.message}/>}
                    </div>
                    <div>
                        <label className="text-gray-600 mb-2 block">
                            Địa Chỉ Email <span className="">*</span>
                        </label>
                        <input {...register('email')} className="pl-2" name="email" type="text"/>
                        {(errors === null || errors === void 0 ? void 0 : errors.email) && <ErrMess message={errors.email.message}/>}
                    </div>

                    <button disabled={!isValid} 
    // href="/order-complete"
    className={`${!isValid ? 'cursor-not-allowed' : 'cursor-pointer'} bg-primary text-white px-4 py-3 font-medium rounded-md uppercase hover:opacity-75 text-sm w-full block text-center`}>
                        ĐẶT HÀNG
                    </button>
                </div>
            </form>
        </div>);
};
exports.CheckoutForm = CheckoutForm;
const ErrMess = ({ message }) => (<p className="mt-2 text-sm italic w-full text-red-600 capitalize">{message}</p>);
