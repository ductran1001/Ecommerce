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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Dashboard"), exports);
__exportStar(require("./Login"), exports);
__exportStar(require("./Register"), exports);
__exportStar(require("./Users/ListUser"), exports);
__exportStar(require("./Users/CreateUser"), exports);
__exportStar(require("./Users/UpdateUser"), exports);
__exportStar(require("./Users/UpdatePassword"), exports);
__exportStar(require("./Categories/ListCategory"), exports);
__exportStar(require("./Categories/CreateCategory"), exports);
__exportStar(require("./Categories/UpdateCategory"), exports);
__exportStar(require("./Colors/ListColor"), exports);
__exportStar(require("./Colors/CreateColor"), exports);
__exportStar(require("./Colors/UpdateColor"), exports);
__exportStar(require("./Brands/ListBrand"), exports);
__exportStar(require("./Brands/CreateBrand"), exports);
__exportStar(require("./Brands/UpdateBrand"), exports);
__exportStar(require("./Products/ListProduct"), exports);
__exportStar(require("./Products/CreateProduct"), exports);
__exportStar(require("./Products/UpdateProduct"), exports);
__exportStar(require("./Sliders/ListSlider"), exports);
__exportStar(require("./Sliders/CreateSlider"), exports);
__exportStar(require("./Sliders/UpdateSlider"), exports);
__exportStar(require("./Orders/ListOrder"), exports);
__exportStar(require("./Orders/CreateOrder"), exports);
__exportStar(require("./Orders/UpdateOrder"), exports);
__exportStar(require("./NotFound"), exports);
