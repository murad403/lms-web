import image3 from "@/assets/for-trainers/image3.png";
import { Check } from 'lucide-react'
import Image from 'next/image'

const TrainersOngoingSupport = () => {
  return (
    <section>
      <div className="container mx-auto max-w-7xl">
        
        {/* Ongoing Support Section */}
        <div className=" rounded-lg mb-8 md:mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border border-gray-100 rounded-md p-4 md:p-10">
            
            {/* Left Content */}
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-main mb-6">
                Ongoing Support
              </h2>
              <p className="text-description mb-2">You are never alone.</p>
              <p className="text-description mb-6">Our team supports you at every stage:</p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Check className="text-green-500 w-5 h-5 shrink-0" />
                  <span className="text-description">24/7 instructor support portal</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="text-green-500 w-5 h-5 shrink-0" />
                  <span className="text-description">Course creation</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="text-green-500 w-5 h-5 shrink-0" />
                  <span className="text-description">Certification</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="text-green-500 w-5 h-5 shrink-0" />
                  <span className="text-description">Publication</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="text-green-500 w-5 h-5 shrink-0" />
                  <span className="text-description">Content improvement</span>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <Image src={image3} alt="Ongoing Support Illustration" width={463} height={370} />

          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-linear-to-t to-main from-[#1E40AF] rounded-md py-10 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Become an Instructor
          </h2>
          <p className="text-white text-lg mb-6">
            Create, publish, and sell online.
          </p>
          <button className="bg-white text-main px-8 py-3 rounded-md font-semibold text-lg hover:bg-gray-100 transition-colors">
            Start Teaching
          </button>
        </div>

      </div>
    </section>
  )
}

export default TrainersOngoingSupport
