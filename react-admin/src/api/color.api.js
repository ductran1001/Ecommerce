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
exports.deleteMultiTrashColor = exports.restoreMultiColor = exports.deleteMultiColor = exports.createColor = exports.updateColor = exports.destroyColor = exports.getColorById = exports.getListColorsTrash = exports.getListColors = void 0;
const axiosClient_1 = require("libraries/axiosClient");
const urlColor = '/api/color';
const getListColors = (PAGE, LIMIT) => __awaiter(void 0, void 0, void 0, function* () { return yield axiosClient_1.axiosClient.get(`${urlColor}?page=${PAGE}&limit=${LIMIT}`); });
exports.getListColors = getListColors;
const getListColorsTrash = (PAGE, LIMIT, softDelete) => __awaiter(void 0, void 0, void 0, function* () { return yield axiosClient_1.axiosClient.get(`${urlColor}?page=${PAGE}&limit=${LIMIT}&softDelete=${softDelete}`); });
exports.getListColorsTrash = getListColorsTrash;
const getColorById = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield axiosClient_1.axiosClient.get(`${urlColor}/${id}`); });
exports.getColorById = getColorById;
const destroyColor = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield axiosClient_1.axiosClient.delete(`${urlColor}/${id}`); });
exports.destroyColor = destroyColor;
const updateColor = (id, data) => __awaiter(void 0, void 0, void 0, function* () { return axiosClient_1.axiosClient.patch(`${urlColor}/${id}`, data); });
exports.updateColor = updateColor;
const createColor = (data) => __awaiter(void 0, void 0, void 0, function* () { return axiosClient_1.axiosClient.post(`${urlColor}`, data); });
exports.createColor = createColor;
const deleteMultiColor = (id) => __awaiter(void 0, void 0, void 0, function* () { return axiosClient_1.axiosClient.patch(`${urlColor}-delete-multi`, { id }); });
exports.deleteMultiColor = deleteMultiColor;
const restoreMultiColor = (id) => __awaiter(void 0, void 0, void 0, function* () { return axiosClient_1.axiosClient.patch(`${urlColor}-restore-multi`, { id }); });
exports.restoreMultiColor = restoreMultiColor;
const deleteMultiTrashColor = (id) => __awaiter(void 0, void 0, void 0, function* () { return axiosClient_1.axiosClient.patch(`${urlColor}-delete-multi-trash`, { id }); });
exports.deleteMultiTrashColor = deleteMultiTrashColor;
