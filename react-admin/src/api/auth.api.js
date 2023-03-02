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
exports.registerUser = exports.loginUser = exports.getUserApi = void 0;
const axiosClient_1 = require("libraries/axiosClient");
const authSlice_1 = require("redux/slice/authSlice");
const urlAuth = '/api/auth';
const getUserApi = (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axiosClient_1.axiosClient.get('/api/user/me');
        dispatch((0, authSlice_1.getUser)(response.data.contents));
        return response;
    }
    catch (error) {
        window.localStorage.clear();
        console.log(error);
    }
});
exports.getUserApi = getUserApi;
const loginUser = (data) => __awaiter(void 0, void 0, void 0, function* () { return axiosClient_1.axiosClient.post(`${urlAuth}/login`, data); });
exports.loginUser = loginUser;
const registerUser = (data) => __awaiter(void 0, void 0, void 0, function* () { return axiosClient_1.axiosClient.post(`${urlAuth}/register`, data); });
exports.registerUser = registerUser;
