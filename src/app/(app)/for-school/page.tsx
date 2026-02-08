import SchoolBanner from './SchoolBanner'
import AboutSchool from './AboutSchool'
import SchoolWhatYouCanDo from './SchoolWhatYouCanDo'
import SchoolHowItsWorks from './SchoolHowItsWorks'
import SchoolSolutions from './SchoolSolutions'

const page = () => {
    return (
        <div>
            <SchoolBanner />
            <div className="px-3 md:px-0 container mx-auto space-y-20">
                <AboutSchool/>
                <SchoolWhatYouCanDo/>
                <SchoolHowItsWorks/>
                <SchoolSolutions/>
            </div>
        </div>
    )
}

export default page
