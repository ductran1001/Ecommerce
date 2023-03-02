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
exports.Login = void 0;
const react_router_dom_1 = require("react-router-dom");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const react_query_1 = require("@tanstack/react-query");
const react_hook_form_1 = require("react-hook-form");
const yup_1 = require("@hookform/resolvers/yup");
const react_redux_1 = require("react-redux");
const Layouts = __importStar(require("components/Layouts"));
const utils = __importStar(require("utils"));
const Apis = __importStar(require("api"));
const Login = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const dispatch = (0, react_redux_1.useDispatch)();
    const { register, handleSubmit, formState: { errors, isValid }, } = (0, react_hook_form_1.useForm)({
        resolver: (0, yup_1.yupResolver)(utils.loginSchema),
        mode: 'onChange',
        defaultValues: utils.initialStateLoginForm,
        resetOptions: {
            keepDirtyValues: true, // user-interacted input will be retained
        },
    });
    const onSubmit = (data) => __awaiter(void 0, void 0, void 0, function* () {
        mutationLogin.mutate(data, {
            onSuccess: () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield Apis.getUserApi(dispatch);
                if ((response === null || response === void 0 ? void 0 : response.status) === 200)
                    navigate('/admin/dashboard');
            }),
            onError(error) {
                var _a, _b;
                const mgs = (_b = ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data).message) !== null && _b !== void 0 ? _b : 'Something went wrong!';
                react_hot_toast_1.default.error(mgs);
            },
        });
    });
    const mutationLogin = (0, react_query_1.useMutation)({ mutationFn: (body) => Apis.loginUser(body) });
    return (<div className="flex flex-col items-center justify-center h-full gap-10 px-4 pt-12">
            {mutationLogin.isLoading ? <Layouts.Loading /> : null}

            <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-md shadow-md sm:px-6 md:px-8 lg:px-10">
                <div className="self-center text-xl font-medium text-gray-800 uppercase sm:text-2xl">
                    Login To Your Account
                </div>
                <div className="mt-10">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col mb-6">
                            <label htmlFor="email" className="mb-1 text-xs tracking-wide text-gray-600 sm:text-sm">
                                E-Mail Address:
                            </label>
                            <div className="relative">
                                <div className="absolute top-0 left-0 inline-flex items-center justify-center w-10 h-full text-gray-400">
                                    <img src="/icon/Email.png" alt="" className="w-6 h-6"/>
                                </div>
                                <input {...register('email')} className="pl-10" type="email" name="email" placeholder="your@mail.com"/>
                            </div>
                            <div className="flex w-full">
                                {(errors === null || errors === void 0 ? void 0 : errors.email) && (<p className="w-full mt-2 text-sm italic text-red-600 capitalize">
                                        {errors.email.message}
                                    </p>)}
                            </div>
                        </div>

                        <div className="flex flex-col mb-6">
                            <label htmlFor="password" className="mb-1 text-xs tracking-wide text-gray-600 sm:text-sm">
                                Password:
                            </label>
                            <div className="relative">
                                <div className="absolute top-0 left-0 inline-flex items-center justify-center w-10 h-full text-gray-400">
                                    <img src="/icon/Password.png" className="w-6 h-6" alt=""/>
                                </div>
                                <input {...register('password')} className="pl-10" type="password" name="password" placeholder="Password" autoComplete="off"/>
                            </div>
                            <div className="flex w-full">
                                {(errors === null || errors === void 0 ? void 0 : errors.password) && (<p className="w-full mt-2 text-sm italic text-red-600 capitalize">
                                        {errors.password.message}
                                    </p>)}
                            </div>
                        </div>

                        <div className="flex w-full">
                            <button disabled={!isValid} type="submit" className="flex items-center justify-center w-full py-2 text-sm text-white transition duration-150 ease-in bg-blue-600 rounded focus:outline-none sm:text-base hover:bg-blue-700">
                                <span className="mr-2 uppercase">Login</span>
                            </button>
                        </div>
                    </form>
                </div>
                <div className="flex items-center justify-center mt-6">
                    <react_router_dom_1.Link to="/admin/register" className="inline-flex items-center text-sm font-bold text-center text-blue-500 hover:text-blue-700">
                        <img src="/icon/add-user.png" alt="add-user" className="w-7 h-7"/>
                        <span className="ml-2">You don't have an account?</span>
                    </react_router_dom_1.Link>
                </div>
            </div>
        </div>);
};
exports.Login = Login;
