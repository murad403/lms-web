"use client";
import WishlistCard from "@/components/reusable/WishlistCard";
import { wishlistCourses } from "@/lib/profile";

const WishlistPage = () => {
  return (
    <div>
      <h2 className="text-lg sm:text-xl font-bold text-title mb-6">Wishlist</h2>

      <div className="bg-white rounded-xl border border-border-light overflow-hidden">
        {/* Table Header */}
        <div className="hidden sm:grid grid-cols-[1fr_auto_auto] gap-4 px-4 sm:px-6 py-3 border-b border-gray-200 bg-gray-50">
          <span className="text-xs font-semibold text-title uppercase">Course</span>
          <span className="text-xs font-semibold text-title uppercase w-24 text-center">
            Prices
          </span>
          <span className="text-xs font-semibold text-title uppercase w-56 text-center">
            Action
          </span>
        </div>

        {/* Items */}
        <div className="px-4 sm:px-6">
          {wishlistCourses.map((course) => (
            <WishlistCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
