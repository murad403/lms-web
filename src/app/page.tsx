import React from 'react'
import Banner from './(app)/home/Banner'
import Courses from './(app)/home/Courses'

const page = () => {
  return (
    <div className='md:space-y-36 space-y-20'>
      <Banner />
      <Courses/> 
    </div>
  )
}

export default page
