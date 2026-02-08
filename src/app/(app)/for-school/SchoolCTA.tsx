import React from 'react'

const SchoolCTA = () => {
    return (
        <div className='container mx-auto max-w-7xl'>
            <div className="bg-linear-to-t to-main from-[#1E40AF] rounded-md py-10 md:py-24 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Are You a School or Training Provider?
                </h2>
                <p className="text-white text-lg mb-6">
                   Take your school online and start <br /> selling your courses
                </p>
                <button className="bg-white text-main px-8 py-3 rounded-md font-semibold text-lg hover:bg-gray-100 transition-colors">
                    GET STARTED
                </button>
            </div>
        </div>
    )
}

export default SchoolCTA
