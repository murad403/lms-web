import OrganizationWrapper from '@/components/wrapper/OrganizationWrapper'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <OrganizationWrapper>
      {children}
    </OrganizationWrapper>
  )
}

export default layout
