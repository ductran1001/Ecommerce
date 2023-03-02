"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productBasicSchema = exports.productSchema = exports.loginSchema = exports.registerSchema = exports.updateUserPasswordSchema = exports.updateUserInfoSchema = exports.createUserSchema = exports.createBrandSchema = exports.createColorSchema = exports.createCategorySchema = void 0;
const Yup = __importStar(require("yup"));
const phoneNumberValidator = Yup.string().matches(/^\d{3}\d{3}\d{4}$/, 'Phone number is not valid');
const passwordValidator = (field) => Yup.string()
    .min(6, `${field} must be at least 6 characters`)
    .max(40, `${field} must not exceed 40 characters`)
    .required(`${field} is required`);
const fullName = Yup.string().required().min(6).trim();
const email = Yup.string().required().email();
const name = Yup.string().required();
const title = Yup.string().required();
const code = Yup.string().required();
const address = Yup.string().required();
const price = Yup.number().typeError('Price must be a number!').required().min(1);
const quantity = Yup.number().typeError('quantity must be a number!').required().min(1);
const promotion = Yup.number().typeError('promotion must be a number!').required().min(0);
const description = Yup.string().required();
exports.createCategorySchema = Yup.object().shape({ name, description });
exports.createColorSchema = Yup.object().shape({ title, code });
exports.createBrandSchema = Yup.object().shape({ title });
exports.createUserSchema = Yup.object().shape({
    password: passwordValidator('Password'),
    confirm: passwordValidator('Confirm Password').oneOf([Yup.ref('password')], "Passwords don't match"),
    fullName,
    email,
    phoneNumber: phoneNumberValidator,
    address,
});
exports.updateUserInfoSchema = Yup.object().shape({
    fullName,
    email,
    phoneNumber: phoneNumberValidator,
    address,
});
exports.updateUserPasswordSchema = Yup.object().shape({
    password: passwordValidator('Password'),
    newPass: passwordValidator('New Password'),
    confirm: passwordValidator('Confirm Password').oneOf([Yup.ref('newPass')], 'Confirm Passwords must match'),
});
exports.registerSchema = Yup.object().shape({
    fullName,
    email,
    password: passwordValidator('Password'),
});
exports.loginSchema = Yup.object().shape({
    email,
    password: passwordValidator('Password'),
});
exports.productSchema = Yup.object().shape({ name, price, description, quantity, promotion });
exports.productBasicSchema = Yup.object().shape({ name, description });
