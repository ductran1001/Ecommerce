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
exports.axiosClient = exports.API_URL = void 0;
const axios_1 = __importDefault(require("axios"));
exports.API_URL = 'http://localhost:9000';
const axiosClient = axios_1.default.create({
    baseURL: exports.API_URL,
    headers: { 'Content-Type': 'application/json' },
});
exports.axiosClient = axiosClient;
// REQUEST
axiosClient.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
}, (error) => {
    Promise.reject(error);
});
// RESPONSE
axiosClient.interceptors.response.use((response) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const token = (_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a.contents) === null || _b === void 0 ? void 0 : _b.token;
    const refreshToken = (_d = (_c = response.data) === null || _c === void 0 ? void 0 : _c.contents) === null || _d === void 0 ? void 0 : _d.refreshToken;
    // LOGIN
    if (token)
        window.localStorage.setItem('token', token);
    if (refreshToken)
        window.localStorage.setItem('refreshToken', refreshToken);
    return response;
}), (error) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f;
    if (((_e = error === null || error === void 0 ? void 0 : error.response) === null || _e === void 0 ? void 0 : _e.status) !== 401)
        return Promise.reject(error);
    const originalConfig = error.config;
    if (((_f = error === null || error === void 0 ? void 0 : error.response) === null || _f === void 0 ? void 0 : _f.status) === 401 && !originalConfig.sent) {
        originalConfig.sent = true;
        try {
            // Tr?????ng h???p kh??ng c?? token th?? chuy???n sang trang LOGIN
            const token = window.localStorage.getItem('token');
            if (!token && !error.response.data.message) {
                window.location.href = '/admin/login';
                return Promise.reject(error);
            }
            const refreshToken = window.localStorage.getItem('refreshToken');
            if (refreshToken) {
                const response = yield axiosClient.post('/api/auth/refresh-token', {
                    refreshToken: refreshToken,
                });
                const { token } = response.data;
                window.localStorage.setItem('token', token);
                originalConfig.headers = Object.assign(Object.assign({}, originalConfig.headers), { authorization: `Bearer ${token}` });
                return axiosClient(originalConfig);
            }
            else {
                return Promise.reject(error);
            }
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
}));
