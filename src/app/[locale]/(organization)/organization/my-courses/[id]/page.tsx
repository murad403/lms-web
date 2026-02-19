import CourseDetailPage from '@/components/reusable/for-dashboard/CourseDetailPage'
import AttendanceTable from '@/components/organization/AttendanceTable'
import React from 'react'

const page = () => {
    return (
        <div>
            <CourseDetailPage />
            <AttendanceTable />
        </div>
    )
}

export default page
