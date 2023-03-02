"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatPrice = void 0;
const numeral_1 = __importDefault(require("numeral"));
const react_1 = __importDefault(require("react"));
const FormatPrice = ({ promotion, price, text = 'text-xs' }) => {
    const getPricePromotion = Math.round(price - (price / 100) * promotion);
    return (<div className="flex items-baseline mb-1 space-x-2">
            {promotion > 0 ? (<>
                    <span className={`${text} font-semibold font-roboto`}>
                        {promotion > 0 ? (0, numeral_1.default)(getPricePromotion).format('0,0') : null}
                    </span>
                    <span className="text-sm text-gray-400 line-through font-roboto">
                        {(0, numeral_1.default)(price).format('0,0')}
                    </span>
                </>) : (<span className={`${text} font-semibold font-roboto`}>{(0, numeral_1.default)(price).format('0,0')}</span>)}
        </div>);
};
exports.FormatPrice = FormatPrice;
