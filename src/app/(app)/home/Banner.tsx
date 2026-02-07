import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <div className="relative w-full h-87.5 sm:h-112.5 md:h-125 lg:h-148 rounded-lg md:rounded-2xl overflow-hidden">
      {/* Background Image */}
      <Image
        src="/home/banner.jpg"
        alt="Banner"
        fill
        className="object-cover"
        priority
      />

      {/* Gradient Overlay - blue on left, transparent on right */}
      <div className="absolute inset-0 bg-linear-to-r from-blue-600/95 via-blue-600/70 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full px-6 sm:px-8 md:px-12 lg:px-16 max-w-2xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
          Learn, get
          <br />
          Certified,Grow.
        </h1>

        <p className="mt-3 md:mt-4 text-sm sm:text-base md:text-lg text-white/90">
          Value-driven training from industry experts.
        </p>

        <div className="mt-6 md:mt-8">
          <button className="px-5 sm:px-6 py-2.5 sm:py-3 border-2 border-white text-white rounded-md text-xs sm:text-sm font-medium hover:bg-white hover:text-blue-600 transition-colors cursor-pointer">
            Browse Main Categories
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
