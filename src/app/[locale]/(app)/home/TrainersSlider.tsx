"use client";
import Image from "next/image";
import { resolveImageUrl } from "@/utils/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import "swiper/css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import "swiper/css/pagination";

const INSTRUCTOR_FALLBACK_IMAGE = "/courses/Course Images.png";

type TInstructor = {
    Instructor_name: string;
    avatar: string | null;
    biography: string | null;
    id: string;
    title: string | null;
};
type TInstructors = {
    instructors: TInstructor[];
};


const TrainersSlider = ({ instructors }: TInstructors) => {
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
            {instructors.map((instructor) => (
                <SwiperSlide key={instructor.id}>
                    <div className="bg-white rounded-md border border-border-light overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
                        <div className="relative h-60 sm:h-64 w-full">
                            <Image
                                src={resolveImageUrl(instructor.avatar) || INSTRUCTOR_FALLBACK_IMAGE}
                                alt={instructor.Instructor_name}
                                fill
                                className="object-cover object-top"
                            />
                        </div>
                        <div className="p-4 md:p-5 text-center">
                            <h3 className="text-base md:text-lg font-bold text-header mb-1">
                                {instructor.Instructor_name}
                            </h3>
                            <p className="text-main font-medium text-sm mb-2">
                                {instructor.title}
                            </p>
                            <p className="text-description text-sm leading-relaxed">
                                {instructor.biography}
                            </p>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default TrainersSlider;
