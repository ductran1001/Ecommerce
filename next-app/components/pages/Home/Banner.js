"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Banner = void 0;
const react_1 = __importDefault(require("react"));
// Import Swiper React components
const react_2 = require("swiper/react");
const swiper_1 = require("swiper");
// Import Swiper styles
require("swiper/css");
require("swiper/css/pagination");
require("swiper/css/navigation");
const Banner = ({ dataSliders }) => {
    return (<div className="flex justify-center gap-4 bg-white border-b md:px-6 md:py-3 p-0">
            <div className="md:w-2/3 w-full">
                <react_2.Swiper spaceBetween={30} centeredSlides={true} autoplay={{ delay: 2500, disableOnInteraction: false }} pagination={{ clickable: true }} modules={[swiper_1.Autoplay, swiper_1.Pagination, swiper_1.Navigation]}>
                    {dataSliders === null || dataSliders === void 0 ? void 0 : dataSliders.map((slider, index) => (<react_2.SwiperSlide key={index}>
                            <img className="h-full" alt="banner" src={slider.photo}/>
                        </react_2.SwiperSlide>))}
                </react_2.Swiper>
            </div>
            <div className="w-1/3 md:flex hidden flex-col gap-2">
                <div>
                    <img src="https://cdn.didongviet.vn/pub/media/mageplaza/bannerslider/banner/image/z/-/z--di-dongviet.jpg" alt=""/>
                </div>
                <div>
                    <img src="https://cdn.didongviet.vn/pub/media/mageplaza/bannerslider/banner/image/4/8/480x248_56.jpg" alt=""/>
                </div>
            </div>
        </div>);
};
exports.Banner = Banner;
