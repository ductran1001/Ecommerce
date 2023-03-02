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
const Layout_1 = require("@/components/common/Layout");
const getStaticProps_1 = require("lib/getStaticProps");
const Sidebar_1 = require("@/components/pages/Category/Sidebar");
const Sorting_1 = require("@/components/pages/Category/Sorting");
const ProductWrapper_1 = require("@/components/pages/Category/ProductWrapper");
const CategoryPage = ({ dataCategories, dataBrands, dataProductFilter }) => {
    const [hiddenSidebar, setHiddenSidebar] = react_1.default.useState(true);
    return (<Layout_1.Layout dataCategories={dataCategories}>
            <div className="bg-white flex flex-col gap-y-4">
                <div className="bg-white px-6 grid lg:grid-cols-4 gap-6 pt-4 pb-16 items-start relative">
                    <Sidebar_1.Sidebar onClick={() => setHiddenSidebar(false)} dataBrands={dataBrands} hiddenSidebar={hiddenSidebar}/>
                    <div className="col-span-3">
                        <Sorting_1.Sorting onClick={() => setHiddenSidebar((prev) => !prev)}/>
                        <ProductWrapper_1.ProductWrapper dataProductFilter={dataProductFilter}/>
                    </div>
                </div>
            </div>
        </Layout_1.Layout>);
};
const getServerSideProps = (context) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const categoryId = (_a = context.query) === null || _a === void 0 ? void 0 : _a.slug;
    const brandId = (_b = context.query) === null || _b === void 0 ? void 0 : _b.brand;
    const sort = ((_c = context.query) === null || _c === void 0 ? void 0 : _c.sort) || 'asc';
    const min = ((_d = context.query) === null || _d === void 0 ? void 0 : _d.min) || 0;
    const max = ((_e = context.query) === null || _e === void 0 ? void 0 : _e.max) || 999999999999;
    let query = `?sort=${sort}&category=${categoryId}&price[lte]=${max}&price[gte]=${min}`;
    if (brandId && brandId !== 'default') {
        query = query + `&brand=${brandId}`;
    }
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    try {
        const getProductFilter = (_f = (yield (0, getStaticProps_1.axiosClient)(`/api/product${query}`))) !== null && _f !== void 0 ? _f : [];
        const dataProductFilter = (_g = getProductFilter.data) !== null && _g !== void 0 ? _g : [];
        const getAllCategory = yield getStaticProps_1.axiosClient.get('/api/category');
        const dataCategories = getAllCategory.data.contents;
        const getAllBrand = yield getStaticProps_1.axiosClient.get('/api/brand');
        const dataBrands = (_h = getAllBrand.data.contents) !== null && _h !== void 0 ? _h : [];
        // Pass post data to the page via props
        return { props: { dataCategories, dataBrands, dataProductFilter } };
    }
    catch (error) {
        return { props: {} };
    }
});
exports.getServerSideProps = getServerSideProps;
exports.default = CategoryPage;
