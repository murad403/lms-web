import React from 'react'
import Banner from './home/Banner'
import Courses from './home/Courses'
import LearningMode from './home/LearningMode'
import Certificate from './home/Certificate'
import TrainingMeetsQuality from './home/TrainingMeetsQuality'
import JoinOurPlatform from './home/JoinOurPlatform'

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
