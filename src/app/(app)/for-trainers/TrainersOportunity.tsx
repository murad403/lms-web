import React from 'react'
import { X } from 'lucide-react'

const TrainersOportunity = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Left Side - Who This Opportunity Is For */}
          <div className="bg-gray-50 rounded-lg p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-main mb-4">
              Who This Opportunity Is For
            </h2>
            
            <p className="text-gray-700 mb-4">This platform is ideal for</p>
            
            <ul className="space-y-2 text-gray-700 mb-6">
              <li>• Professional trainers</li>
              <li>• Teachers and educators</li>
              <li>• Freelancers</li>
              <li>• Consultants</li>
              <li>• Industry experts</li>
              <li>• Specialized technicians</li>
              <li>• Anyone with skills to share</li>
            </ul>

            <p className="text-main font-semibold">
              If you can teach something, you can turn it into a course.
            </p>

            {/* Illustration Placeholder */}
            <div className="mt-6 flex justify-center">
              <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-400 text-sm">Opportunity Illustration</p>
              </div>
            </div>
          </div>

          {/* Right Side - What You DON'T Have to Do */}
          <div className="bg-gray-50 rounded-lg p-6 md:p-8">
            
            {/* Illustration Placeholder */}
            <div className="mb-6 flex justify-center">
              <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-400 text-sm">No! Illustration</p>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-main mb-6">
              What You DON&apos;T Have to Do
            </h2>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <X className="text-red-500 w-5 h-5 flex-shrink-0 mt-1" />
                <span className="text-gray-700">You don&apos;t need to create a website</span>
              </div>
              <div className="flex items-start gap-3">
                <X className="text-red-500 w-5 h-5 flex-shrink-0 mt-1" />
                <span className="text-gray-700">You don&apos;t need to manage payments</span>
              </div>
              <div className="flex items-start gap-3">
                <X className="text-red-500 w-5 h-5 flex-shrink-0 mt-1" />
                <span className="text-gray-700">You don&apos;t need to run advertising</span>
              </div>
              <div className="flex items-start gap-3">
                <X className="text-red-500 w-5 h-5 flex-shrink-0 mt-1" />
                <span className="text-gray-700">You don&apos;t need to handle technical aspects</span>
              </div>
            </div>

            <p className="text-main font-semibold mt-6">
              We take care of everything except teaching.
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}

export default TrainersOportunity
