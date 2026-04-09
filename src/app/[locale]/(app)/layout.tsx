import MainWrapper from '@/components/wrapper/MainWrapper'
import React from 'react'

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <MainWrapper>
        {children}
      </MainWrapper>
    </div>
  )
}

export default layout
