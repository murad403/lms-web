// Trainer images
import trainer1 from "@/assets/trainers/alex-suprun-ZHvM3XIOHoE-unsplash.jpg";
import trainer2 from "@/assets/trainers/linkedin-sales-solutions-NpyF7rjqmq4-unsplash.jpg";
import trainer3 from "@/assets/trainers/thisisengineering-TXxiFuQLBKQ-unsplash.jpg";
import trainer4 from "@/assets/trainers/centre-for-ageing-better-cPyO3GEYjZ4-unsplash.jpg";
import trainer5 from "@/assets/trainers/successful-professional-enjoying-work-break.jpg";
import trainer6 from "@/assets/trainers/tra-nguyen-TVSRWmnW8Us-unsplash.jpg";
import { getTranslations } from "next-intl/server";
import TrainersSlider from "./TrainersSlider";

const trainerImages = [trainer1, trainer2, trainer3, trainer4, trainer5, trainer6];

const AboutInstructor = async () => {
    const t = await getTranslations("Certifications");

    const trainers = trainerImages.map((image, index) => {
        const id = index + 1;
        return {
            id,
            image,
            name: t(`trainer${id}Name`),
            role: t(`trainer${id}Role`),
            bio: t(`trainer${id}Bio`),
        };
    });

    return (
        <div className="px-3 sm:px-4 md:px-6 lg:px-0 container mx-auto">
            <div className="text-center mb-10 md:mb-12">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-header mb-3 md:mb-4">
                    {t("trainersTitle")}
                </h2>
                <p className="text-description text-base md:text-lg max-w-3xl mx-auto">
                    {t("trainersDescription")}
                </p>
            </div>

            <TrainersSlider trainers={trainers} />
        </div>
    );
};

export default AboutInstructor;
