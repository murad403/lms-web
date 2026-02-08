import Image from 'next/image'
import authImage from '@/assets/auth/auth.png';

const AuthBanner = () => {
    return (
        <div className="hidden lg:flex w-1/2 bg-main items-center justify-center p-12">
            <Image
                src={authImage}
                alt="Learning illustration"
                width={500}
                height={500}
                className="max-w-full h-auto object-contain"
                priority
            />
        </div>
    )
}

export default AuthBanner
