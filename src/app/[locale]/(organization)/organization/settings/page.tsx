
import PhotoAndBanner from './PhotoAndBanner'
import AccountSettings from './AccountSettings'
import ChangePassword from '@/components/reusable/for-dashboard/ChangePassword'

const page = () => {
  return (
    <div>
      <PhotoAndBanner />
      <AccountSettings />
      <ChangePassword />
    </div>
  )
}

export default page
