import { Link } from '@/i18n/navigation'

type TProps = {
    title: string;
    description?: React.ReactNode;
    buttonText: string;
    route: string;
}

const CTABanner = ({ title, description, buttonText, route }: TProps) => {
    return (
        <div className='container mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-0'>
            <div className="bg-linear-to-t to-main from-[#1E40AF] rounded-md py-10 md:py-24 text-center">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                    {title}
                </h2>
                <p className="text-white text-base md:text-lg mb-6">
                    {description}
                </p>
                <Link href={route} className="bg-white text-main px-8 py-3 rounded-md font-semibold text-sm md:text-base hover:bg-gray-100 transition-colors">
                    {buttonText}
                </Link>
            </div>
        </div>
    )
}

export default CTABanner
