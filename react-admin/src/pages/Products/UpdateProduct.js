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
exports.UpdateProduct = void 0;
const react_1 = __importDefault(require("react"));
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const react_router_dom_1 = require("react-router-dom");
const react_redux_1 = require("react-redux");
const react_query_1 = require("@tanstack/react-query");
const react_hook_form_1 = require("react-hook-form");
const yup_1 = require("@hookform/resolvers/yup");
const Layouts = __importStar(require("components/Layouts"));
const Utils = __importStar(require("utils"));
const Apis = __importStar(require("api"));
const UpdateProduct = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { id } = (0, react_router_dom_1.useParams)();
    const { user } = (0, react_redux_1.useSelector)((state) => state.auth);
    const [colorSelect, setColorSelect] = react_1.default.useState([]);
    const [product, setProduct] = react_1.default.useState(Utils.initialStateProductForm);
    const [categories, setCategories] = react_1.default.useState([]);
    const [colors, setColors] = react_1.default.useState([]);
    const [brands, setBrands] = react_1.default.useState([]);
    const [errCategory, setErrCategory] = react_1.default.useState(false);
    const [errColor, setErrColor] = react_1.default.useState(false);
    const [errBrand, setErrBrand] = react_1.default.useState(false);
    const [errImg, setErrImg] = react_1.default.useState(false);
    const { register, handleSubmit, formState: { errors, isValid }, } = (0, react_hook_form_1.useForm)({
        resolver: (0, yup_1.yupResolver)(Utils.productSchema),
        mode: 'onChange',
        defaultValues: product,
        values: product,
        resetOptions: {
            keepDirtyValues: true, // user-interacted input will be retained
        },
    });
    const handleInputChange = (event) => {
        setProduct((prevState) => (Object.assign(Object.assign({}, prevState), { [event.target.name]: event.target.value })));
    };
    const handleInputChangeColor = (event) => {
        const colorSelected = colors.filter((color) => color._id === event.target.value);
        const check = colorSelect.find((color) => color._id === event.target.value);
        check ? setColorSelect(colorSelect) : setColorSelect((prevState) => [...prevState, ...colorSelected]);
    };
    const handleDeleteColor = (id) => {
        const colorSelected = colorSelect.filter((color) => color._id !== id);
        setColorSelect(colorSelected);
    };
    const handleSetAvatar = (link) => {
        setProduct((prevState) => (Object.assign(Object.assign({}, prevState), { imageURL: [...prevState.imageURL.filter((photo) => photo !== link)] })));
        setProduct((prevState) => (Object.assign(Object.assign({}, prevState), { imageURL: [link, ...prevState.imageURL] })));
    };
    const uploadPhoto = (event, imgEdit) => __awaiter(void 0, void 0, void 0, function* () {
        const { files } = event.target;
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('file', files[i]);
        }
        mutationUpLoad.mutate(formData, {
            onSuccess: (data) => {
                const newItems = imgEdit
                    ? product.imageURL.map((item) => (item === imgEdit ? data.data.publicUrl : item))
                    : [];
                imgEdit
                    ? setProduct((prev) => (Object.assign(Object.assign({}, prev), { imageURL: newItems })))
                    : setProduct((prev) => (Object.assign(Object.assign({}, prev), { imageURL: [...prev.imageURL, ...data.data.publicUrl] })));
            },
            onError(error) {
                var _a, _b;
                const mgs = (_b = ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data).message) !== null && _b !== void 0 ? _b : 'Something went wrong!';
                react_hot_toast_1.default.error(mgs);
            },
        });
    });
    const handleDelete = (url) => {
        const arr = product.imageURL;
        const newArr = arr.filter((item) => item !== url);
        setProduct((prev) => (Object.assign(Object.assign({}, prev), { imageURL: newArr })));
    };
    const mutationUpdate = (0, react_query_1.useMutation)({
        mutationFn: (body) => Apis.updateProduct(id, body),
    });
    const mutationUpLoad = (0, react_query_1.useMutation)({ mutationFn: (body) => Apis.upload('products', body) });
    const onSubmit = (data) => __awaiter(void 0, void 0, void 0, function* () {
        const idColor = colorSelect.map((data) => data._id);
        idColor.length === 0 ? setErrColor(true) : setErrColor(false);
        data.brand === '' || data.brand === 'DEFAULT' ? setErrBrand(true) : setErrBrand(false);
        data.category === '' || data.category === 'DEFAULT' ? setErrCategory(true) : setErrCategory(false);
        data.imageURL.length === 0 ? setErrImg(true) : setErrImg(false);
        const newData = Object.assign(Object.assign({}, data), { color: idColor, user: user === null || user === void 0 ? void 0 : user._id });
        const isOk = data.brand !== '' &&
            data.brand !== 'DEFAULT' &&
            data.category !== '' &&
            data.category !== 'DEFAULT' &&
            data.imageURL.length !== 0 &&
            idColor.length;
        if (isOk) {
            mutationUpdate.mutate(newData, {
                onSuccess: () => {
                    react_hot_toast_1.default.success('Update Success');
                    navigate('/admin/products');
                },
                onError(error) {
                    var _a, _b;
                    const mgs = (_b = ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data).message) !== null && _b !== void 0 ? _b : 'Something went wrong!';
                    react_hot_toast_1.default.error(mgs);
                },
            });
        }
    });
    const queryProduct = (0, react_query_1.useQuery)({
        queryKey: ['product', id],
        queryFn: () => Apis.getProductById(id),
        enabled: id !== undefined,
        onSuccess: (data) => {
            setColorSelect((prevState) => [...prevState, ...data.data.contents.color]);
            setProduct((prevState) => (Object.assign(Object.assign({}, prevState), data.data.contents)));
        },
    });
    const queryCategories = (0, react_query_1.useQuery)({
        queryKey: ['categories'],
        queryFn: () => Apis.getListCategories(),
        onSuccess: (data) => setCategories(data.data.contents),
    });
    const queryColors = (0, react_query_1.useQuery)({
        queryKey: ['colors'],
        queryFn: () => Apis.getListColors(),
        onSuccess: (data) => setColors(data.data.contents),
    });
    const queryBrands = (0, react_query_1.useQuery)({
        queryKey: ['brands'],
        queryFn: () => Apis.getListBrands(),
        onSuccess: (data) => setBrands(data.data.contents),
    });
    if (queryProduct.error)
        return Layouts.Error(queryProduct.error.message);
    const isLoad = queryCategories.isLoading ||
        queryProduct.isLoading ||
        queryColors.isLoading ||
        queryBrands.isLoading ||
        mutationUpdate.isLoading;
    return (<div className="flex flex-col h-full gap-10 px-4 pt-12">
            {isLoad ? <Layouts.Loading /> : null}

            <Layouts.Breadcrumb page="products" sub="update"/>
            <div className="flex flex-col items-center justify-center">
                <div className="flex flex-col w-full px-4 py-16 mb-12 bg-white rounded-md shadow-md sm:px-6 md:px-8 lg:px-10">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-full px-4 py-8 mx-auto space-y-6 border lg:w-4/5 sm:px-6 md:px-8 lg:px-10">
                            <div className="flex flex-col">
                                <div className="flex items-center">
                                    <label className="w-1/4 text-sm font-medium text-gray-900 uppercase">name</label>
                                    <input {...register('name')} className="flex-1 pl-4" type="text" name="name" placeholder="Product Name"/>
                                </div>
                                {(errors === null || errors === void 0 ? void 0 : errors.name) && <ErrMess message={errors.name.message}/>}
                            </div>

                            <div className="flex flex-col">
                                <div className="flex items-center">
                                    <label className="w-1/4 text-sm font-medium text-gray-900 uppercase">
                                        description
                                    </label>
                                    <textarea {...register('description')} className="flex-1 pl-4" name="description" placeholder="Product Description" rows={5}/>
                                </div>
                                {(errors === null || errors === void 0 ? void 0 : errors.description) && <ErrMess message={errors.description.message}/>}
                            </div>

                            <div className="flex flex-col">
                                <div className="flex items-center">
                                    <label className="w-1/4 text-sm font-medium text-gray-900 uppercase">price</label>

                                    <input {...register('price')} className="flex-1 pl-4" type="number" name="price" defaultValue={product.price} placeholder="Product Price"/>
                                </div>
                                {(errors === null || errors === void 0 ? void 0 : errors.price) && <ErrMess message={errors.price.message}/>}
                            </div>

                            <div className="flex flex-col">
                                <div className="flex items-center">
                                    <label className="w-1/4 text-sm font-medium text-gray-900 uppercase">
                                        promotion
                                    </label>

                                    <input {...register('promotion')} className="flex-1 pl-4" type="number" name="promotion" defaultValue={product.promotion} placeholder="Product promotion"/>
                                </div>
                                {(errors === null || errors === void 0 ? void 0 : errors.promotion) && <ErrMess message={errors.promotion.message}/>}
                            </div>

                            <div className="flex flex-col">
                                <div className="flex items-center">
                                    <label className="w-1/4 text-sm font-medium text-gray-900 uppercase">
                                        quantity
                                    </label>

                                    <input {...register('quantity')} className="flex-1 pl-4" type="number" name="quantity" defaultValue={product.quantity} placeholder="Product quantity"/>
                                </div>

                                {(errors === null || errors === void 0 ? void 0 : errors.quantity) && <ErrMess message={errors.quantity.message}/>}
                            </div>

                            <div className="flex flex-col">
                                <div className="flex items-center">
                                    <label className="w-1/4 text-sm font-medium text-gray-900 uppercase">colors</label>
                                    {queryColors.error ? (<div className="text-red-500">
                                            An error has occurred: {queryColors.error.message}
                                        </div>) : (colors.length > 0 && (<select defaultValue="DEFAULT" name="color" className="pl-4 flex-1 focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5" onChange={(event) => handleInputChangeColor(event)}>
                                                <option value="DEFAULT">Choose a color</option>
                                                {colors.map((color, index) => (<option value={color._id} key={index}>
                                                        {color.title}
                                                    </option>))}
                                            </select>))}
                                </div>
                                {colorSelect.length > 0 && (<div className="flex items-end justify-end w-full">
                                        <div className="w-full mt-8 text-sm italic items-center capitalize sm:w-3/4 flex gap-4">
                                            {colorSelect.map((item, i) => (<div key={i} className="relative">
                                                    <div className="w-12 h-12 border" style={{ backgroundColor: item.code }}></div>
                                                    <button type="button" onClick={() => handleDeleteColor(item._id)} className="absolute text-white rounded-full bg-black opacity-80 px-2 py-1 text-sm -mt-2 -top-1 -right-1">
                                                        X
                                                    </button>
                                                </div>))}

                                            <button onClick={() => setColorSelect([])} type="button" className="text-red-500 text-base">
                                                Clear
                                            </button>
                                        </div>
                                    </div>)}

                                {errColor && <ErrMess message="Color is required"/>}
                            </div>

                            <div className="flex flex-col">
                                <div className="flex items-center">
                                    <label className="w-1/4 text-sm font-medium text-gray-900 uppercase">Brands</label>
                                    {queryBrands.error ? (<div className="text-red-500">
                                            An error has occurred: {queryBrands.error.message}
                                        </div>) : (brands.length > 0 && (<select defaultValue={product.brand} name="brand" className="pl-4 flex-1 focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5" onChange={(event) => handleInputChange(event)}>
                                                <option value="DEFAULT">Choose a brand</option>
                                                {brands.map((brand, index) => (<option value={brand._id} key={index}>
                                                        {brand.title}
                                                    </option>))}
                                            </select>))}
                                </div>
                                {errBrand && <ErrMess message=" Brand is required"/>}
                            </div>

                            <div className="flex flex-col">
                                <div className="flex items-center">
                                    <label className="w-1/4 text-sm font-medium text-gray-900 uppercase">
                                        category
                                    </label>

                                    {queryCategories.error ? (<div className="text-red-500">
                                            An error has occurred: {queryCategories.error.message}
                                        </div>) : (categories.length > 0 && (<select defaultValue={product.category} name="category" className="pl-4 flex-1 focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5" onChange={(event) => handleInputChange(event)}>
                                                <option value="DEFAULT">Choose a category</option>
                                                {categories.map((category, index) => (<option value={category._id} key={index}>
                                                        {category.name}
                                                    </option>))}
                                            </select>))}
                                </div>

                                {errCategory && <ErrMess message="Category is required"/>}
                            </div>

                            <div className="flex flex-col">
                                <div className="flex items-center">
                                    <label className="w-1/4 text-sm font-medium text-gray-900 uppercase">Images</label>

                                    <label className="flex flex-col items-center justify-center flex-1 pt-5 pb-6 border border-gray-400 rounded-lg cursor-pointer">
                                        <img src="/icon/UpLoadImageIcon.png" className="w-16 h-16" alt=""/>

                                        <p className="mb-2 text-xs text-gray-500 md:text-base">
                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="hidden text-sm text-gray-500 md:block dark:text-gray-400">
                                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                                        </p>
                                        <input onChange={(event) => uploadPhoto(event)} multiple id="dropzone-file" type="file" className="hidden"/>
                                    </label>
                                </div>
                                {errImg && <ErrMess message="Images is required"/>}
                            </div>
                            <div className="flex items-center justify-end">
                                <div className="grid w-3/4 grid-cols-2 gap-4 lg:grid-cols-3">
                                    {product.imageURL.length > 0 &&
            product.imageURL.map((img, index) => (<div key={index} className="relative h-40">
                                                <div className="absolute top-0 right-0 flex gap-1 mt-2">
                                                    <label onClick={() => handleSetAvatar(img)} className="p-1.5 text-white bg-black rounded-full cursor-pointer opacity-80">
                                                        <Layouts.StarIcon />
                                                    </label>

                                                    <label className="p-1.5 text-white bg-black rounded-full cursor-pointer opacity-80">
                                                        <Layouts.EditIcon />
                                                        <input type="file" className="hidden" onChange={(event) => uploadPhoto(event, img)}/>
                                                    </label>
                                                    <label onClick={() => handleDelete(img)} className="p-1.5 text-white bg-black rounded-full cursor-pointer opacity-80">
                                                        <Layouts.CloseIcon />
                                                    </label>
                                                </div>

                                                <img className="w-full h-full rounded-lg" src={img} alt=""/>
                                            </div>))}
                                </div>
                            </div>
                            <div className="flex items-center">
                                <label className="w-1/4 text-sm font-medium text-gray-900 uppercase">Active</label>
                                <div className="flex flex-1 gap-4 font-normal text-gray-900">
                                    <div onClick={() => setProduct((prev) => (Object.assign(Object.assign({}, prev), { active: true })))} className="flex gap-2 cursor-pointer">
                                        <label className="flex items-center w-6 h-6 border border-gray-400">
                                            {product.active && <img src="/icon/CheckIcon.png" alt=""/>}
                                        </label>
                                        <div>Active</div>
                                    </div>
                                    <div onClick={() => setProduct((prev) => (Object.assign(Object.assign({}, prev), { active: false })))} className="flex gap-2 cursor-pointer">
                                        <label className="flex items-center w-6 h-6 border border-gray-400">
                                            {!product.active && <img src="/icon/x-icon.png" alt=""/>}
                                        </label>
                                        <div>Inactive</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-end justify-end w-full">
                                <button disabled={!isValid} type="submit" className="flex items-center justify-center w-3/4 py-2 text-base text-white bg-blue-600 rounded hover:bg-blue-700">
                                    <span className="uppercase">submit</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>);
};
exports.UpdateProduct = UpdateProduct;
const ErrMess = ({ message }) => (<div className="flex items-end justify-end w-full">
        <p className="w-full mt-2 text-sm italic text-red-600 capitalize sm:w-3/4">{message}</p>
    </div>);
