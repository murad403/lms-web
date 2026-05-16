"use client";
import Image from 'next/image'
import { BookOpen } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useGetRecentActivityQuery } from '@/redux/features/organization/organization.api';
import { Skeleton } from '@/components/ui/skeleton';
import { resolveImageUrl } from '@/utils/image';
import { format } from 'date-fns';

const RecentCreatedCourses = () => {
  const t = useTranslations("OrganizationReports");
  const { data, isLoading } = useGetRecentActivityQuery();
  const recentCourses = data?.data?.recent_courses?.data || [];

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-border-light p-6 space-y-4">
        <Skeleton className="h-6 w-48" />
        <div className="space-y-3">
            {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-border-light">
      <div className="p-5 border-b border-border-light">
        <h3 className="text-lg font-bold text-title">{t("recentlyCreatedCourses")}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="text-left px-6 py-4 font-bold text-description/70 uppercase tracking-wider text-[10px]">{t("courses")}</th>
              <th className="text-left px-6 py-4 font-bold text-description/70 uppercase tracking-wider text-[10px]">{t("enrolled")}</th>
              <th className="text-left px-6 py-4 font-bold text-description/70 uppercase tracking-wider text-[10px]">{t("status")}</th>
              <th className="text-right px-6 py-4 font-bold text-description/70 uppercase tracking-wider text-[10px]">Created At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light">
            {recentCourses.length > 0 ? (
                recentCourses.map((course) => (
                    <tr key={course.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                                <div className="relative w-16 h-10 rounded-md overflow-hidden bg-gray-100 shrink-0 border border-border-light flex items-center justify-center">
                                    {resolveImageUrl(null) ? (
                                        <Image 
                                            src={resolveImageUrl(null)} 
                                            alt={course.title} 
                                            fill 
                                            className="object-cover" 
                                        />
                                    ) : (
                                        <BookOpen className="w-5 h-5 text-description/20" />
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-title font-bold text-sm leading-tight line-clamp-1">{course.title}</span>
                                    <span className="text-[10px] text-description font-medium uppercase tracking-tighter">{course.category_name}</span>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                                <span className="text-title font-bold">{course.enrolled_count}</span>
                                <span className="text-[10px] text-description uppercase tracking-tighter">Students</span>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest ${
                                course.status === 'accepted' ? 'bg-green-100 text-green-600' : 
                                course.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'
                            }`}>
                                {course.status}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap text-description text-xs font-medium">
                            {format(new Date(course.created_at), 'dd MMM yyyy')}
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-description">
                        No recently created courses found
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RecentCreatedCourses;
