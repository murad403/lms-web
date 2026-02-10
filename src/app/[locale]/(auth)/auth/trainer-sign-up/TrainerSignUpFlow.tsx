import React from 'react';
import { PiUsersThree } from 'react-icons/pi';
import { Check } from 'lucide-react';

const features = [
  {
    title: 'EU-Recognized Certifications',
    description: 'All credentials meet European standards',
  },
  {
    title: 'Professional Support',
    description: 'Dedicated assistance every step of the way',
  },
  {
    title: 'Secure & Trusted',
    description: 'Your data is protected and confidential',
  },
];

const TrainerSignUpFlow = () => {
  return (
    <div className="w-full lg:w-1/2 bg-main flex flex-col items-center justify-center px-8 sm:px-12 lg:px-16 py-12 text-white">
      <div className="max-w-md">
        <PiUsersThree className="size-16 mb-6" />

        <h2 className="text-3xl font-bold mb-4">Share Your Expertise</h2>
        <p className="text-white/70 mb-8 leading-relaxed">
          Create courses, reach thousands of learners, and earn income from your
          professional knowledge.
        </p>

        <div className="space-y-5">
          {features.map((feature) => (
            <div key={feature.title} className="flex items-start gap-3">
              <div className="size-6 rounded-full bg-slate-500 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="size-4 text-white" strokeWidth={3} />
              </div>
              <div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-white/60">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainerSignUpFlow;
