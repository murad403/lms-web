type TCanDo = {
    id: number;
    title: string;
    description: string;
}

const whatYouCanDo: TCanDo[] = [
    {
        id: 1,
        title: "Registration",
        description:
            "Create your account as a Local Guidance Center. Simple and free registration."
    },
    {
        id: 2,
        title: "Accreditation",
        description:
            "Your profile is reviewed and officially accredited."
    },
    {
        id: 3,
        title: "Assignment of the Affiliate Code",
        description:
            "Receive your personal code to use and share with users."
    },
    {
        id: 4,
        title: "Access to the Course Catalog",
        description:
            "Promote courses published by teachers, schools, and affiliated institutions."
    },
    {
        id: 5,
        title: "Sales and Earnings",
        description:
            "Each course purchased with your code is tracked, earns you commission, and appears in your reports. You focus on local guidance, while we handle the tech and payments."
    }
];

const PartnerShipHowItsWorks = () => {
    return (
        <div className="container mx-auto max-w-7xl">
            <h2 className="text-xl md:text-[36px] font-bold text-main text-center mb-12">
                How It Works – Step by Step
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-16">
                {
                    whatYouCanDo.map((item: TCanDo) =>
                        <div key={item?.id} className="flex gap-4">
                            <h1 className="text-5xl font-semibold text-gray-400">{item.id}</h1>
                            <div className="space-y-3">
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

export default PartnerShipHowItsWorks
