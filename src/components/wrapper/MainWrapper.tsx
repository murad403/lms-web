import React from 'react'
import Menu from '../shared/Menu'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'

const MainWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <main>
            <Menu />
            <Navbar />
                {children}
            <Footer />
        </main>
    )
}

export default MainWrapper
