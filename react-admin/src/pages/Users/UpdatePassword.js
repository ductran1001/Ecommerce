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
exports.UpdatePassword = void 0;
const react_router_dom_1 = require("react-router-dom");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const react_query_1 = require("@tanstack/react-query");
const react_hook_form_1 = require("react-hook-form");
const yup_1 = require("@hookform/resolvers/yup");
const Layouts = __importStar(require("components/Layouts"));
const Utils = __importStar(require("utils"));
const Apis = __importStar(require("api"));
const UpdatePassword = () => {
    const { id } = (0, react_router_dom_1.useParams)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { register, handleSubmit, formState: { errors, isDirty, isValid }, } = (0, react_hook_form_1.useForm)({
        resolver: (0, yup_1.yupResolver)(Utils.updateUserPasswordSchema),
        mode: 'onChange',
        resetOptions: {
            keepDirtyValues: true, // user-interacted input will be retained
        },
    });
    const onSubmit = (data) => __awaiter(void 0, void 0, void 0, function* () {
        const dataRequest = {
            password: data.password,
            newPass: data.newPass,
        };
        mutationUpdate.mutate(dataRequest, {
            onSuccess: () => {
                react_hot_toast_1.default.success('Update Success');
                navigate('/admin/users');
            },
            onError(error) {
                var _a, _b;
                const mgs = (_b = ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data).message) !== null && _b !== void 0 ? _b : 'Something went wrong!';
                react_hot_toast_1.default.error(mgs);
            },
        });
    });
    const mutationUpdate = (0, react_query_1.useMutation)({
        mutationFn: (body) => Apis.updateUser(id, body),
    });
    return (<div className="flex flex-col gap-10 h-full pt-12 px-4">
            {mutationUpdate.isLoading ? <Layouts.Loading /> : null}

            <Layouts.Breadcrumb page="users" sub="update"/>
            <div className="flex flex-col items-center justify-center">
                <div className="flex flex-col mb-12 bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-16 rounded-md w-full">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="lg:w-3/5 w-full border py-8 px-4 sm:px-6 md:px-8 lg:px-10 mx-auto space-y-6">
                            <div>
                                <div className="flex items-center">
                                    <label className="w-1/4 text-sm text-gray-600">Old Password</label>
                                    <input {...register('password')} className="pl-4 flex-1" type="password" name="password" placeholder="Old Password" autoComplete="off"/>
                                </div>

                                <div className="flex items-end justify-end w-full">
                                    {(errors === null || errors === void 0 ? void 0 : errors.password) && (<p className="mt-2 text-sm italic w-3/4 text-red-600 capitalize">
                                            {errors.password.message}
                                        </p>)}
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center">
                                    <label className="w-1/4 text-sm text-gray-600">New Password</label>
                                    <input {...register('newPass')} className="pl-4 flex-1" type="password" name="newPass" placeholder="New Password" autoComplete="off"/>
                                </div>
                                <div className="flex items-end justify-end w-full">
                                    {(errors === null || errors === void 0 ? void 0 : errors.newPass) && (<p className="mt-2 text-sm italic w-3/4 text-red-600 capitalize">
                                            {errors.newPass.message}
                                        </p>)}
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center">
                                    <label className="w-1/4 text-sm text-gray-600">Confirm Password</label>
                                    <input {...register('confirm')} className="pl-4 flex-1" type="password" name="confirm" placeholder="Confirm Password" autoComplete="off"/>
                                </div>
                                <div className="flex items-end justify-end w-full">
                                    {(errors === null || errors === void 0 ? void 0 : errors.confirm) && (<p className="mt-2 text-sm italic w-3/4 text-red-600 capitalize">
                                            {errors.confirm.message}
                                        </p>)}
                                </div>
                            </div>

                            <div className="flex items-end justify-end w-full">
                                <button disabled={!isDirty || !isValid} type="submit" className="w-3/4 flex items-center justify-center text-white text-base bg-blue-600 hover:bg-blue-700 rounded py-2">
                                    <span className="uppercase">Update</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>);
};
exports.UpdatePassword = UpdatePassword;
