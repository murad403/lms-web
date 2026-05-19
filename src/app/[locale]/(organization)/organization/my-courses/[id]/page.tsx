"use client"
import CourseDetailPage from '@/components/reusable/for-dashboard/CourseDetailPage'
import { useParams } from 'next/navigation';

const CourseDetails = () => {
    const { id } = useParams();
    return (
        <div>
            <CourseDetailPage courseId={Number(id)} path="/organization/my-courses" />
            {/* <AttendanceTable /> */}
        </div>
    )
}

export default CourseDetails;
