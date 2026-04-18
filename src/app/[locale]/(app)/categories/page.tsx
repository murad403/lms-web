"use client";
import banner from "@/assets/banner/categories.png";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useCategoriesQuery } from "@/redux/features/landing/landing.api";


const CATEGORY_STYLES = [
    { headingColor: "bg-[#687663]", descriptionColor: "bg-[#F8FFF2]" },
    { headingColor: "bg-[#F2A421]", descriptionColor: "bg-[#FFE8D9]" },
    { headingColor: "bg-[#DB3931]", descriptionColor: "bg-[#FFE5EE]" },
    { headingColor: "bg-[#4758BD]", descriptionColor: "bg-[#F0E4FF]" },
    { headingColor: "bg-[#8569BE]", descriptionColor: "bg-[#F0E4FF]" },
    { headingColor: "bg-[#D68225]", descriptionColor: "bg-[#FFE8D9]" },
    { headingColor: "bg-[#81836C]", descriptionColor: "bg-[#F8FFF2]" },
    { headingColor: "bg-[#4758BD]", descriptionColor: "bg-[#F0E4FF]" },
];

const getAreaOrder = (name: string) => {
    const match = name.trim().match(/area\s*(\d+)/i);
    if (!match) {
        return Number.MAX_SAFE_INTEGER;
    }

    return Number(match[1]);
};

const Page = () => {
    const t = useTranslations("Categories");
    const searchParams = useSearchParams();
    const { data: categoriesData, isFetching } = useCategoriesQuery();

    const categoryFilter = (searchParams.get("category") || "").trim().toLowerCase();
    const categories = (categoriesData?.data || [])
        .filter((category) => {
            if (!categoryFilter) {
                return true;
            }

            return (
                category.name.trim().toLowerCase() === categoryFilter ||
                category.slug.trim().toLowerCase() === categoryFilter
            );
        })
        .slice()
        .sort((a, b) => {
            const areaOrderA = getAreaOrder(a.name);
            const areaOrderB = getAreaOrder(b.name);

            if (areaOrderA !== areaOrderB) {
                return areaOrderA - areaOrderB;
            }

            return a.name.localeCompare(b.name);
        });

    return (
        <div>
            {/* banner */}
            <div className="relative w-full h-60 sm:h-80 md:h-96 lg:h-100 overflow-hidden">
                {/* Background Image */}
                <Image
                    src={banner}
                    alt="Banner"
                    fill
                    className="object-center"
                    priority
                />

                {/* Content */}
                <div className="relative z-10 container mx-auto flex flex-col justify-center h-full px-4 md:px-5 lg:px-6 xl:px-0 2xl:px-0">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-main leading-tight ">
                        {t("title")}
                    </h1>

                    <p className="mt-3 md:mt-4 text-lg sm:text-xl md:text-2xl text-header">
                        {t("description")}
                    </p>
                </div>
            </div>


            {/* categories */}
            <div className="container mx-auto px-4 md:px-5 lg:px-6 xl:px-0 2xl:px-0">
                {isFetching && categories.length === 0 && (
                    <div className="space-y-5 mb-5">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <div key={index} className="animate-pulse">
                                <div className="h-14 rounded-t-lg bg-gray-200" />
                                <div className="h-18 rounded-b-lg bg-gray-100" />
                            </div>
                        ))}
                    </div>
                )}

                {categories.map((category, index) => {
                    const style = CATEGORY_STYLES[index % CATEGORY_STYLES.length];

                    return (
                        <Link className="mb-5 block" key={category.id} href={`/categories/${encodeURIComponent(category.slug)}`}>
                            <h3 className={`text-sm sm:text-base md:text-lg font-bold text-white rounded-t-lg p-5 ${style.headingColor}`}>{category.name}</h3>
                            <p className={`p-5 rounded-b-lg text-xs sm:text-sm md:text-base ${style.descriptionColor}`}>{category.description}</p>
                        </Link>
                    );
                })}

                {!isFetching && categories.length === 0 && (
                    <p className="mb-5 text-sm text-description">No categories found.</p>
                )}
            </div>
        </div>
    )
}

export default Page
