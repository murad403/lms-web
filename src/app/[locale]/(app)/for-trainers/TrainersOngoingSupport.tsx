import image3 from "@/assets/for-trainers/image3.png";
import { getTranslations } from "next-intl/server";
import { Check } from 'lucide-react'
import Image from 'next/image'

const TrainersOngoingSupport = async () => {
  const t = await getTranslations("ForTrainers");
  return (

    <div className="container mx-auto max-w-7xl">

      {/* Ongoing Support Section */}
      <div className="border border-gray-100 rounded-md p-5 md:p-12 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

          {/* Left Content */}
          <div>
            <h2 className="text-2xl md:text-2xl lg:text-4xl font-bold text-navy-blue mb-6">
              {t("ongoingSupportTitle")}
            </h2>
            <p className="text-description text-base leading-relaxed mb-2">{t("ongoingSupportDesc")}</p>
            <p className="text-description text-base leading-relaxed mb-6">{t("ongoingSupportTeamIntro")}</p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Check className="text-green-500 w-5 h-5 shrink-0" />
                <span className="text-description text-base">{t("support247")}</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="text-green-500 w-5 h-5 shrink-0" />
                <span className="text-description text-base">{t("supportCourseCreation")}</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="text-green-500 w-5 h-5 shrink-0" />
                <span className="text-description text-base">{t("supportCertification")}</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="text-green-500 w-5 h-5 shrink-0" />
                <span className="text-description text-base">{t("supportPublication")}</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="text-green-500 w-5 h-5 shrink-0" />
                <span className="text-description text-base">{t("supportContentImprovement")}</span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <Image src={image3} alt="Ongoing Support Illustration" width={463} height={370} />

        </div>
      </div>
    </div>
  )
}

export default TrainersOngoingSupport
