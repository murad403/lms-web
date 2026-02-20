"use client";
import Image from 'next/image'
import { recentCourses } from '@/lib/organization'

const RecentCreatedCourses = () => {
  return (
    <div className="bg-white rounded-md">
      <div className="p-5">
        <h3 className="text-lg font-semibold text-title">Recently Created Courses</h3>
      </div>
      <div className="px-6 pb-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border-light">
              <th className="text-left py-3 font-semibold text-title">Courses</th>
              <th className="text-left py-3 font-semibold text-title">Enrolled</th>
              <th className="text-left py-3 font-semibold text-title">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentCourses.map((course) => (
              <tr key={course.id} className="border-b border-border-light last:border-0">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-14 h-12 rounded-md overflow-hidden shrink-0">
                      <Image src={course.image} alt={course.title} fill className="object-cover" />
                    </div>
                    <span className="text-title font-medium text-sm leading-snug max-w-70">{course.title}</span>
                  </div>
                </td>
                <td className="py-4 text-description">{course.enrolled}</td>
                <td className="py-4 text-description">{course.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RecentCreatedCourses
