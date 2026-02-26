import banner from "@/assets/banner/categories.png";
import { categories, TCategory } from "@/lib/categories";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

const page = async () => {
    const t = await getTranslations("Categories");
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
                {
                    categories.map((category: TCategory) =>
                        <Link className="mb-5 block" key={category.id} href={`/categories/${category.slug}`}>
                            <h3 className={`text-sm sm:text-base md:text-lg font-bold text-white rounded-t-lg p-5 ${category.headingColor}`}>{t(`cat${category.id}Title`)}</h3>
                            <p className={`p-5 rounded-b-lg text-xs sm:text-sm md:text-base ${category.descriptionColor}`}>{t(`cat${category.id}Desc`)}</p>
                        </Link>
                    )
                }
            </div>
        </div>
    )
}

export default page
