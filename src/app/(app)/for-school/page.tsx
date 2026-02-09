import SchoolBanner from './SchoolBanner'
import AboutSchool from './AboutSchool'
import SchoolWhatYouCanDo from './SchoolWhatYouCanDo'
import SchoolHowItsWorks from './SchoolHowItsWorks'
import SchoolSolutions from './SchoolSolutions'
import CTABanner from '@/components/reusable/CTABanner'

const page = () => {
    return (
        <div>
            <SchoolBanner />
            <div className="px-3 md:px-0 container mx-auto space-y-20">
                <AboutSchool/>
                <SchoolWhatYouCanDo/>
                <SchoolHowItsWorks/>
                <SchoolSolutions/>
                <CTABanner title='Are You a School or Training Provider?' description={
    <>
      Take your school online and start <br/> selling your courses
    </>
  } buttonText='GET STARTED' route='/auth/organization-sign-up' />
            </div>
        </div>
    )
}

export default page
