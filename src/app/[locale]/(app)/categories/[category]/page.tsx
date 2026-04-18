"use client"
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import banner from "@/assets/banner/categories.png";
import Pagination from '@/components/reusable/Pagination';
import { TCourse } from '@/lib/courses';
import CourseCard from '@/components/card/CourseCard';
import { useTranslations } from "next-intl";
import { useCategoriesQuery, useCoursesQuery } from '@/redux/features/landing/landing.api';

const COURSES_PER_PAGE = 12;


const Category = () => {
    const t = useTranslations("Categories");
    const params = useParams<{ category: string }>();
    const slug = decodeURIComponent(params.category as string);
    const [currentPage, setCurrentPage] = useState(1);

    const { data: categoriesData, isFetching: isCategoriesLoading } = useCategoriesQuery();
    const category = (categoriesData?.data || []).find(
        (item) => item.slug.toLowerCase() === slug.toLowerCase()
    );

    const { data: coursesData, isFetching: isCoursesLoading } = useCoursesQuery(
        {
            page: currentPage,
            page_size: COURSES_PER_PAGE,
            category: category?.name,
        },
        {
            skip: !category,
        }
    );

    const courseItems: TCourse[] = (coursesData?.data || []).map((course) => ({
        id: course.id,
        title: course.title,
        category: course.Category,
        rating: Number(course.rating || 0),
        reviews: `${course.reviews_count || 0} Reviews`,
        price: Number.parseFloat(course.price || '0'),
        image: course.advance_info?.thumbnail || '',
        is_wishlisted: Boolean(course.is_wishlisted),
    }));
    
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Scroll to top when page changes
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
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
                <div className="relative z-10 container mx-auto flex flex-col justify-center h-full px-4 md:px-5 lg:px-6 xl:px-0 2xl:px-0">
                    <h1 className="text-4xl lg:text-5xl font-bold text-main leading-tight ">
                        {category?.name || slug}
                    </h1>

                    <p className="mt-3 md:mt-4 text-lg sm:text-xl md:text-2xl text-header">
                        {category?.description || t("description")}
                    </p>
                </div>
            </div>

            <div className='container mx-auto px-4 md:px-5 lg:px-6 xl:px-0 2xl:px-0'>
                <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-title mb-6'>{category?.name || 'Category'}</h1>

                {(isCategoriesLoading || isCoursesLoading) && (
                    <p className='text-sm text-description mb-4'>Loading...</p>
                )}

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
                    {
                        courseItems.map((course: TCourse) =>
                            <CourseCard key={course.id} course={course} />
                        )
                    }
                </div>

                {!isCategoriesLoading && !isCoursesLoading && courseItems.length === 0 && (
                    <p className='text-sm text-description mt-6'>No courses found for this category.</p>
                )}

                <Pagination
                    currentPage={currentPage}
                    totalPages={coursesData?.total_pages || 1}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    )
}

export default Category
