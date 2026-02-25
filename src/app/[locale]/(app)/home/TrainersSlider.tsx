"use client";

import Image, { StaticImageData } from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import "swiper/css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import "swiper/css/pagination";

type Trainer = {
    id: number;
    image: StaticImageData;
    name: string;
    role: string;
    bio: string;
};

type Props = {
    trainers: Trainer[];
};

const TrainersSlider = ({ trainers }: Props) => {
    return (
        <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{ clickable: true }}
            loop={true}
            spaceBetween={24}
            breakpoints={{
                0: { slidesPerView: 1 },
                540: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
            }}
            className="pb-12!"
        >
            {trainers.map((trainer) => (
                <SwiperSlide key={trainer.id}>
                    <div className="bg-white rounded-md border border-border-light overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
                        <div className="relative h-60 sm:h-64 w-full">
                            <Image
                                src={trainer.image}
                                alt={trainer.name}
                                fill
                                className="object-cover object-top"
                            />
                        </div>
                        <div className="p-4 md:p-5 text-center">
                            <h3 className="text-base md:text-lg font-bold text-header mb-1">
                                {trainer.name}
                            </h3>
                            <p className="text-main font-medium text-sm mb-2">
                                {trainer.role}
                            </p>
                            <p className="text-description text-sm leading-relaxed">
                                {trainer.bio}
                            </p>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default TrainersSlider;
