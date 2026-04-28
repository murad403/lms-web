import CourseDetailPage from '@/components/reusable/for-dashboard/CourseDetailPage'
import AttendanceTable from '@/components/organization/AttendanceTable'

const page = () => {
    return (
        <div>
            <CourseDetailPage />
            <AttendanceTable />
        </div>
    )
}

export default page
