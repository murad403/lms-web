import React from 'react'
import Banner from './(app)/home/Banner'
import Courses from './(app)/home/Courses'
import LearningMode from './(app)/home/LearningMode'
import Certificate from './(app)/home/Certificate'
import TrainingMeetsQuality from './(app)/home/TrainingMeetsQuality'
import JoinOurPlatform from './(app)/home/JoinOurPlatform'

const page = () => {
  return (
    <div className='md:space-y-28 space-y-20'>
      <Banner />
      <Courses/> 
      <LearningMode/>
      <Certificate/>
      <JoinOurPlatform/>
      <TrainingMeetsQuality/>
    </div>
  )
}

export default page
