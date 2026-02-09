
type TProps = {
    title: string;
    description: React.ReactNode;
}

const FooterNavigationBanner = ({ title, description }: TProps) => {
    return (
        <div className="bg-linear-to-t to-main from-[#1E40AF] py-10 md:py-24">
            <div className='container mx-auto px-3 sm:px-4 md:px-6 lg:px-0'>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                    {title}
                </h2>
                <p className="text-[#DBEAFE] text-sm sm:text-base md:text-lg lg:text-xl mb-6">
                    {description}
                </p>
            </div>
        </div>
    )
}

export default FooterNavigationBanner
