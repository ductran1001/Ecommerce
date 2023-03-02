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
exports.getStaticProps = exports.axiosClient = exports.API_URL = void 0;
const axios_1 = __importDefault(require("axios"));
exports.API_URL = 'http://localhost:9000';
exports.axiosClient = axios_1.default.create({
    baseURL: exports.API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
const getStaticProps = (context) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const getAllCategory = (_a = (yield exports.axiosClient.get('/api/category'))) !== null && _a !== void 0 ? _a : [];
        const dataCategories = getAllCategory.data.contents;
        const getAllSliders = (_b = (yield exports.axiosClient.get('/api/slider'))) !== null && _b !== void 0 ? _b : [];
        const dataSliders = getAllSliders.data.contents;
        // const getAllProducts = await axiosClient.get('/api/product');
        // const dataProducts = getAllProducts.data.products;
        const getAllProductsGroupCategory = (_c = (yield exports.axiosClient.get('/api/product-group-category'))) !== null && _c !== void 0 ? _c : [];
        const dataProductsGroupCategory = getAllProductsGroupCategory.data;
        return {
            props: {
                dataSliders,
                dataCategories,
                // dataProducts,
                dataProductsGroupCategory,
            }, // will be passed to the page component as props
        };
    }
    catch (error) {
        return {
            props: {}, // will be passed to the page component as props
        };
    }
});
exports.getStaticProps = getStaticProps;
