import ChangePassword from "../../../../../components/reusable/for-dashboard/ChangePassword";
import AccountSettings from "./AccountSettings";

const InstructorSettingsPage = () => {
    return (
        <div className="space-y-6">
            {/* Account Settings */}
            <AccountSettings />

            {/* Change Password */}
            <ChangePassword />
        </div>
    );
};

export default InstructorSettingsPage;
