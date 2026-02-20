import { instructorProfile } from '@/lib/instructor';
import React from 'react'

const ProfileAbout = () => {
    const profile = instructorProfile;
    return (
        <div className="bg-white p-6">
            <h2 className="text-sm font-bold text-title mb-3 uppercase tracking-widest">
                About Me
            </h2>
            <div className="text-sm text-description leading-relaxed whitespace-pre-line">
                {profile.bio}
            </div>
        </div>
    )
}

export default ProfileAbout
