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
exports.createUser = exports.updateUser = exports.destroyUser = exports.getUserById = exports.getListUsers = void 0;
const axiosClient_1 = require("libraries/axiosClient");
const urlUser = '/api/user';
const getListUsers = (PAGE, LIMIT) => __awaiter(void 0, void 0, void 0, function* () { return yield axiosClient_1.axiosClient.get(`${urlUser}?page=${PAGE}&limit=${LIMIT}`); });
exports.getListUsers = getListUsers;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield axiosClient_1.axiosClient.get(`${urlUser}/${id}`); });
exports.getUserById = getUserById;
const destroyUser = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield axiosClient_1.axiosClient.delete(`${urlUser}/${id}`); });
exports.destroyUser = destroyUser;
const updateUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () { return axiosClient_1.axiosClient.patch(`${urlUser}/${id}`, data); });
exports.updateUser = updateUser;
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () { return axiosClient_1.axiosClient.post(`${urlUser}`, data); });
exports.createUser = createUser;
