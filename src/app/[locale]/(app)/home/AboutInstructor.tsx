// Trainer images
import trainer1 from "@/assets/trainers/alex-suprun-ZHvM3XIOHoE-unsplash.jpg";
import trainer2 from "@/assets/trainers/linkedin-sales-solutions-NpyF7rjqmq4-unsplash.jpg";
import trainer3 from "@/assets/trainers/thisisengineering-TXxiFuQLBKQ-unsplash.jpg";
import trainer4 from "@/assets/trainers/centre-for-ageing-better-cPyO3GEYjZ4-unsplash.jpg";
import trainer5 from "@/assets/trainers/successful-professional-enjoying-work-break.jpg";
import trainer6 from "@/assets/trainers/tra-nguyen-TVSRWmnW8Us-unsplash.jpg";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

const trainers = [
    { id: 1, image: trainer1 },
    { id: 2, image: trainer2 },
    { id: 3, image: trainer3 },
    { id: 4, image: trainer4 },
    { id: 5, image: trainer5 },
    { id: 6, image: trainer6 },
];

const AboutInstructor = async () => {
    const t = await getTranslations("Certifications");
    return (
        <div className="px-3 sm:px-4 md:px-6 lg:px-0 container mx-auto py-12 md:py-16" >
            <div className="text-center mb-10 md:mb-12">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-header mb-3 md:mb-4">
                    {t("trainersTitle")}
                </h2>
                <p className="text-description text-base md:text-lg max-w-3xl mx-auto">
                    {t("trainersDescription")}
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {trainers.map((trainer) => (
                    <div key={trainer.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <div className="relative h-64 sm:h-72 w-full">
                            <Image
                                src={trainer.image}
                                alt={t(`trainer${trainer.id}Name`)}
                                fill
                                className="object-cover object-top"
                            />
                        </div>
                        <div className="p-5 md:p-6 text-center">
                            <h3 className="text-lg md:text-xl font-bold text-header mb-1">
                                {t(`trainer${trainer.id}Name`)}
                            </h3>
                            <p className="text-main font-medium text-sm md:text-base mb-3">
                                {t(`trainer${trainer.id}Role`)}
                            </p>
                            <p className="text-description text-sm md:text-base leading-relaxed">
                                {t(`trainer${trainer.id}Bio`)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
}

export default AboutInstructor
