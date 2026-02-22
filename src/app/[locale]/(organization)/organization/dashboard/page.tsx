import CourseOverviewChart from '@/components/reusable/for-dashboard/CourseOverviewChart'
import OverallRating from '@/components/reusable/for-dashboard/OverallRating'
import RecentActivity from '@/components/reusable/for-dashboard/RecentActivity'
import RevenueChart from '@/components/reusable/for-dashboard/RevenueChart'
import StatsCards from '@/app/[locale]/(instructor)/instructor/dashboard/StatsCards'
import { courseOverviewData, dashboardStats, ratingBreakdown, recentActivities, revenueData } from '@/lib/instructor'

const page = () => {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <StatsCards stats={dashboardStats} />

      {/* Recent Activity + Revenue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentActivity activities={recentActivities} />
        <div className="lg:col-span-2">
          <RevenueChart pathColor="#564FFD" strokeColor="#564FFD" title="Revenue" data={revenueData} />
        </div>
      </div>

      {/* Overall Rating + Course Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <OverallRating rating={4.6} breakdown={ratingBreakdown} />
        <div className="lg:col-span-2">
          <CourseOverviewChart data={courseOverviewData} />
        </div>
      </div>
    </div>
  )
}

export default page
