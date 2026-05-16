"use client";
import React, { useState } from 'react';
import { useGetCourseAnalyticsQuery } from '@/redux/features/organization/organization.api';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CourseAnalytics = () => {
    const t = useTranslations("OrganizationReports");
    const [page, setPage] = useState(1);
    const { data, isLoading } = useGetCourseAnalyticsQuery({ page, page_size: 10 });
    const analytics = data?.data || [];

    if (isLoading) {
        return (
            <div className="bg-white rounded-lg border border-border-light p-6 space-y-4">
                <Skeleton className="h-6 w-48" />
                <div className="space-y-3">
                    {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg border border-border-light">
            <div className="p-5 border-b border-border-light flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-title">Course Analytics</h3>
                    <p className="text-xs text-description mt-0.5">Detailed performance metrics for all courses</p>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-50/50">
                            <th className="text-left px-6 py-4 font-bold text-description/70 uppercase tracking-wider text-[10px]">Course Title</th>
                            <th className="text-center px-6 py-4 font-bold text-description/70 uppercase tracking-wider text-[10px]">Price</th>
                            <th className="text-center px-6 py-4 font-bold text-description/70 uppercase tracking-wider text-[10px]">Status</th>
                            <th className="text-center px-6 py-4 font-bold text-description/70 uppercase tracking-wider text-[10px]">Enrollments</th>
                            <th className="text-right px-6 py-4 font-bold text-description/70 uppercase tracking-wider text-[10px]">Total Revenue</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border-light">
                        {analytics.length > 0 ? (
                            analytics.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-title">{item.title}</td>
                                    <td className="px-6 py-4 text-center text-description font-bold">${parseFloat(item.price).toFixed(2)}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest ${
                                            item.status === 'accepted' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                                        }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center font-bold text-title">{item.total_enrollments}</td>
                                    <td className="px-6 py-4 text-right font-bold text-main">${parseFloat(item.total_revenue).toFixed(2)}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-6 py-10 text-center text-description">No course analytics available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {data && data.total_pages > 1 && (
                <div className="p-4 border-t border-border-light flex items-center justify-between">
                    <p className="text-xs text-description">
                        Showing page <span className="font-bold text-title">{page}</span> of <span className="font-bold text-title">{data.total_pages}</span>
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="p-2 border border-border-light rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setPage(p => Math.min(data.total_pages, p + 1))}
                            disabled={page === data.total_pages}
                            className="p-2 border border-border-light rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourseAnalytics;