import React from 'react'
import Menu from '../shared/Menu'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import { getServerAuthSession } from '@/utils/auth-server'

const MainWrapper = async ({ children }: { children: React.ReactNode }) => {
    const initialSession = await getServerAuthSession();

    return (
        <main>
            <Menu />
            <Navbar initialSession={initialSession} />
                {children}
            <Footer />
        </main>
    )
}

export default MainWrapper
