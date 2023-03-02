"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductWrapper = void 0;
const react_1 = __importDefault(require("react"));
const CardProduct_1 = require("@/components/card/CardProduct");
const cartSlice_1 = require("redux/slice/cartSlice");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const react_redux_1 = require("react-redux");
const ProductWrapper = ({ dataProductFilter }) => {
    var _a;
    const dispatch = (0, react_redux_1.useDispatch)();
    const addCart = (data) => {
        dispatch((0, cartSlice_1.addToCart)(data));
        react_hot_toast_1.default.success('Success');
    };
    return (<div className="grid lg:grid-cols-4 sm:grid-cols-3 gap-6">
            {(_a = dataProductFilter === null || dataProductFilter === void 0 ? void 0 : dataProductFilter.contents) === null || _a === void 0 ? void 0 : _a.map((product) => (<CardProduct_1.CardProduct key={product._id} product={product} onClick={() => addCart(product)}/>))}
        </div>);
};
exports.ProductWrapper = ProductWrapper;
