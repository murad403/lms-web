
import PhotoAndBanner from './PhotoAndBanner'
import AccountSettings from './AccountSettings'
import ChangePassword from '@/components/reusable/for-dashboard/ChangePassword'

const page = () => {
  return (
    <div className='space-y-6'>
      <PhotoAndBanner />
      <AccountSettings />
      <ChangePassword />
    </div>
  )
}

export default page
