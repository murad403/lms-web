"use client";
import { useTranslations } from "next-intl";
import TrainersSlider from "./TrainersSlider";
import { useHomeLandingData } from "./HomeLandingDataProvider";
import { Skeleton } from "@/components/ui/skeleton";

const AboutInstructor = () => {
    const t = useTranslations("Certifications");
    const { homeData, isLoading } = useHomeLandingData();

    const instructors = homeData?.instructors || [];

    return (
        <div className="px-4 md:px-5 lg:px-6 xl:px-0 2xl:px-0 container mx-auto">
            <div className="text-center mb-10 md:mb-12">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-header mb-3 md:mb-4">
                    {t("trainersTitle")}
                </h2>
                <p className="text-description text-base md:text-lg max-w-3xl mx-auto">
                    {t("trainersDescription")}
                </p>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="rounded-md border border-border-light p-4">
                            <Skeleton className="h-60 sm:h-64 w-full rounded-md" />
                            <Skeleton className="mt-4 h-5 w-2/3 mx-auto" />
                            <Skeleton className="mt-2 h-4 w-1/2 mx-auto" />
                            <Skeleton className="mt-3 h-4 w-full" />
                        </div>
                    ))}
                </div>
            ) : (
                <TrainersSlider instructors={instructors} />
            )}
        </div>
    );
};

export default AboutInstructor;
