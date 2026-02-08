import AboutTrainers from './AboutTrainers';
import TrainersBanner from './TrainersBanner';
import TrainersHowItsWorks from './TrainersHowItsWorks';
import TrainersOngoingSupport from './TrainersOngoingSupport';
import TrainersOpportunity from './TrainersOpportunity';


const page = () => {
    return (
        <div>
            {/* banner */}
            <TrainersBanner />

            {/* certifications */}
            <div className="px-3 md:px-0 container mx-auto space-y-20">
                <AboutTrainers/>
                <TrainersHowItsWorks/>
                <TrainersOpportunity/>
                <TrainersOngoingSupport/>

            </div>
        </div>
    )
}

export default page
