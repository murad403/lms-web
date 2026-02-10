import { userProfile } from "@/lib/profile";

const MyProfilePage = () => {
  const profile = userProfile;

  return (
    <div>
      <h2 className="text-lg sm:text-xl font-bold text-title mb-6">My Profile</h2>

      <div className="bg-white rounded-xl border border-border-light p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5">
          <div>
            <p className="text-xs text-description mb-1">First Name</p>
            <p className="text-sm font-semibold text-title">{profile.firstName}</p>
          </div>
          <div>
            <p className="text-xs text-description mb-1">Last Name</p>
            <p className="text-sm font-semibold text-title">{profile.lastName}</p>
          </div>
          <div>
            <p className="text-xs text-description mb-1">Registration Date</p>
            <p className="text-sm font-semibold text-title">{profile.registrationDate}</p>
          </div>
          <div>
            <p className="text-xs text-description mb-1">User Name</p>
            <p className="text-sm font-semibold text-title">{profile.username}</p>
          </div>
          <div>
            <p className="text-xs text-description mb-1">Phone Number</p>
            <p className="text-sm font-semibold text-title">{profile.phone}</p>
          </div>
          <div>
            <p className="text-xs text-description mb-1">Email</p>
            <p className="text-sm font-semibold text-title">{profile.email}</p>
          </div>
          <div>
            <p className="text-xs text-description mb-1">Gender</p>
            <p className="text-sm font-semibold text-title">{profile.gender}</p>
          </div>
          <div>
            <p className="text-xs text-description mb-1">Date of Birth</p>
            <p className="text-sm font-semibold text-title">{profile.dateOfBirth}</p>
          </div>
          <div>
            <p className="text-xs text-description mb-1">Age</p>
            <p className="text-sm font-semibold text-title">{profile.age}</p>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-5 pt-5 border-t border-gray-100">
          <p className="text-xs text-description mb-1">Bio</p>
          <p className="text-sm text-title leading-relaxed">{profile.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
