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
exports.UpdateBrand = void 0;
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const react_query_1 = require("@tanstack/react-query");
const react_hook_form_1 = require("react-hook-form");
const yup_1 = require("@hookform/resolvers/yup");
const Utils = __importStar(require("utils"));
const Layouts = __importStar(require("components/Layouts"));
const Apis = __importStar(require("api"));
const UpdateBrand = () => {
    const { id } = (0, react_router_dom_1.useParams)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [brand, setBrand] = react_1.default.useState(Utils.initialStateBrandForm);
    const { register, handleSubmit, formState: { errors, isValid }, } = (0, react_hook_form_1.useForm)({
        resolver: (0, yup_1.yupResolver)(Utils.createBrandSchema),
        mode: 'onChange',
        defaultValues: brand,
        values: brand,
        resetOptions: {
            keepDirtyValues: true, // user-interacted input will be retained
        },
    });
    const mutationUpdate = (0, react_query_1.useMutation)({
        mutationFn: (body) => Apis.updateBrand(id, body),
    });
    const onSubmit = (data) => __awaiter(void 0, void 0, void 0, function* () {
        mutationUpdate.mutate(data, {
            onSuccess: () => {
                react_hot_toast_1.default.success('Update Success');
                navigate('/admin/brands');
            },
            onError(error) {
                var _a, _b;
                const mgs = (_b = ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data).message) !== null && _b !== void 0 ? _b : 'Something went wrong!';
                react_hot_toast_1.default.error(mgs);
            },
        });
    });
    const queryBrand = (0, react_query_1.useQuery)({
        queryKey: ['brand', id],
        queryFn: () => Apis.getBrandById(id),
        enabled: id !== undefined,
        onSuccess: (data) => {
            setBrand((prevState) => (Object.assign(Object.assign({}, prevState), data.data.contents)));
        },
    });
    if (queryBrand.error)
        return Layouts.Error(queryBrand.error.message);
    return (<div className="flex flex-col gap-10 h-full pt-12 px-4">
            {queryBrand.isLoading ? <Layouts.Loading /> : null}
            <Layouts.Breadcrumb page="brands" sub="update"/>

            <div className="flex flex-col items-center justify-center">
                <div className="flex flex-col mb-12 bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-16 rounded-md w-full">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="lg:w-3/5 w-full border py-8 px-4 sm:px-6 md:px-8 lg:px-10 mx-auto space-y-6">
                            <div>
                                <div className="flex md:flex-row md:items-center flex-col gap-2">
                                    <label className="md:w-1/4 w-full uppercase text-sm font-medium text-gray-900">
                                        Title
                                    </label>
                                    <input {...register('title')} className="pl-4 flex-1" placeholder="Title" name="title" type="text"/>
                                </div>
                                <div className="flex items-end justify-end w-full">
                                    {(errors === null || errors === void 0 ? void 0 : errors.title) && (<p className="mt-2 text-sm italic md:w-3/4 w-full text-red-600 capitalize">
                                            {errors.title.message}
                                        </p>)}
                                </div>
                            </div>

                            <div className="flex items-end justify-end w-full">
                                <button disabled={!isValid} type="submit" className="w-3/4 flex items-center justify-center text-white text-base bg-blue-600 hover:bg-blue-700 rounded py-2">
                                    <span className="uppercase">submit</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>);
};
exports.UpdateBrand = UpdateBrand;
