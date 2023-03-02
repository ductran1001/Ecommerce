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
exports.deleteMultiTrashBrand = exports.restoreMultiBrand = exports.deleteMultiBrand = exports.createBrand = exports.updateBrand = exports.destroyBrand = exports.getBrandById = exports.getListBrandsTrash = exports.getListBrands = void 0;
const axiosClient_1 = require("libraries/axiosClient");
const urlBrand = '/api/brand';
const getListBrands = (PAGE, LIMIT) => __awaiter(void 0, void 0, void 0, function* () { return yield axiosClient_1.axiosClient.get(`${urlBrand}?page=${PAGE}&limit=${LIMIT}`); });
exports.getListBrands = getListBrands;
const getListBrandsTrash = (PAGE, LIMIT, softDelete) => __awaiter(void 0, void 0, void 0, function* () { return yield axiosClient_1.axiosClient.get(`${urlBrand}?page=${PAGE}&limit=${LIMIT}&softDelete=${softDelete}`); });
exports.getListBrandsTrash = getListBrandsTrash;
const getBrandById = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield axiosClient_1.axiosClient.get(`${urlBrand}/${id}`); });
exports.getBrandById = getBrandById;
const destroyBrand = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield axiosClient_1.axiosClient.delete(`${urlBrand}/${id}`); });
exports.destroyBrand = destroyBrand;
const updateBrand = (id, data) => __awaiter(void 0, void 0, void 0, function* () { return axiosClient_1.axiosClient.patch(`${urlBrand}/${id}`, data); });
exports.updateBrand = updateBrand;
const createBrand = (data) => __awaiter(void 0, void 0, void 0, function* () { return axiosClient_1.axiosClient.post(`${urlBrand}`, data); });
exports.createBrand = createBrand;
const deleteMultiBrand = (id) => __awaiter(void 0, void 0, void 0, function* () { return axiosClient_1.axiosClient.patch(`${urlBrand}-delete-multi`, { id }); });
exports.deleteMultiBrand = deleteMultiBrand;
const restoreMultiBrand = (id) => __awaiter(void 0, void 0, void 0, function* () { return axiosClient_1.axiosClient.patch(`${urlBrand}-restore-multi`, { id }); });
exports.restoreMultiBrand = restoreMultiBrand;
const deleteMultiTrashBrand = (id) => __awaiter(void 0, void 0, void 0, function* () { return axiosClient_1.axiosClient.patch(`${urlBrand}-delete-multi-trash`, { id }); });
exports.deleteMultiTrashBrand = deleteMultiTrashBrand;
