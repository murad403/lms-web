import AccoutSettings from "./AccoutSettings";
import ChangePassword from "../../../../../components/reusable/for-dashboard/ChangePassword";

const InstructorSettingsPage = () => {
    return (
        <div className="space-y-6">
            {/* Account Settings */}
            <AccoutSettings />

            {/* Change Password */}
            <ChangePassword />
        </div>
    );
};

export default InstructorSettingsPage;
