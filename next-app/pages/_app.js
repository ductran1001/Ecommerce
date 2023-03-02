"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("@/styles/globals.css");
require("numeral/locales/vi");
const store_1 = __importDefault(require("@/redux/store"));
const react_redux_1 = require("react-redux");
const react_hot_toast_1 = require("react-hot-toast");
function App({ Component, pageProps }) {
    return (<react_redux_1.Provider store={store_1.default}>
            <react_hot_toast_1.Toaster />
            <Component {...pageProps}/>
        </react_redux_1.Provider>);
}
exports.default = App;
