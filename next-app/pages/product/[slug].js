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
exports.getStaticProps = exports.getStaticPaths = void 0;
const react_1 = __importDefault(require("react"));
const Layout_1 = require("@/components/common/Layout");
const Gallery_1 = require("@/components/pages/ProductDetails/Gallery");
const ContentDetails_1 = require("@/components/pages/ProductDetails/ContentDetails");
const Description_1 = require("@/components/pages/ProductDetails/Description");
const Related_1 = require("@/components/pages/ProductDetails/Related");
const getStaticProps_1 = require("lib/getStaticProps");
const react_redux_1 = require("react-redux");
const cartSlice_1 = require("@/redux/slice/cartSlice");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const ProductDetails = ({ dataCategories, singleProduct, dataProductsGroupCategory }) => {
    var _a, _b, _c, _d;
    const dispatch = (0, react_redux_1.useDispatch)();
    const addCart = (data) => {
        dispatch((0, cartSlice_1.addToCart)(data));
        react_hot_toast_1.default.success('Success');
    };
    const filterProductByCategory = (_a = dataProductsGroupCategory === null || dataProductsGroupCategory === void 0 ? void 0 : dataProductsGroupCategory.filter((product) => product._id === singleProduct.category._id)) !== null && _a !== void 0 ? _a : [];
    const relatedProducts = (_d = (_c = (_b = filterProductByCategory[0]) === null || _b === void 0 ? void 0 : _b.products) === null || _c === void 0 ? void 0 : _c.filter((pro) => pro._id !== singleProduct._id)) !== null && _d !== void 0 ? _d : [];
    return (<Layout_1.Layout dataCategories={dataCategories}>
            <div className="flex flex-col bg-white gap-y-4">
                <div className="grid gap-6 px-6 py-3 pt-4 pb-6 lg:grid-cols-2">
                    <Gallery_1.Gallery singleProduct={singleProduct}/>
                    <ContentDetails_1.ContentDetails singleProduct={singleProduct} onClick={() => addCart(singleProduct)}/>
                </div>
                <div className="px-6 py-3">
                    <Description_1.Description singleProduct={singleProduct}/>
                    <Related_1.Related relatedProducts={relatedProducts}/>
                </div>
            </div>
        </Layout_1.Layout>);
};
function getStaticPaths() {
    return __awaiter(this, void 0, void 0, function* () {
        // Call an external API endpoint to get posts
        const getAllProducts = yield getStaticProps_1.axiosClient.get('/api/product');
        const data = getAllProducts.data.contents;
        // Get the paths we want to prerender based on posts
        // In production environments, prerender all pages
        // (slower builds, but faster initial page load)
        const paths = data.map((product) => ({
            params: { slug: product.slug },
        }));
        // { fallback: false } means other routes should 404
        return { paths, fallback: true };
    });
}
exports.getStaticPaths = getStaticPaths;
const getStaticProps = (context) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const slug = (_a = context.params) === null || _a === void 0 ? void 0 : _a.slug;
    try {
        // params contains the post `id`.
        // If the route is like /posts/1, then params.id is 1
        const getAllCategory = yield getStaticProps_1.axiosClient.get('/api/category');
        const dataCategories = getAllCategory.data.contents;
        const product = yield (0, getStaticProps_1.axiosClient)(`/api/product-get-by-slug/${slug}`);
        const singleProduct = product.data.contents;
        const getAllProductsGroupCategory = yield getStaticProps_1.axiosClient.get('/api/product-group-category');
        const dataProductsGroupCategory = getAllProductsGroupCategory.data;
        // Pass post data to the page via props
        return { props: { dataCategories, singleProduct, dataProductsGroupCategory } };
    }
    catch (error) {
        return { props: {} };
    }
});
exports.getStaticProps = getStaticProps;
exports.default = ProductDetails;
