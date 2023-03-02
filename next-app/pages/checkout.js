"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStaticProps = void 0;
const Layout_1 = require("@/components/common/Layout");
const CheckoutForm_1 = require("@/components/pages/Checkout/CheckoutForm");
const CheckoutSummary_1 = require("@/components/pages/Checkout/CheckoutSummary");
const link_1 = __importDefault(require("next/link"));
const react_redux_1 = require("react-redux");
const Checkout = ({ dataCategories }) => {
    const cart = (0, react_redux_1.useSelector)((state) => state.cart);
    return (<Layout_1.Layout dataCategories={dataCategories}>
            <div className="bg-white px-6 pt-6 pb-3">
                {cart.length === 0 ? (<div className="text-center py-8">
                        <link_1.default href="/" className="bg-primary text-white px-4 py-2.5 text-sm uppercase">
                            Quay Lại Trang Chủ
                        </link_1.default>
                    </div>) : (<div className="lg:grid grid-cols-12 gap-6 items-start pb-16 pt-4">
                        <CheckoutForm_1.CheckoutForm />
                        <CheckoutSummary_1.CheckoutSummary />
                    </div>)}
            </div>
        </Layout_1.Layout>);
};
var getStaticProps_1 = require("lib/getStaticProps");
Object.defineProperty(exports, "getStaticProps", { enumerable: true, get: function () { return getStaticProps_1.getStaticProps; } });
exports.default = Checkout;
