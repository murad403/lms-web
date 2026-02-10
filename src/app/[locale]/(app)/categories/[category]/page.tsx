"use client"
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import banner from "@/assets/banner/categories.png";
import Pagination from '@/components/reusable/Pagination';
import { TCourse, trendingCourses } from '@/lib/courses';
import CourseCard from '@/components/card/CourseCard';
import { useTranslations } from "next-intl";


const Category = () => {
    const t = useTranslations("Categories");
    const params = useParams();
    const value = decodeURIComponent(params.category as string);
    const [currentPage, setCurrentPage] = useState(1);
    
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Scroll to top when page changes
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    console.log(value)
    return (
        <div>
            {/* banner */}
            <div className="relative w-full h-60 sm:h-80 md:h-96 lg:h-100 overflow-hidden">
                {/* Background Image */}
                <Image
                    src={banner}
                    alt="Banner"
                    fill
                    className="object-center"
                    priority
                />

                {/* Content */}
                <div className="relative z-10 container mx-auto flex flex-col justify-center h-full px-3 sm:px-4 md:px-6 lg:px-0">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-main leading-tight ">
                        {value}
                    </h1>

                    <p className="mt-3 md:mt-4 text-lg sm:text-xl md:text-2xl text-header">
                        {t("description")}
                    </p>
                </div>
            </div>

            <div className='container mx-auto px-3 sm:px-4 md:px-6 lg:px-0'>
                <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-title mb-6'>Category</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                    {
                        trendingCourses.slice(0, 12).map((course: TCourse) => 
                            <CourseCard key={course.id} course={course} />
                        )
                    }
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={10}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    )
}

export default Category
