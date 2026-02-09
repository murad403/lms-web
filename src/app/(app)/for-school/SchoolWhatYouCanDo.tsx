
type TCanDo = {
    id: number;
    title: string;
    description: string;
}

const whatYouCanDo: TCanDo[] = [
    {
        id: 1,
        title: "Publish Your Entire Course Catalog",
        description:
            "Upload and manage all your courses from a single dashboard."
    },
    {
        id: 2,
        title: "Sell Courses Online 24/7",
        description:
            "Automate sales and reach learners anywhere, anytime."
    },
    {
        id: 3,
        title: "Issue Certificates and Training Credits",
        description:
            "Offer officially recognized certificates and learning credits (where applicable)."
    },
    {
        id: 4,
        title: "Manage Students and Enrollments",
        description:
            "Track participants, progress, and course completion easily."
    },
    {
        id: 5,
        title: "Monitor Sales and Earnings",
        description:
            "View real-time sales data and receive automated payments."
    }
];


const SchoolWhatYouCanDo = () => {
    return (
        <div className="container mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold text-title text-center mb-10">
                What You Can Do
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-16">
                {
                    whatYouCanDo.map((item: TCanDo) =>
                        <div key={item?.id} className="flex gap-4">
                            <h1 className="text-4xl font-semibold text-gray-400">{item.id}</h1>
                            <div className="space-y-4">
                                <h3 className="text-2xl font-semibold text-main">{item.title}</h3>
                                <p className="text-description text-xl">{item.description}</p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default SchoolWhatYouCanDo
