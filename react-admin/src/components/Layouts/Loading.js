"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loading = void 0;
const react_topbar_progress_indicator_1 = __importDefault(require("react-topbar-progress-indicator"));
react_topbar_progress_indicator_1.default.config({
    barColors: {
        '0': '#1d4ed8',
        '0.5': '#1d4ed8',
        '1.0': '#1d4ed8',
    },
    shadowBlur: 5,
});
const Loading = () => <react_topbar_progress_indicator_1.default />;
exports.Loading = Loading;
