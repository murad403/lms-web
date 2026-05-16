"use client";
import React from 'react';
import { useGetTopCoursesQuery } from '@/redux/features/organization/organization.api';
import { Skeleton } from '@/components/ui/skeleton';
import { Trophy, TrendingUp, Users } from 'lucide-react';

const TopCourses = () => {
    const { data, isLoading } = useGetTopCoursesQuery();
    const topCourses = data?.data || [];

    if (isLoading) {
        return (
            <div className="bg-white rounded-lg border border-border-light p-6 space-y-4">
                <Skeleton className="h-6 w-32" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-40 w-full rounded-lg" />)}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg border border-border-light p-6">
            <div className="flex items-center gap-2 mb-6">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <h3 className="text-lg font-bold text-title">Top Performing Courses</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topCourses.length > 0 ? (
                    topCourses.map((course, index) => (
                        <div key={course.id} className="relative bg-gray-50/50 border border-border-light rounded-xl p-5 hover:border-main transition-all group">
                            <div className="absolute top-4 right-4 bg-white border border-border-light w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-main shadow-sm">
                                #{index + 1}
                            </div>
                            
                            <h4 className="text-sm font-bold text-title line-clamp-2 pr-8 min-h-[40px] mb-4">
                                {course.title}
                            </h4>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-1.5 text-description font-medium">
                                        <Users className="w-3.5 h-3.5" />
                                        <span>Enrollments</span>
                                    </div>
                                    <span className="font-bold text-title">{course.enrollments}</span>
                                </div>

                                <div className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-1.5 text-description font-medium">
                                        <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                                        <span>Total Revenue</span>
                                    </div>
                                    <span className="font-bold text-main">${parseFloat(course.revenue).toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-border-light flex items-center justify-between">
                                <span className="text-[10px] font-bold text-description uppercase tracking-wider">Unit Price</span>
                                <span className="text-sm font-bold text-title">${parseFloat(course.price).toFixed(2)}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-10 text-center text-description">No top courses found</div>
                )}
            </div>
        </div>
    );
};

export default TopCourses;