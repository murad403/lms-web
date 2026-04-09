import OrganizationWrapper from '@/components/wrapper/OrganizationWrapper'
import React from 'react'
import { getServerAuthSession } from '@/utils/auth-server'

const layout = async ({ children }: { children: React.ReactNode }) => {
  const initialSession = await getServerAuthSession();

  return (
    <OrganizationWrapper initialSession={initialSession}>
      {children}
    </OrganizationWrapper>
  )
}

export default layout
