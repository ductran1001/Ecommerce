"use strict";
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
exports.getServerSideProps = void 0;
const react_1 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
const Layout_1 = require("@/components/common/Layout");
const getStaticProps_1 = require("@/lib/getStaticProps");
const CardProduct_1 = require("@/components/card/CardProduct");
const cartSlice_1 = require("@/redux/slice/cartSlice");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const Search = ({ dataCategories, dataProductsSearch }) => {
    const [slice, setSlice] = react_1.default.useState(4);
    const dispatch = (0, react_redux_1.useDispatch)();
    const addCart = (data) => {
        dispatch((0, cartSlice_1.addToCart)(data));
        react_hot_toast_1.default.success('Success');
    };
    return (<Layout_1.Layout dataCategories={dataCategories}>
            {(dataProductsSearch === null || dataProductsSearch === void 0 ? void 0 : dataProductsSearch.length) > 0 && (<div className="bg-white flex flex-col gap-y-4">
                    <div className="pb-12 px-6 py-3 mt-8">
                        <div className="grid gap-6 lg:grid-cols-6 sm:grid-cols-3">
                            {dataProductsSearch === null || dataProductsSearch === void 0 ? void 0 : dataProductsSearch.slice(0, slice).map((product) => (<CardProduct_1.CardProduct key={product._id} product={product} onClick={() => addCart(product)}/>))}
                        </div>
                        {dataProductsSearch.length !== slice && (<div className="text-center mt-12">
                                <button onClick={() => setSlice((prev) => prev + 4)} className="px-6 hover:opacity-75 py-2.5 bg-primary text-white uppercase">
                                    Xem Thêm
                                </button>
                            </div>)}
                    </div>
                </div>)}
        </Layout_1.Layout>);
};
const getServerSideProps = (context) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const getAllCategory = yield getStaticProps_1.axiosClient.get('/api/category');
        const dataCategories = getAllCategory.data.contents;
        const getAllProductSearch = yield getStaticProps_1.axiosClient.get(`/api/product/search?q=${(_a = context.query) === null || _a === void 0 ? void 0 : _a.q}`);
        const dataProductsSearch = getAllProductSearch.data.contents;
        // Pass post data to the page via props
        return { props: { dataCategories, dataProductsSearch } };
    }
    catch (error) {
        return { props: {} };
    }
});
exports.getServerSideProps = getServerSideProps;
exports.default = Search;
