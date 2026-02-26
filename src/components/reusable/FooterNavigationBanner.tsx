
type TProps = {
    title: string;
    description: React.ReactNode;
}

const FooterNavigationBanner = ({ title, description }: TProps) => {
    return (
        <div className="bg-linear-to-t to-main from-[#1E40AF] py-10 md:py-24 px-4 md:px-5 lg:px-6 xl:px-0 2xl:px-0">
            <div className='container mx-auto'>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                    {title}
                </h2>
                <p className="text-[#DBEAFE] text-base md:text-lg mb-6">
                    {description}
                </p>
            </div>
        </div>
    )
}

export default FooterNavigationBanner
