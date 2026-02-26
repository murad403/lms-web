import image1 from "@/assets/for-trainers/image2.png"
import image2 from "@/assets/for-trainers/image1.png"
import { X } from 'lucide-react'
import { getTranslations } from "next-intl/server";
import Image from "next/image"

const TrainersOpportunity = async () => {
  const t = await getTranslations("ForTrainers");
  return (
    <section>
      <div className="container mx-auto max-w-7xl">
        <div className="space-y-8">
          {/* Who This Opportunity Is For */}
          <div className="border border-gray-100 rounded-md p-5 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <h2 className="text-2xl md:text-2xl lg:text-4xl font-bold text-navy-blue mb-4">
                {t("opportunityTitle")}
              </h2>

              <p className="text-description text-lg leading-relaxed mb-4">{t("opportunityIdealFor")}</p>

              <ul className="space-y-1 text-description text-base mb-6">
                <li>• {t("opportunityTrainers")}</li>
                <li>• {t("opportunityTeachers")}</li>
                <li>• {t("opportunityFreelancers")}</li>
                <li>• {t("opportunityConsultants")}</li>
                <li>• {t("opportunityExperts")}</li>
                <li>• {t("opportunityTechnicians")}</li>
                <li>• {t("opportunityAnyone")}</li>
              </ul>

              <p className="text-navy-blue text-base sm:text-lg md:text-xl font-semibold">
                {t("opportunityTagline")}
              </p>
            </div>

            {/* Illustration */}
            <Image src={image1} alt="Opportunity Illustration" width={463} height={370} className="shrink-0" />
          </div>

          {/* What You DON'T Have to Do */}
          <div className="border border-gray-100 rounded-md p-5 md:p-12 flex flex-col-reverse md:flex-row justify-between items-center gap-8">
            <Image src={image2} alt="Opportunity Illustration" width={463} height={370} className="shrink-0" />

            <div>
              <h2 className="text-2xl md:text-2xl lg:text-4xl font-bold text-navy-blue mb-6">
                {t("whatYouDontDoTitle")}
              </h2>

              <div className="space-y-3 text-base">
                <div className="flex items-start gap-3">
                  <X className="text-red-500 w-5 h-5 shrink-0 mt-1" />
                  <span className="text-description">{t("dontNeedWebsite")}</span>
                </div>
                <div className="flex items-start gap-3">
                  <X className="text-red-500 w-5 h-5 shrink-0 mt-1" />
                  <span className="text-description">{t("dontNeedPayments")}</span>
                </div>
                <div className="flex items-start gap-3">
                  <X className="text-red-500 w-5 h-5 shrink-0 mt-1" />
                  <span className="text-description">{t("dontNeedAds")}</span>
                </div>
                <div className="flex items-start gap-3">
                  <X className="text-red-500 w-5 h-5 shrink-0 mt-1" />
                  <span className="text-description">{t("dontNeedTech")}</span>
                </div>
              </div>

              <p className="text-navy-blue text-base sm:text-lg md:text-xl font-semibold mt-6">
                {t("dontNeedTagline")}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default TrainersOpportunity
