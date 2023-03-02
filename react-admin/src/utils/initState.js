"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialStateOrderForm = exports.initialStateRegisterForm = exports.initialStateLoginForm = exports.initialStateUpdateUserForm = exports.initialStateCreateUserForm = exports.initialStateProductForm = exports.initialStateBrandForm = exports.initialStateColorForm = exports.initialStateCategoryForm = void 0;
exports.initialStateCategoryForm = {
    name: '',
    description: '',
    active: true,
    image: '',
};
exports.initialStateColorForm = {
    title: '',
    code: '',
};
exports.initialStateBrandForm = {
    title: '',
};
exports.initialStateProductForm = {
    name: '',
    description: '',
    user: '',
    category: '',
    color: [],
    brand: '',
    imageURL: [],
    promotion: 0,
    price: 1,
    quantity: 1,
    active: true,
};
exports.initialStateCreateUserForm = {
    fullName: '',
    address: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirm: '',
};
exports.initialStateUpdateUserForm = {
    fullName: '',
    avatar: '',
    address: '',
    phoneNumber: '',
    email: '',
    password: '',
    newPass: '',
    confirm: '',
};
exports.initialStateLoginForm = {
    email: 'administrator@admin.com',
    password: 'password',
};
exports.initialStateRegisterForm = {
    fullName: '',
    email: '',
    password: '',
};
exports.initialStateOrderForm = {
    firstName: '',
    name: '',
    city: '',
    address: '',
    phoneNumber: '',
    email: '',
    status: '',
    orderDetails: [],
    createdAt: '',
    updatedAt: '',
};
