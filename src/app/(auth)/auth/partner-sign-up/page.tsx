import React from 'react'
import PartnerSignUpForm from './PartnerSignUpForm'
import PartnerSignUpFlow from './PartnerSignUpFlow'

const page = () => {
    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            <PartnerSignUpForm />
            <PartnerSignUpFlow />
        </div>
    )
}

export default page
