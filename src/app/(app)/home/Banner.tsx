import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <div className="relative w-full h-[500px] md:h-[592px] rounded-2xl overflow-hidden">
      {/* Background Image */}
      <Image
        src="/home/banner.jpg"
        alt="Banner"
        fill
        className="object-cover"
        priority
      />

      {/* Gradient Overlay - blue on left, transparent on right */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/95 via-blue-600/70 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-16 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
          Learn, get
          <br />
          Certified,Grow.
        </h1>

        <p className="mt-4 text-base md:text-lg text-white/90">
          Value-driven training from industry experts.
        </p>

        <div className="mt-8">
          <button className="px-6 py-3 border-2 border-white text-white rounded-md text-sm font-medium hover:bg-white hover:text-blue-600 transition-colors cursor-pointer">
            Browse Main Categories
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
