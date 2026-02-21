"use client";
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { rolePermissions, TTeamMember } from "@/lib/organization";
import Image from "next/image";
import { useForm } from "react-hook-form";
import TeamManagementStats from "./TeamManagementStats";
import TeamMembersTab from "./TeamMembersTab";
import ActivityLogs from "./ActivityLogs";
import RoleAndPermissions from "./RoleAndPermissions";

type Tab = "members" | "permissions" | "activity";

type AddUserForm = {
  fullName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  permission: string;
};

type EditPermissionForm = {
  role: string;
  permissions: string[];
};



const allPermissions = [
  "Manage Users", "Manage Courses", "Manage Settings", "View Reports",
  "Manage Billing", "Create Courses", "Manage Own Content", "Review Content", "Manage Comments",
];

const TeamManagementPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("members");

  const [showAddUser, setShowAddUser] = useState(false);
  const [showEditPermission, setShowEditPermission] = useState(false);
  const [editingMember, setEditingMember] = useState<TTeamMember | null>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const addUserForm = useForm<AddUserForm>();
  const editPermForm = useForm<EditPermissionForm>();



  const tabs: { key: Tab; label: string }[] = [
    { key: "members", label: "Team Members" },
    { key: "permissions", label: "Role & Permissions" },
    { key: "activity", label: "Activity Log" },
  ];

  const handleAddUser = (data: AddUserForm) => {
    console.log("Add User:", data);
    setShowAddUser(false);
    addUserForm.reset();
  };

  const handleEditPermission = (member: TTeamMember) => {
    setEditingMember(member);
    setSelectedPermissions(
      rolePermissions.find((r) => r.role === member.role)?.permissions || []
    );
    editPermForm.setValue("role", member.role);
    setShowEditPermission(true);
  };

  const togglePermission = (permission: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  const saveEditPermission = () => {
    console.log("Save permissions:", editingMember?.id, selectedPermissions);
    setShowEditPermission(false);
    setEditingMember(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-title">Team Management</h1>
          <p className="text-sm text-description mt-1">Manage your team members and permissions</p>
        </div>
        <button
          onClick={() => setShowAddUser(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-main text-white text-sm font-medium hover:bg-main/90 transition-colors w-full sm:w-auto justify-center sm:justify-start"
        >
          <Plus className="w-4 h-4" /> Add User
        </button>
      </div>

      {/* Stats */}
      <TeamManagementStats />

      {/* Tabs */}
      <div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-between">
          <div className="flex gap-1 bg-[#E7ECF4] px-3 py-2 rounded-md">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === tab.key
                  ? "bg-white text-main"
                  : "text-description hover:bg-gray-100"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          {/* Team Members Tab */}
          {activeTab === "members" && (
            <TeamMembersTab onEditPermission={handleEditPermission} />
          )}

          {/* Role & Permissions Tab */}
          {activeTab === "permissions" && (
            <RoleAndPermissions />
          )}

          {/* Activity Log Tab */}
          {activeTab === "activity" && (
            <ActivityLogs />
          )}
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between px-7 py-5 border-b border-border-light">
              <h2 className="text-xl font-bold text-main">Add User</h2>
              <button onClick={() => { setShowAddUser(false); addUserForm.reset(); }}>
                <X className="w-5 h-5 text-description" />
              </button>
            </div>

            <form onSubmit={addUserForm.handleSubmit(handleAddUser)} className="px-7 py-6 space-y-4">

              {/* Full Name */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <label className="sm:w-36 shrink-0 text-sm font-medium text-title">Full Name</label>
                <input
                  {...addUserForm.register("fullName", { required: true })}
                  className="flex-1 px-4 py-3 text-sm border border-border-light rounded-lg focus:outline-none focus:border-main"
                  placeholder="Enter full name"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <label className="sm:w-36 shrink-0 text-sm font-medium text-title">Email address</label>
                <div className="flex-1 relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </span>
                  <input
                    {...addUserForm.register("email", { required: true })}
                    type="email"
                    className="w-full pl-9 pr-4 py-3 text-sm border border-border-light rounded-lg focus:outline-none focus:border-main"
                    placeholder="Enter email address"
                  />
                </div>
              </div>

              {/* Username */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <label className="sm:w-36 shrink-0 text-sm font-medium text-title">Username</label>
                <input
                  {...addUserForm.register("username", { required: true })}
                  className="flex-1 px-4 py-3 text-sm border border-border-light rounded-lg focus:outline-none focus:border-main"
                  placeholder="Enter username"
                />
              </div>

              {/* Password + Confirm Password side by side */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <label className="sm:w-36 shrink-0 text-sm font-medium text-title">Password</label>
                <div className="flex-1 flex gap-3">
                  <input
                    {...addUserForm.register("password", { required: true })}
                    type="password"
                    className="flex-1 px-4 py-3 text-sm border border-border-light rounded-lg focus:outline-none focus:border-main"
                    placeholder="password"
                  />
                  <input
                    {...addUserForm.register("confirmPassword", { required: true })}
                    type="password"
                    className="flex-1 px-4 py-3 text-sm border border-border-light rounded-lg focus:outline-none focus:border-main"
                    placeholder="confirm password"
                  />
                </div>
              </div>

              {/* User Permission */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <label className="sm:w-36 shrink-0 text-sm font-medium text-title">User Permission</label>
                <select
                  {...addUserForm.register("permission", { required: true })}
                  className="flex-1 px-4 py-3 text-sm border border-border-light rounded-lg focus:outline-none focus:border-main bg-white"
                >
                  <option value="">Select permission</option>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Instructor">Instructor</option>
                  <option value="Moderator">Moderator</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => { setShowAddUser(false); addUserForm.reset(); }}
                  className=" px-5 py-3 text-sm border border-border-light rounded-lg text-description hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-3 text-sm bg-main text-white font-medium rounded-lg hover:bg-main/90"
                >
                  Add User
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Edit Permission Modal */}
      {showEditPermission && editingMember && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full rounded-xl max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border-light">
              <h2 className="text-lg font-semibold text-title">Edit Permission</h2>
              <button onClick={() => { setShowEditPermission(false); setEditingMember(null); }}>
                <X className="w-5 h-5 text-description" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {/* Member Info */}
              <div className="flex items-center gap-3 p-3 bg-gray-50">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image src={editingMember.avatar} alt={editingMember.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-sm font-medium text-title">{editingMember.name}</p>
                  <p className="text-xs text-description">{editingMember.email}</p>
                </div>
              </div>

              {/* Role Select */}
              <div>
                <label className="block text-sm font-medium text-title mb-1">Role</label>
                <select
                  {...editPermForm.register("role")}
                  defaultValue={editingMember.role}
                  className="w-full px-4 py-3 text-sm border border-border-light focus:outline-none focus:border-main bg-white"
                >
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Instructor">Instructor</option>
                  <option value="Moderator">Moderator</option>
                </select>
              </div>

              {/* Permissions */}
              <div>
                <label className="block text-sm font-medium text-title mb-2">Permissions</label>
                <div className="flex flex-wrap gap-2">
                  {allPermissions.map((perm) => (
                    <button
                      key={perm}
                      type="button"
                      onClick={() => togglePermission(perm)}
                      className={`px-3 py-1.5 text-xs font-medium transition-colors ${selectedPermissions.includes(perm)
                        ? "bg-main text-white"
                        : "bg-gray-100 text-description hover:bg-gray-200"
                        }`}
                    >
                      {perm}
                      {selectedPermissions.includes(perm) && (
                        <X className="w-3 h-3 inline ml-1" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setShowEditPermission(false); setEditingMember(null); }}
                  className="flex-1 px-4 py-3 text-sm border border-border-light text-description hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={saveEditPermission}
                  className="flex-1 px-4 py-3 text-sm bg-main text-white font-medium hover:bg-main/90"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamManagementPage;
