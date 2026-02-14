"use client";
import WishlistCard from "@/components/reusable/WishlistCard";
import { wishlistCourses } from "@/lib/profile";
import { useTranslations } from "next-intl";

const WishlistPage = () => {
    const t = useTranslations("WishlistPage");
    return (
        <div>
            <h2 className="text-lg sm:text-xl font-bold text-title mb-6">{t("title")}</h2>

            <div className="bg-white rounded-md border border-border-light overflow-hidden">
                {/* Table Header */}
                <div className="hidden sm:grid grid-cols-[1fr_auto_auto] gap-4 px-4 sm:px-6 py-3 border-b border-gray-200 bg-gray-50">
                    <span className="text-sm text-main font-medium uppercase">{t("course")}</span>
                    <span className="text-sm text-main font-medium uppercase w-24 text-center">
                        {t("prices")}
                    </span>
                    <span className="text-sm text-main font-medium uppercase w-56 text-center">
                        {t("action")}
                    </span>
                </div>

                {/* Items */}
                <div className="px-4 sm:px-6">
                    {wishlistCourses.map((course) => (
                        <WishlistCard key={course.id} course={course} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WishlistPage;
