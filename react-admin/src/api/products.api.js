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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMultiTrashProduct = exports.restoreMultiProduct = exports.deleteMultiProduct = exports.createProduct = exports.updateProduct = exports.destroyProduct = exports.getProductById = exports.getListProductsTrash = exports.getListProducts = void 0;
const axiosClient_1 = require("libraries/axiosClient");
const urlProduct = '/api/product';
const getListProducts = (PAGE, LIMIT, category, sort) => __awaiter(void 0, void 0, void 0, function* () {
    let baseRequest = `${urlProduct}?page=${PAGE}&limit=${LIMIT}&sort=${sort}`;
    if (category) {
        baseRequest = baseRequest + `&category=${category}`;
    }
    return yield axiosClient_1.axiosClient.get(`${baseRequest}`);
});
exports.getListProducts = getListProducts;
const getListProductsTrash = (PAGE, LIMIT, softDelete, category, sort) => __awaiter(void 0, void 0, void 0, function* () {
    let baseRequest = `${urlProduct}?page=${PAGE}&limit=${LIMIT}&softDelete=${softDelete}&sort=${sort}`;
    if (category) {
        baseRequest = baseRequest + `&category=${category}`;
    }
    return yield axiosClient_1.axiosClient.get(`${baseRequest}`);
});
exports.getListProductsTrash = getListProductsTrash;
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield axiosClient_1.axiosClient.get(`${urlProduct}/${id}`); });
exports.getProductById = getProductById;
const destroyProduct = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield axiosClient_1.axiosClient.delete(`${urlProduct}/${id}`); });
exports.destroyProduct = destroyProduct;
const updateProduct = (id, data) => __awaiter(void 0, void 0, void 0, function* () { return axiosClient_1.axiosClient.patch(`${urlProduct}/${id}`, data); });
exports.updateProduct = updateProduct;
const createProduct = (data) => __awaiter(void 0, void 0, void 0, function* () { return axiosClient_1.axiosClient.post(`${urlProduct}`, data); });
exports.createProduct = createProduct;
const deleteMultiProduct = (id) => __awaiter(void 0, void 0, void 0, function* () { return axiosClient_1.axiosClient.patch(`${urlProduct}-delete-multi`, { id }); });
exports.deleteMultiProduct = deleteMultiProduct;
const restoreMultiProduct = (id) => __awaiter(void 0, void 0, void 0, function* () { return axiosClient_1.axiosClient.patch(`${urlProduct}-restore-multi`, { id }); });
exports.restoreMultiProduct = restoreMultiProduct;
const deleteMultiTrashProduct = (id) => __awaiter(void 0, void 0, void 0, function* () { return axiosClient_1.axiosClient.patch(`${urlProduct}-delete-multi-trash`, { id }); });
exports.deleteMultiTrashProduct = deleteMultiTrashProduct;
