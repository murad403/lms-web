"use client"
import CourseDetailPage from '@/components/reusable/for-dashboard/CourseDetailPage'
import { useParams } from 'next/navigation';

const CourseDetails = () => {
  const { id } = useParams();
  return (
    <div>
      <CourseDetailPage courseId={Number(id)} />
    </div>
  )
}

export default CourseDetails
