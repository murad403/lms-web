import React from 'react'
import Banner from './home/Banner'
import Courses from './home/Courses'
import LearningMode from './home/LearningMode'
import Certificate from './home/Certificate'
import TrainingMeetsQuality from './home/TrainingMeetsQuality'
import JoinOurPlatform from './home/JoinOurPlatform'
import AboutInstructor from './home/AboutInstructor'
import HomeLandingDataProvider from './home/HomeLandingDataProvider'

const page = () => {
  return (
    <div className='md:space-y-28 space-y-20'>
      <Banner />
      <HomeLandingDataProvider>
        <Courses />
        <LearningMode />
        <Certificate />
        <AboutInstructor />
      </HomeLandingDataProvider>
      <JoinOurPlatform/>
      <TrainingMeetsQuality/>
    </div>
  )
}

export default page
