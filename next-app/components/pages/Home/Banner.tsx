/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { ISlider } from '@/types';
import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

type IProps = {
    dataSliders: ISlider[];
};

export const Banner: React.FC<IProps> = ({ dataSliders }) => {
    return (
        <div className="flex justify-center gap-4 bg-white border-b md:px-6 md:py-3 p-0">
            <div className="md:w-2/3 w-full">
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    modules={[Autoplay, Pagination, Navigation]}
                >
                    {dataSliders?.map((slider, index) => (
                        <SwiperSlide key={index}>
                            <img className="h-full" alt="banner" src={slider.photo} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="w-1/3 md:flex hidden flex-col gap-2">
                <div>
                    <img
                        src="https://cdn.didongviet.vn/pub/media/mageplaza/bannerslider/banner/image/z/-/z--di-dongviet.jpg"
                        alt=""
                    />
                </div>
                <div>
                    <img
                        src="https://cdn.didongviet.vn/pub/media/mageplaza/bannerslider/banner/image/4/8/480x248_56.jpg"
                        alt=""
                    />
                </div>
            </div>
        </div>
    );
};
