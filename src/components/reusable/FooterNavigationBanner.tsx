
type TProps = {
    title: string;
    description: React.ReactNode;
}

const FooterNavigationBanner = ({ title, description }: TProps) => {
    return (
        <div className="bg-linear-to-t to-main from-[#1E40AF] py-10 md:py-24">
            <div className='container mx-auto'>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {title}
                </h2>
                <p className="text-[#DBEAFE] text-lg mb-6">
                    {description}
                </p>
            </div>
        </div>
    )
}

export default FooterNavigationBanner
