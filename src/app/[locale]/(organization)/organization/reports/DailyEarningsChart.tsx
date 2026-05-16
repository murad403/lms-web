"use client";
import React, { useState, useMemo } from 'react';
import { useGetDailyEarningsQuery } from '@/redux/features/organization/organization.api';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslations } from 'next-intl';
import { Calendar } from 'lucide-react';
import { format, subDays } from 'date-fns';

const DailyEarningsChart = () => {
    const t = useTranslations("OrganizationReports");
    
    // Default to last 30 days
    const [startDate, setStartDate] = useState(format(subDays(new Date(), 30), 'yyyy-MM-dd'));
    const [endDate, setEndDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    
    const { data, isLoading } = useGetDailyEarningsQuery({ start_date: startDate, end_date: endDate });
    const chartData = useMemo(() => {
        const rawData = data?.data || [];
        if (!startDate || !endDate) return [];
        
        const start = new Date(startDate);
        const end = new Date(endDate);
        const days = [];
        
        // Generate every day in the range
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            const dateStr = format(d, 'yyyy-MM-dd');
            const match = rawData.find((item: any) => item.date === dateStr);
            days.push({
                date: dateStr,
                amount: match ? parseFloat(match.amount) : 0
            });
        }
        return days;
    }, [data, startDate, endDate]);

    const maxAmount = useMemo(() => {
        const max = Math.max(...chartData.map(d => d.amount), 0);
        return max > 0 ? max * 1.2 : 1000;
    }, [chartData]);

    const [hoveredBar, setHoveredBar] = useState<number | null>(null);

    if (isLoading) {
        return (
            <div className="bg-white rounded-lg border border-border-light p-6 h-[420px]">
                <div className="flex justify-between mb-8">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-10 w-64" />
                </div>
                <Skeleton className="h-64 w-full" />
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg border border-border-light p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h3 className="text-lg font-bold text-title">Daily Revenue</h3>
                    <p className="text-xs text-description mt-0.5">Revenue breakdown by day</p>
                </div>

                <div className="flex gap-2 items-center">
                    <div className="flex items-center gap-2 px-3 py-1.5 border border-border-light rounded-md bg-gray-50/50">
                        <Calendar className="w-4 h-4 text-description" />
                        <input 
                            type="date" 
                            value={startDate} 
                            onChange={(e) => setStartDate(e.target.value)}
                            className="bg-transparent text-xs font-bold text-title focus:outline-none"
                        />
                        <span className="text-description text-xs">-</span>
                        <input 
                            type="date" 
                            value={endDate} 
                            onChange={(e) => setEndDate(e.target.value)}
                            className="bg-transparent text-xs font-bold text-title focus:outline-none"
                        />
                    </div>
                </div>
            </div>

            <div className="relative h-64 flex items-end gap-[1px] sm:gap-1 border-b border-l border-border-light/50 pl-4 mb-2">
                {chartData.length > 0 ? (
                    chartData.map((item, index) => {
                        const heightPercent = (item.amount / maxAmount) * 100;
                        return (
                            <div 
                                key={item.date}
                                className="flex-1 flex items-end justify-center group h-full"
                                onMouseEnter={() => setHoveredBar(index)}
                                onMouseLeave={() => setHoveredBar(null)}
                            >
                                <div className="relative w-full h-full flex items-end justify-center">
                                    {hoveredBar === index && item.amount > 0 && (
                                        <div className="absolute -top-10 bg-title text-white px-2 py-1 rounded text-[10px] font-bold z-20 whitespace-nowrap shadow-xl animate-in fade-in zoom-in duration-200">
                                            {format(new Date(item.date), 'MMM dd')}: ${item.amount.toFixed(2)}
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-title" />
                                        </div>
                                    )}
                                    <div 
                                        className={`w-full transition-all duration-300 ${item.amount > 0 ? (hoveredBar === index ? 'bg-main shadow-lg shadow-main/20' : 'bg-main') : 'bg-transparent'}`}
                                        style={{ height: `${Math.max(heightPercent, 0)}%`, minWidth: '1px' }}
                                    />
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-description text-xs font-bold uppercase tracking-widest bg-gray-50/50">No data for selected range</div>
                )}
            </div>
            
            <div className="flex justify-between mt-4 px-4">
                 <span className="text-[10px] font-bold text-description/50 uppercase tracking-tighter">{format(new Date(startDate), 'dd MMM yyyy')}</span>
                 <span className="text-[10px] font-bold text-description/50 uppercase tracking-tighter">{format(new Date(endDate), 'dd MMM yyyy')}</span>
            </div>
        </div>
    );
};

export default DailyEarningsChart;
