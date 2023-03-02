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
exports.ListSlider = void 0;
const react_1 = __importDefault(require("react"));
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const react_query_1 = require("@tanstack/react-query");
const react_router_dom_1 = require("react-router-dom");
const Layouts = __importStar(require("components/Layouts"));
const Apis = __importStar(require("api"));
const ListSlider = () => {
    var _a;
    const queryClient = (0, react_query_1.useQueryClient)();
    const queryString = (0, react_router_dom_1.useLocation)().search || '?page=1';
    const PAGE = Number(queryString.split('=')[1]);
    const LIMIT = 10;
    const query = (0, react_query_1.useQuery)({
        queryKey: ['sliders', PAGE],
        queryFn: () => Apis.getListSliders(PAGE, LIMIT),
        keepPreviousData: true,
        retry: 0,
    });
    const uploadPhoto = (event, idUpdate) => __awaiter(void 0, void 0, void 0, function* () {
        const { files } = event.target;
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('file', files[i]);
        }
        mutationUpLoad.mutate(formData, {
            onSuccess: (data) => {
                idUpdate ? putImage(data.data.publicUrl, idUpdate) : postImage([...data.data.publicUrl]);
            },
            onError(error) {
                var _a, _b;
                const mgs = (_b = ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data).message) !== null && _b !== void 0 ? _b : 'Something went wrong!';
                react_hot_toast_1.default.error(mgs);
            },
        });
    });
    const handleDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
        mutationDelete.mutate(id, {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ['sliders', PAGE],
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
    const postImage = (data) => __awaiter(void 0, void 0, void 0, function* () {
        mutationCreate.mutate(data, {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ['sliders', PAGE],
                    exact: true,
                });
                react_hot_toast_1.default.success('Create Success');
            },
            onError(error) {
                var _a, _b;
                const mgs = (_b = ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data).message) !== null && _b !== void 0 ? _b : 'Something went wrong!';
                react_hot_toast_1.default.error(mgs);
            },
        });
    });
    const putImage = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
        const newData = [...data, id];
        mutationUpdate.mutate(newData, {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ['sliders', PAGE],
                    exact: true,
                });
                react_hot_toast_1.default.success('Update Success');
            },
            onError(error) {
                var _a, _b;
                const mgs = (_b = ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data).message) !== null && _b !== void 0 ? _b : 'Something went wrong!';
                react_hot_toast_1.default.error(mgs);
            },
        });
    });
    const mutationUpLoad = (0, react_query_1.useMutation)({ mutationFn: (body) => Apis.upload('sliders', body) });
    const mutationCreate = (0, react_query_1.useMutation)({ mutationFn: (body) => Apis.createSlider(body) });
    const mutationUpdate = (0, react_query_1.useMutation)({ mutationFn: (body) => Apis.updateSlider(body) });
    const mutationDelete = (0, react_query_1.useMutation)({ mutationFn: (id) => Apis.destroySlider(id) });
    const isLoad = query.isLoading ||
        mutationUpLoad.isLoading ||
        mutationCreate.isLoading ||
        mutationUpdate.isLoading ||
        mutationDelete.isLoading;
    const response = (_a = query.data) === null || _a === void 0 ? void 0 : _a.data;
    if (query.error)
        return Layouts.Error(query.error.message);
    return (<div className="flex flex-col h-full gap-8 px-4 pt-12">
            {isLoad ? <Layouts.Loading /> : null}

            <Layouts.Breadcrumb page="sliders"/>

            <div className="pb-8">
                <label className="flex items-center justify-center w-12 h-12 cursor-pointer">
                    <input type="file" multiple className="hidden" onChange={(event) => uploadPhoto(event)}/>
                    <img src="/icon/plus.png" className="w-10 h-10" alt=""/>
                </label>

                <div className="grid grid-cols-1 gap-6 mx-auto my-8 sm:grid-cols-2 md:grid-cols-2">
                    {response &&
            response.contents.map((item, index) => (<div key={index} className="duration-300 shadow-lg max-h-[300px] relative hover:shadow-xl hover:transform hover:scale-105">
                                <img className="w-full h-full rounded-xl" src={item.photo} alt=""/>
                                <div className="absolute top-0 right-0 flex gap-1 mt-2">
                                    <label className="p-2 text-white bg-black rounded-full cursor-pointer opacity-80">
                                        <Layouts.EditIcon />
                                        <input type="file" className="hidden" onChange={(event) => uploadPhoto(event, item._id)}/>
                                    </label>
                                    <label onClick={() => handleDelete(item._id)} className="p-2 text-white bg-black rounded-full cursor-pointer opacity-80">
                                        <Layouts.CloseIcon />
                                    </label>
                                </div>
                            </div>))}
                </div>
            </div>
        </div>);
};
exports.ListSlider = ListSlider;
