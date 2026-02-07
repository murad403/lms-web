import React from 'react'
import Menu from '../shared/Menu'
import Navbar from '../shared/Navbar'

const MainWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <main>
            <Menu />
            <Navbar />
            {children}
        </main>
    )
}

export default MainWrapper
