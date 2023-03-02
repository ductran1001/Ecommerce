"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Related = void 0;
const react_1 = __importDefault(require("react"));
const cartSlice_1 = require("redux/slice/cartSlice");
const CardProduct_1 = require("@/components/card/CardProduct");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const react_redux_1 = require("react-redux");
const Related = ({ relatedProducts }) => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const addCart = (data) => {
        dispatch((0, cartSlice_1.addToCart)(data));
        react_hot_toast_1.default.success('Success');
    };
    return (<div className=" pb-16">
            <h2 className="text-base md:text-xl font-medium text-gray-800 uppercase mb-6">sản phẩm tương tự</h2>

            <div className="grid lg:grid-cols-6 sm:grid-cols-3 gap-6">
                {relatedProducts === null || relatedProducts === void 0 ? void 0 : relatedProducts.map((product) => (<CardProduct_1.CardProduct key={product._id} product={product} onClick={() => addCart(product)}/>))}
            </div>
        </div>);
};
exports.Related = Related;
