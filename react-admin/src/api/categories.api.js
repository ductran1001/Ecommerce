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
exports.deleteMultiTrashCategory = exports.restoreMultiCategory = exports.deleteMultiCategory = exports.createCategory = exports.updateCategory = exports.destroyCategory = exports.getCategoryById = exports.getListCategoriesTrash = exports.getListCategories = void 0;
const axiosClient_1 = require("libraries/axiosClient");
const urlCategory = '/api/category';
const getListCategories = (PAGE, LIMIT) => __awaiter(void 0, void 0, void 0, function* () { return yield axiosClient_1.axiosClient.get(`${urlCategory}?page=${PAGE}&limit=${LIMIT}`); });
exports.getListCategories = getListCategories;
const getListCategoriesTrash = (PAGE, LIMIT, softDelete) => __awaiter(void 0, void 0, void 0, function* () { return yield axiosClient_1.axiosClient.get(`${urlCategory}?page=${PAGE}&limit=${LIMIT}&softDelete=${softDelete}`); });
exports.getListCategoriesTrash = getListCategoriesTrash;
const getCategoryById = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield axiosClient_1.axiosClient.get(`${urlCategory}/${id}`); });
exports.getCategoryById = getCategoryById;
const destroyCategory = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield axiosClient_1.axiosClient.delete(`${urlCategory}/${id}`); });
exports.destroyCategory = destroyCategory;
const updateCategory = (id, data) => __awaiter(void 0, void 0, void 0, function* () { return axiosClient_1.axiosClient.patch(`${urlCategory}/${id}`, data); });
exports.updateCategory = updateCategory;
const createCategory = (data) => __awaiter(void 0, void 0, void 0, function* () { return axiosClient_1.axiosClient.post(`${urlCategory}`, data); });
exports.createCategory = createCategory;
const deleteMultiCategory = (id) => __awaiter(void 0, void 0, void 0, function* () { return axiosClient_1.axiosClient.patch(`${urlCategory}-delete-multi`, { id }); });
exports.deleteMultiCategory = deleteMultiCategory;
const restoreMultiCategory = (id) => __awaiter(void 0, void 0, void 0, function* () { return axiosClient_1.axiosClient.patch(`${urlCategory}-restore-multi`, { id }); });
exports.restoreMultiCategory = restoreMultiCategory;
const deleteMultiTrashCategory = (id) => __awaiter(void 0, void 0, void 0, function* () { return axiosClient_1.axiosClient.patch(`${urlCategory}-delete-multi-trash`, { id }); });
exports.deleteMultiTrashCategory = deleteMultiTrashCategory;
