import { userProfile } from "@/lib/profile";

const MyProfilePage = () => {
    const profile = userProfile;

    return (
        <div>
            <h2 className="text-lg sm:text-xl font-bold text-title mb-6 border-b border-border-light pb-6">My Profile</h2>

            <div className="bg-white rounded-xl p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5">
                    <div>
                        <p className="text-base font-semibold text-title mb-1">First Name</p>
                        <p className="text-sm text-description">{profile.firstName}</p>
                    </div>
                    <div>
                        <p className="text-base font-semibold text-title mb-1">Last Name</p>
                        <p className="text-sm text-description">{profile.lastName}</p>
                    </div>
                    <div>
                        <p className="text-base font-semibold text-title mb-1">Registration Date</p>
                        <p className="text-sm text-description">{profile.registrationDate}</p>
                    </div>
                    <div>
                        <p className="text-base font-semibold text-title mb-1">User Name</p>
                        <p className="text-sm text-description">{profile.username}</p>
                    </div>
                    <div>
                        <p className="text-base font-semibold text-title mb-1">Phone Number</p>
                        <p className="text-sm text-description">{profile.phone}</p>
                    </div>
                    <div>
                        <p className="text-base font-semibold text-title mb-1">Email</p>
                        <p className="text-sm text-description">{profile.email}</p>
                    </div>
                    <div>
                        <p className="text-base font-semibold text-title mb-1">Gender</p>
                        <p className="text-sm text-description">{profile.gender}</p>
                    </div>
                    <div>
                        <p className="text-base font-semibold text-title mb-1">Date of Birth</p>
                        <p className="text-sm text-description">{profile.dateOfBirth}</p>
                    </div>
                    <div>
                        <p className="text-base font-semibold text-title mb-1">Age</p>
                        <p className="text-sm text-description">{profile.age}</p>
                    </div>
                </div>

                {/* Bio */}
                <div className="mt-5 pt-5 border-t border-gray-100">
                    <p className="text-base font-semibold text-title mb-1">Bio</p>
                    <p className="text-sm text-description leading-relaxed">{profile.bio}</p>
                </div>
            </div>
        </div>
    );
};

export default MyProfilePage;
