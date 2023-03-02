"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @next/next/no-img-element */
const Layout_1 = require("@/components/common/Layout");
const link_1 = __importDefault(require("next/link"));
function OrderCompletePage() {
    return (<Layout_1.Layout>
            <div className="max-w-3xl mx-auto px-4 pt-16 pb-24 text-center">
                <div className="mb-8">
                    <img alt="" src="/images/complete.png" className="w-16 inline-block"/>
                </div>
                <h2 className="text-gray-800 font-medium text-3xl mb-3">YOUR ORDER IS COMPLETED!</h2>
                <p className="text-gray-600 ">
                    Thank you for your order! Your order is being processed and will be completed within 3-6 hours. You
                    will receive an email confirmation when your order is completed.
                </p>
                <div className="mt-10">
                    <link_1.default href="/" className="bg-primary text-white px-6 py-3 font-medium rounded-md uppercase hover:opacity-75 text-center">
                        Continue shopping
                    </link_1.default>
                </div>
            </div>
        </Layout_1.Layout>);
}
exports.default = OrderCompletePage;
