"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductHome = void 0;
const react_1 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
const cartSlice_1 = require("redux/slice/cartSlice");
const CardProduct_1 = require("@/components/card/CardProduct");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const ProductHome = ({ dataProductsGroupCategory }) => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const addCart = (data) => {
        dispatch((0, cartSlice_1.addToCart)(data));
        react_hot_toast_1.default.success('Success');
    };
    return (<div>
            {dataProductsGroupCategory === null || dataProductsGroupCategory === void 0 ? void 0 : dataProductsGroupCategory.map((data, index) => {
            var _a;
            return (<div className="pb-16 px-6 py-3" key={index}>
                    <h2 className="mb-6 text-base font-medium text-gray-800 uppercase md:text-xl">{data.name}</h2>
                    <div className="grid gap-6 lg:grid-cols-6 sm:grid-cols-3">
                        {(_a = data.products) === null || _a === void 0 ? void 0 : _a.slice(0, 6).map((product) => (<CardProduct_1.CardProduct key={product._id} product={product} onClick={() => addCart(product)}/>))}
                    </div>
                </div>);
        })}
        </div>);
};
exports.ProductHome = ProductHome;
