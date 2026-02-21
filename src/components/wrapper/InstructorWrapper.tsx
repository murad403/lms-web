"use client"
import React from 'react'
import InstructorSidebar from '../shared/InstructorSidebar'
import InstructorTopbar from '../shared/InstructorTopbar'
import { usePathname } from 'next/navigation'
import Menu from '../shared/Menu'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'

const InstructorWrapper = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const isShowLayout = pathname.includes('/instructor/profile');
    // console.log(isShowLayout);
    return (
        <div className="min-h-screen bg-light-bg">
            {
                (isShowLayout == false) ? <InstructorSidebar /> : <div>
                    <Menu />
                    <Navbar />
                </div>
            }
            <div className={isShowLayout === false ? "lg:ml-80" : "lg:ml-0"}>
                {
                    (isShowLayout == false) && <InstructorTopbar />
                }
                <main className={isShowLayout === false ? "px-4 sm:px-6 md:px-8 lg:px-10 xl:px-16 py-6" : "px-4 sm:px-6 md:px-10 lg:px-20 xl:px-30 py-6"}>{children}</main>
            </div>

            {
                (isShowLayout == true) && <Footer />
            }

        </div>
    )
}

export default InstructorWrapper
