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
        <div className="space-y-10">
          {/* Left Side - Who This Opportunity Is For */}
          <div className=" rounded-md p-5 md:p-6 flex flex-col md:flex-row justify-between items-center">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-main mb-4">
                {t("opportunityTitle")}
              </h2>

              <p className="text-description mb-4 text-xl">This platform is ideal for</p>

              <ul className="space-y-1 text-description mb-6 text-[17px]">
                <li>• Professional trainers</li>
                <li>• Teachers and educators</li>
                <li>• Freelancers</li>
                <li>• Consultants</li>
                <li>• Industry experts</li>
                <li>• Specialized technicians</li>
                <li>• Anyone with skills to share</li>
              </ul>

              <p className="text-main text-xl font-semibold">
                If you can teach something, you can turn it into a course.
              </p>
            </div>

            {/* Illustration Placeholder */}
            <Image src={image1} alt="Opportunity Illustration" width={463} height={370} />
          </div>



          {/* Right Side - What You DON'T Have to Do */}
          <div className="p-5 md:p-6 flex flex-col-reverse md:flex-row justify-between items-center">


            <Image src={image2} alt="Opportunity Illustration" width={463} height={370} />

            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-main mb-6">
                What You DON&apos;T Have to Do
              </h2>

              <div className="space-y-3 text-[17px]">
                <div className="flex items-start gap-3">
                  <X className="text-red-500 w-5 h-5 shrink-0 mt-1" />
                  <span className="text-description">You don&apos;t need to create a website</span>
                </div>
                <div className="flex items-start gap-3">
                  <X className="text-red-500 w-5 h-5 shrink-0 mt-1" />
                  <span className="text-description">You don&apos;t need to manage payments</span>
                </div>
                <div className="flex items-start gap-3">
                  <X className="text-red-500 w-5 h-5 shrink-0 mt-1" />
                  <span className="text-description">You don&apos;t need to run advertising</span>
                </div>
                <div className="flex items-start gap-3">
                  <X className="text-red-500 w-5 h-5 shrink-0 mt-1" />
                  <span className="text-description">You don&apos;t need to handle technical aspects</span>
                </div>
              </div>

              <p className="text-main text-xl font-semibold mt-6">
                We take care of everything except teaching.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default TrainersOpportunity
