"use client"
import notFoundImage from "@/assets/auth/notfound.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

const NotFoundPage = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col md:flex-row min-h-screen justify-center items-center gap-10 max-w-6xl mx-auto px-4 sm:px-0">
      <div className="space-y-4">
        <h2 className="font-semibold text-7xl text-[#E9EAF0]">Error 404</h2>
        <h3 className="font-bold text-navy-blue text-4xl">Oops! page not found</h3>
        <p className="text-description text-base max-w-sm">{`Something went wrong. It’s look that your requested could not be found. It's look like the link is broken or the page is removed.`}</p>
        <button 
          className="bg-navy-blue text-white text-base font-medium py-3 px-4 cursor-pointer"
          onClick={() => router.back()}
        >
          Go Back
        </button>
      </div>
      <div>
        <Image src={notFoundImage} alt="not found image" width={500} height={500}/>
      </div>
    </div>
  )
}

export default NotFoundPage
