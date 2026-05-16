"use client";
import React from 'react';
import { useGetRatingsBreakdownQuery } from '@/redux/features/organization/organization.api';
import { Skeleton } from '@/components/ui/skeleton';
import { Star } from 'lucide-react';

const RatingsBreakdown = () => {
    const { data, isLoading } = useGetRatingsBreakdownQuery();
    const ratings = data?.data;

    if (isLoading) {
        return (
            <div className="bg-white rounded-lg border border-border-light p-6 space-y-4">
                <Skeleton className="h-6 w-48" />
                <div className="flex gap-8">
                    <Skeleton className="h-24 w-24 rounded-full" />
                    <div className="flex-1 space-y-2">
                        {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-3 w-full" />)}
                    </div>
                </div>
            </div>
        );
    }

    if (!ratings) return null;

    return (
        <div className="bg-white rounded-lg border border-border-light p-6">
            <h3 className="text-lg font-bold text-title mb-8">Ratings Breakdown</h3>

            <div className="flex flex-col md:flex-row gap-8 items-center">
                {/* Average Rating Big Display */}
                <div className="flex flex-col items-center justify-center bg-gray-50/50 rounded-2xl p-8 border border-border-light min-w-[160px]">
                    <span className="text-5xl font-black text-title">{ratings.average_rating.toFixed(1)}</span>
                    <div className="flex gap-1 my-2">
                        {[...Array(5)].map((_, i) => (
                            <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < Math.round(ratings.average_rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} 
                            />
                        ))}
                    </div>
                    <span className="text-xs font-bold text-description/70 uppercase tracking-widest mt-1">
                        {ratings.total_reviews} Reviews
                    </span>
                </div>

                {/* Bars Breakdown */}
                <div className="flex-1 w-full space-y-4">
                    {ratings.breakdown.slice().reverse().map((item) => (
                        <div key={item.stars} className="flex items-center gap-4 group">
                            <div className="flex items-center gap-1 w-12 shrink-0">
                                <span className="text-sm font-bold text-title">{item.stars}</span>
                                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                            </div>
                            
                            <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-main transition-all duration-1000 ease-out rounded-full shadow-[0_0_8px_rgba(var(--main-rgb),0.3)]"
                                    style={{ width: `${item.percentage}%` }}
                                />
                            </div>

                            <div className="w-16 text-right">
                                <span className="text-xs font-bold text-description group-hover:text-title transition-colors">
                                    {item.percentage.toFixed(0)}%
                                </span>
                                <span className="text-[10px] text-description/40 ml-1">({item.count})</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RatingsBreakdown;