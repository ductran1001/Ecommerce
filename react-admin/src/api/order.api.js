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
exports.updateOrder = exports.destroyOrder = exports.getOrderById = exports.getListOrders = void 0;
const axiosClient_1 = require("libraries/axiosClient");
const urlOrder = '/api/order';
const getListOrders = (PAGE, LIMIT) => __awaiter(void 0, void 0, void 0, function* () { return yield axiosClient_1.axiosClient.get(`${urlOrder}?page=${PAGE}&limit=${LIMIT}`); });
exports.getListOrders = getListOrders;
const getOrderById = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield axiosClient_1.axiosClient.get(`${urlOrder}/${id}`); });
exports.getOrderById = getOrderById;
const destroyOrder = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield axiosClient_1.axiosClient.delete(`${urlOrder}/${id}`); });
exports.destroyOrder = destroyOrder;
const updateOrder = (id, status) => __awaiter(void 0, void 0, void 0, function* () { return axiosClient_1.axiosClient.patch(`${urlOrder}/${id}`, { status }); });
exports.updateOrder = updateOrder;
