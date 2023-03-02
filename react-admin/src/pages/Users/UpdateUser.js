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
exports.UpdateUser = void 0;
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const react_query_1 = require("@tanstack/react-query");
const react_hook_form_1 = require("react-hook-form");
const yup_1 = require("@hookform/resolvers/yup");
const Layouts = __importStar(require("components/Layouts"));
const Utils = __importStar(require("utils"));
const Apis = __importStar(require("api"));
const UpdateUser = () => {
    const { id } = (0, react_router_dom_1.useParams)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [user, setUser] = react_1.default.useState(Utils.initialStateUpdateUserForm);
    const { register, handleSubmit, formState: { errors, isValid }, } = (0, react_hook_form_1.useForm)({
        resolver: (0, yup_1.yupResolver)(Utils.updateUserInfoSchema),
        mode: 'onChange',
        defaultValues: user,
        values: user,
        resetOptions: {
            keepDirtyValues: true, // user-interacted input will be retained
        },
    });
    const uploadPhoto = (event) => __awaiter(void 0, void 0, void 0, function* () {
        const { files } = event.target;
        const selectedFiles = files;
        const formData = new FormData();
        formData.append('file', selectedFiles === null || selectedFiles === void 0 ? void 0 : selectedFiles[0]);
        mutationUpLoad.mutate(formData, {
            onSuccess: (data) => {
                setUser((prevState) => (Object.assign(Object.assign({}, prevState), { avatar: data.data.publicUrl[0] })));
            },
            onError(error) {
                var _a, _b;
                const mgs = (_b = ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data).message) !== null && _b !== void 0 ? _b : 'Something went wrong!';
                react_hot_toast_1.default.error(mgs);
            },
        });
    });
    const onSubmit = (data) => __awaiter(void 0, void 0, void 0, function* () {
        const dataRequest = {
            fullName: data.fullName,
            avatar: data.avatar,
            address: data.address,
            phoneNumber: data.phoneNumber,
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
    const mutationUpLoad = (0, react_query_1.useMutation)({ mutationFn: (body) => Apis.upload('userPhoto', body) });
    const queryUser = (0, react_query_1.useQuery)({
        queryKey: ['user', id],
        queryFn: () => Apis.getUserById(id),
        enabled: id !== undefined,
        onSuccess: (data) => {
            setUser((prevState) => (Object.assign(Object.assign({}, prevState), data.data.contents)));
        },
    });
    if (queryUser.error)
        return Layouts.Error(queryUser.error.message);
    return (<div className="flex flex-col h-full gap-10 px-4 pt-12">
            {queryUser.isLoading || mutationUpdate.isLoading ? <Layouts.Loading /> : null}

            <Layouts.Breadcrumb page="users" sub="update"/>
            <div className="flex flex-col items-center justify-center">
                <div className="flex flex-col w-full px-4 py-16 mb-12 bg-white rounded-md shadow-md sm:px-6 md:px-8 lg:px-10">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-full px-4 py-8 mx-auto space-y-6 border lg:w-3/5 sm:px-6 md:px-8 lg:px-10">
                            <div className="flex items-center">
                                <label className="w-1/4 text-sm text-gray-600">Avatar</label>
                                <div className="flex flex-1 gap-4">
                                    <div className="relative flex">
                                        <img src={user.avatar} alt="" className="w-20 h-20 p-2 border border-gray-500 rounded-full"/>
                                        <label className="absolute bottom-0 flex items-center p-2 -mr-3 text-white bg-black rounded-full cursor-pointer -right-3 opacity-60">
                                            <input type="file" className="hidden" onChange={(event) => uploadPhoto(event)}/>
                                            <img src="/icon/UpLoadImageIcon.png" className="w-8 h-8" alt=""/>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center">
                                    <label className="w-1/4 text-sm text-gray-600">FullName</label>
                                    <input {...register('fullName')} className="flex-1 pl-4" type="text" name="fullName" placeholder="John Doe"/>
                                </div>
                                <div className="flex items-end justify-end w-full">
                                    {(errors === null || errors === void 0 ? void 0 : errors.fullName) && (<p className="w-3/4 mt-2 text-sm italic text-red-600 capitalize">
                                            {errors.fullName.message}
                                        </p>)}
                                </div>
                            </div>

                            <div className="flex items-center">
                                <label className="w-1/4 text-sm text-gray-600">E-Mail Address:</label>
                                <input className="flex-1 pl-4 bg-gray-100" type="email" value={user.email} readOnly name="email" placeholder="your@mail.com"/>
                            </div>

                            <div>
                                <div className="flex items-center">
                                    <label className="w-1/4 text-sm text-gray-600">Phone Number</label>
                                    <input {...register('phoneNumber')} className="flex-1 pl-4" type="text" name="phoneNumber" placeholder="Your phone number"/>
                                </div>
                                <div className="flex items-end justify-end w-full">
                                    {(errors === null || errors === void 0 ? void 0 : errors.phoneNumber) && (<p className="w-3/4 mt-2 text-sm italic text-red-600 capitalize">
                                            {errors.phoneNumber.message}
                                        </p>)}
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center">
                                    <label className="w-1/4 text-sm text-gray-600">Address</label>
                                    <input {...register('address')} className="flex-1 pl-4" type="text" name="address" placeholder="Your Address"/>
                                </div>
                                <div className="flex items-end justify-end w-full">
                                    {(errors === null || errors === void 0 ? void 0 : errors.address) && (<p className="w-3/4 mt-2 text-sm italic text-red-600 capitalize">
                                            {errors.address.message}
                                        </p>)}
                                </div>
                            </div>

                            <div className="flex w-full">
                                <div className="w-1/4"></div>
                                <react_router_dom_1.Link to={`/admin/users/updatePassword/${id}`} className="text-blue-500 underline cursor-pointer">
                                    Change Password
                                </react_router_dom_1.Link>
                            </div>
                            <div className="flex items-end justify-end w-full">
                                <button disabled={!isValid} type="submit" className="flex items-center justify-center w-3/4 py-2 text-base text-white bg-blue-600 rounded hover:bg-blue-700">
                                    <span className="uppercase">Update</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>);
};
exports.UpdateUser = UpdateUser;
