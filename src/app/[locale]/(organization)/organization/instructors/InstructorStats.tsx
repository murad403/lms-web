import { instructorStats } from '@/lib/organization';
import { BookOpen, Clock, UserCheck, Users } from 'lucide-react';
import React from 'react'

const InstructorStats = () => {
    const stats = [
        { label: "Total Instructors", value: instructorStats.totalInstructors, icon: Users, color: "bg-blue-50 text-blue-600" },
        { label: "Active", value: instructorStats.activeInstructors, icon: UserCheck, color: "bg-green-50 text-green-600" },
        { label: "Pending", value: instructorStats.pendingInstructors, icon: Clock, color: "bg-yellow-50 text-yellow-600" },
        { label: "Total Courses", value: instructorStats.totalCourses, icon: BookOpen, color: "bg-purple-50 text-purple-600" },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                    <div key={stat.label} className="bg-white p-5 flex items-center gap-4">
                        <div className={`w-12 h-12 flex items-center justify-center ${stat.color}`}>
                            <Icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-title">{String(stat.value).padStart(2, "0")}</p>
                            <p className="text-sm text-description">{stat.label}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default InstructorStats
