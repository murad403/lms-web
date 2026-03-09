"use client";
import Image from "next/image";
import { Star, BookOpen, MessageSquare, Users, Paperclip, Globe, Clock } from "lucide-react";
import RevenueChart from "@/components/reusable/for-dashboard/RevenueChart";
import OverallRating from "@/components/reusable/for-dashboard/OverallRating";
import CourseOverviewChart from "@/components/reusable/for-dashboard/CourseOverviewChart";
import { instructorCourseDetail, revenueData, ratingBreakdown, courseOverviewData } from "@/lib/instructor";
import { Link } from "@/i18n/navigation";
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "@/components/ui/avatar";
import { useTranslations } from "next-intl";


const CourseDetailPage = () => {
    const course = instructorCourseDetail;
    const t = useTranslations("InstructorCourseDetail");

    const infoCards = [
        { icon: BookOpen, value: course.lectureCount.toLocaleString(), labelKey: "lectures", sub: course.lectureSize },
        { icon: MessageSquare, value: course.totalComments.toLocaleString(), labelKey: "totalComments", sub: "" },
        { icon: Users, value: course.studentsEnrolled.toLocaleString(), labelKey: "studentsEnrolled", sub: "" },
        { icon: Paperclip, value: course.attachFiles.toString(), labelKey: "attachFile", sub: course.attachSize },
        { icon: Globe, value: course.language, labelKey: "courseLanguage", sub: "" },
        { icon: Clock, value: course.totalHours, labelKey: "hours", sub: "" },
    ];

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <div className="text-sm text-description">
                <Link href="/instructor/my-courses" className="hover:text-main">
                    {t("courseBreadcrumb")}
                </Link>
                {" > "}
                <Link href="/instructor/my-courses" className="hover:text-main">
                    {t("myCoursesLink")}
                </Link>
                {" > "}
                <span className="text-title font-medium">{course.title}</span>
            </div>

            {/* Course Header */}
            <div className="bg-white p-4 sm:p-5">
                <div className="flex flex-col xl:flex-row gap-5">
                    {/* Course Image */}
                    <div className="relative w-full xl:w-64 xl:h-auto h-52 sm:h-60 overflow-hidden shrink-0">
                        <Image src={course.image} alt={course.title} fill className="object-cover" />
                    </div>

                    {/* Course Info */}
                    <div className="flex-1 min-w-0">
                        <p className="text-xs text-description">
                            {t("published")}: {course.publishedDate} &nbsp; {t("lastUpdated")}: {course.lastUpdated}
                        </p>
                        <h2 className="text-lg sm:text-xl font-bold text-title mt-1">{course.title}</h2>
                        <p className="text-sm text-description mt-1">{course.description}</p>

                        <div className="flex flex-wrap justify-between gap-3 mt-3">
                            <div className="flex gap-2">
                                <div>
                                    <AvatarGroup className="grayscale">
                                        <Avatar>
                                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <Avatar>
                                            <AvatarImage
                                                src="https://github.com/maxleiter.png"
                                                alt="@maxleiter"
                                            />
                                            <AvatarFallback>LR</AvatarFallback>
                                        </Avatar>
                                        <Avatar>
                                            <AvatarImage
                                                src="https://github.com/evilrabbit.png"
                                                alt="@evilrabbit"
                                            />
                                            <AvatarFallback>ER</AvatarFallback>
                                        </Avatar>
                                        <AvatarGroupCount>+3</AvatarGroupCount>
                                    </AvatarGroup>

                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs text-description">{t("createdBy")}</span>
                                    <div className="flex flex-wrap items-center gap-1">
                                        {course.creators.map((creator, i) => (
                                            <span key={i} className="text-sm font-medium text-main">
                                                {creator}{i < course.creators.length - 1 ? " • " : ""}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`size-4 sm:size-5 ${i < Math.floor(course.rating) ? "text-orange-400 fill-orange-400" : "text-gray-300"
                                            }`}
                                    />
                                ))}
                                <span className="text-base font-semibold text-title ml-1">{course.rating}</span>
                                <span className="text-sm text-description ml-1">({course.ratingCount})</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center border-t border-border-light mt-6 gap-4 pt-4">

                            <div className="flex gap-2 flex-col">
                                <span className="text-xl text-title">${course.price}</span>
                                <span className="text-sm text-description">{t("coursePrice")}</span>
                            </div>
                            <div className="flex gap-2 flex-col">
                                <span className="text-xl text-title">${course.totalRevenue.toLocaleString()}</span>
                                <span className="text-sm text-description">{t("usdRevenue")}</span>
                            </div>

                            <button className="sm:ml-auto px-5 py-2.5 bg-main text-white text-sm font-semibold hover:bg-main/90 transition-colors">
                                {t("withdrawMoney")}
                            </button>

                        </div>
                    </div>
                </div>
            </div>

            {/* Revenue + Course Overview */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {infoCards.map((card, index) => {
                        const Icon = card.icon;
                        return (
                            <div key={index} className="bg-white p-4 flex gap-5 items-center justify-center">
                                <div className="bg-[#EBEBFF] p-3">
                                    <Icon className="size-7 text-main" />
                                </div>
                                <div>
                                    <p className="text-xl text-title">{card.value}</p>
                                    <p className="text-sm text-description">{t(card.labelKey)}</p>
                                    {card.sub && <p className="text-[10px] text-description">{card.sub}</p>}
                                </div>
                            </div>
                        );
                    })}
                </div>
                {/* overall rating */}
                <OverallRating rating={course.rating} breakdown={ratingBreakdown} />
                <RevenueChart pathColor="#564FFD" strokeColor="#564FFD" title="Revenue" data={revenueData} />
                <CourseOverviewChart data={courseOverviewData} />
            </div>

        </div>
    );
};

export default CourseDetailPage;
