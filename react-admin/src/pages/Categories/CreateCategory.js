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
exports.CreateCategory = void 0;
const react_1 = __importDefault(require("react"));
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const react_query_1 = require("@tanstack/react-query");
const react_router_dom_1 = require("react-router-dom");
const react_hook_form_1 = require("react-hook-form");
const yup_1 = require("@hookform/resolvers/yup");
const Layouts = __importStar(require("components/Layouts"));
const Utils = __importStar(require("utils"));
const Apis = __importStar(require("api"));
const CreateCategory = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [category, setCategory] = react_1.default.useState(Utils.initialStateCategoryForm);
    const [errImg, setErrImg] = react_1.default.useState('');
    const { register, handleSubmit, formState: { errors, isDirty, isValid }, } = (0, react_hook_form_1.useForm)({
        resolver: (0, yup_1.yupResolver)(Utils.createCategorySchema),
        mode: 'onChange',
        defaultValues: category,
        values: category,
        resetOptions: {
            keepDirtyValues: true, // user-interacted input will be retained
        },
    });
    const uploadPhoto = (event) => __awaiter(void 0, void 0, void 0, function* () {
        const { files } = event.target;
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('file', files[i]);
        }
        mutationUpLoad.mutate(formData, {
            onSuccess: (data) => {
                setCategory((prev) => (Object.assign(Object.assign({}, prev), { image: data.data.publicUrl[0] })));
            },
            onError(error) {
                var _a, _b;
                const mgs = (_b = ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data).message) !== null && _b !== void 0 ? _b : 'Something went wrong!';
                react_hot_toast_1.default.error(mgs);
            },
        });
    });
    const handleDelete = () => setCategory((prev) => (Object.assign(Object.assign({}, prev), { image: '' })));
    const onSubmit = (data) => __awaiter(void 0, void 0, void 0, function* () {
        if (data.image === '')
            setErrImg('Images is required');
        else {
            mutationCreate.mutate(data, {
                onSuccess: () => {
                    react_hot_toast_1.default.success('Create Success');
                    navigate('/admin/categories');
                },
                onError(error) {
                    var _a, _b;
                    const mgs = (_b = ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data).message) !== null && _b !== void 0 ? _b : 'Something went wrong!';
                    react_hot_toast_1.default.error(mgs);
                },
            });
        }
    });
    const mutationCreate = (0, react_query_1.useMutation)({ mutationFn: (body) => Apis.createCategory(body) });
    const mutationUpLoad = (0, react_query_1.useMutation)({ mutationFn: (body) => Apis.upload('category', body) });
    return (<div className="flex flex-col h-full gap-10 px-4 pt-12">
            {mutationCreate.isLoading || mutationUpLoad.isLoading ? <Layouts.Loading /> : null}
            <Layouts.Breadcrumb page="categories" sub="create"/>
            <div className="flex flex-col items-center justify-center">
                <div className="flex flex-col w-full px-4 py-16 mb-12 bg-white rounded-md shadow-md sm:px-6 md:px-8 lg:px-10">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-full px-4 py-8 mx-auto space-y-6 border lg:w-3/5 sm:px-6 md:px-8 lg:px-10">
                            <div>
                                <div className="flex flex-col gap-2 md:flex-row md:items-center">
                                    <label className="w-full text-sm font-medium text-gray-900 uppercase md:w-1/4">
                                        Category Name
                                    </label>
                                    <input {...register('name')} className="flex-1 pl-4" placeholder="Category Name" name="name" type="text"/>
                                </div>
                                <div className="flex items-end justify-end w-full">
                                    {(errors === null || errors === void 0 ? void 0 : errors.name) && (<p className="w-full mt-2 text-sm italic text-red-600 capitalize md:w-3/4">
                                            {errors.name.message}
                                        </p>)}
                                </div>
                            </div>

                            <div>
                                <div className="flex flex-col gap-2 md:flex-row md:items-center">
                                    <label className="w-full text-sm font-medium text-gray-900 uppercase md:w-1/4">
                                        Description
                                    </label>
                                    <textarea {...register('description')} className="flex-1 pl-4" placeholder="Description" name="description" rows={5}/>
                                </div>
                                <div className="flex items-end justify-end w-full">
                                    {(errors === null || errors === void 0 ? void 0 : errors.description) && (<p className="w-full mt-2 text-sm italic text-red-600 capitalize md:w-3/4">
                                            {errors.description.message}
                                        </p>)}
                                </div>
                            </div>

                            <div>
                                <div className="flex flex-col gap-2 md:flex-row md:items-center">
                                    <label className="w-1/4 text-sm font-medium text-gray-900 uppercase">Images</label>

                                    <label className="flex flex-col items-center justify-center flex-1 w-full pt-5 pb-6 border border-gray-400 rounded-lg cursor-pointer">
                                        <img src="/icon/UpLoadImageIcon.png" className="w-16 h-16" alt=""/>
                                        <p className="mb-2 text-xs text-gray-500 md:text-base">
                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="hidden text-sm text-gray-500 md:block">
                                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                                        </p>
                                        <input onChange={(event) => uploadPhoto(event)} id="dropzone-file" type="file" className="hidden"/>
                                    </label>
                                </div>
                                <div className="flex items-end justify-end w-full">
                                    {errImg && (<p className="w-full mt-2 text-sm italic text-red-600 capitalize md:w-3/4">
                                            {errImg}
                                        </p>)}
                                </div>
                            </div>

                            {category.image && (<div className="flex items-center justify-start lg:justify-end">
                                    <div className="grid w-3/4 grid-cols-2 gap-4">
                                        <div className="relative h-48">
                                            <div className="absolute top-0 right-0 flex gap-1 mt-2">
                                                <label className="p-1.5 text-white bg-black rounded-full cursor-pointer opacity-80">
                                                    <Layouts.EditIcon />
                                                    <input type="file" className="hidden" onChange={(event) => uploadPhoto(event)}/>
                                                </label>
                                                <label onClick={() => handleDelete()} className="p-1.5 text-white bg-black rounded-full cursor-pointer opacity-80">
                                                    <Layouts.CloseIcon />
                                                </label>
                                            </div>

                                            <img className="w-full h-full rounded-lg" src={category.image} alt=""/>
                                        </div>
                                    </div>
                                </div>)}

                            <div className="flex items-center">
                                <label className="w-1/4 text-sm font-medium text-gray-900 uppercase">Active</label>
                                <div className="flex flex-1 gap-4 font-normal text-gray-900">
                                    <div onClick={() => setCategory((prev) => (Object.assign(Object.assign({}, prev), { active: true })))} className="flex gap-2 cursor-pointer">
                                        <label className="flex items-center w-6 h-6 border border-gray-400">
                                            {category.active && <img src="/icon/CheckIcon.png" alt=""/>}
                                        </label>
                                        <div>Active</div>
                                    </div>
                                    <div onClick={() => setCategory((prev) => (Object.assign(Object.assign({}, prev), { active: false })))} className="flex gap-2 cursor-pointer">
                                        <label className="flex items-center w-6 h-6 border border-gray-400">
                                            {!category.active && <img src="/icon/x-icon.png" alt=""/>}
                                        </label>
                                        <div>Inactive</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-end justify-end w-full">
                                <button disabled={!isDirty || !isValid} type="submit" className="flex items-center justify-center w-3/4 py-2 text-base text-white bg-blue-600 rounded hover:bg-blue-700">
                                    <span className="uppercase">Submit</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>);
};
exports.CreateCategory = CreateCategory;
