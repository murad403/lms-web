"use client";
import { useState } from "react";
import { Users, UserCheck, UserX, ShieldCheck, MoreVertical, Plus, Search, ChevronDown, X, Clock } from "lucide-react";
import { teamStats, teamMembers, rolePermissions, activityLogs, TTeamMember } from "@/lib/organization";
import Image from "next/image";
import { useForm } from "react-hook-form";

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

const roleBadgeColors: Record<string, string> = {
  Admin: "bg-purple-50 text-purple-700",
  Manager: "bg-blue-50 text-blue-700",
  Instructor: "bg-green-50 text-green-700",
  Moderator: "bg-orange-50 text-orange-700",
};

const statusColors: Record<string, string> = {
  Active: "bg-green-50 text-green-700",
  Suspended: "bg-red-50 text-red-700",
  Pending: "bg-yellow-50 text-yellow-700",
};

const allPermissions = [
  "Manage Users", "Manage Courses", "Manage Settings", "View Reports",
  "Manage Billing", "Create Courses", "Manage Own Content", "Review Content", "Manage Comments",
];

const TeamManagementPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("members");
  const [openAction, setOpenAction] = useState<string | null>(null);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showEditPermission, setShowEditPermission] = useState(false);
  const [editingMember, setEditingMember] = useState<TTeamMember | null>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const addUserForm = useForm<AddUserForm>();
  const editPermForm = useForm<EditPermissionForm>();

  const stats = [
    { label: "Total Members", value: teamStats.totalMembers, icon: Users, color: "bg-blue-50 text-blue-600" },
    { label: "Active", value: teamStats.activeMembers, icon: UserCheck, color: "bg-green-50 text-green-600" },
    { label: "Suspended", value: teamStats.suspendedMembers, icon: UserX, color: "bg-red-50 text-red-600" },
    { label: "Admins", value: teamStats.admins, icon: ShieldCheck, color: "bg-purple-50 text-purple-600" },
  ];

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-title">Team Management</h1>
          <p className="text-sm text-description mt-1">Manage your team members and permissions</p>
        </div>
        <button
          onClick={() => setShowAddUser(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-main text-white text-sm font-medium hover:bg-main/90 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white p-5 flex items-center gap-4">
              <div className={`w-12 h-12 flex items-center justify-center ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-title">{String(stat.value).padStart(2, "0")}</p>
                <p className="text-sm text-description">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="bg-white">
        <div className="border-b border-border-light flex">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-3 text-sm font-medium transition-colors relative ${
                activeTab === tab.key
                  ? "text-main border-b-2 border-main"
                  : "text-description hover:text-title"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Team Members Tab */}
          {activeTab === "members" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-description" />
                  <input
                    type="text"
                    placeholder="Search members..."
                    className="pl-10 pr-4 py-2 text-sm border border-border-light focus:outline-none focus:border-main w-64"
                  />
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 text-sm border border-border-light text-description">
                    All Status <ChevronDown className="w-4 h-4" />
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 text-sm border border-border-light text-description">
                    All Roles <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border-light">
                      <th className="text-left py-3 px-4 font-medium text-description">Member</th>
                      <th className="text-left py-3 px-4 font-medium text-description">Email</th>
                      <th className="text-left py-3 px-4 font-medium text-description">Role</th>
                      <th className="text-left py-3 px-4 font-medium text-description">Last Login</th>
                      <th className="text-left py-3 px-4 font-medium text-description">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-description">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamMembers.map((member) => (
                      <tr key={member.id} className="border-b border-border-light last:border-0">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-8 h-8 rounded-full overflow-hidden">
                              <Image src={member.avatar} alt={member.name} fill className="object-cover" />
                            </div>
                            <span className="text-title font-medium">{member.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-description">{member.email}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 text-xs font-medium ${roleBadgeColors[member.role]}`}>
                            {member.role}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-description">{member.lastLogin}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 text-xs font-medium ${statusColors[member.status]}`}>
                            {member.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="relative">
                            <button
                              onClick={() => setOpenAction(openAction === member.id ? null : member.id)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <MoreVertical className="w-4 h-4 text-description" />
                            </button>
                            {openAction === member.id && (
                              <div className="absolute right-0 top-8 bg-white shadow-lg border border-border-light rounded z-10 w-44">
                                <button
                                  onClick={() => { handleEditPermission(member); setOpenAction(null); }}
                                  className="w-full text-left px-4 py-2 text-sm text-title hover:bg-gray-50"
                                >
                                  Edit Role
                                </button>
                                <button className="w-full text-left px-4 py-2 text-sm text-title hover:bg-gray-50">
                                  {member.status === "Suspended" ? "Activate" : "Suspend"}
                                </button>
                                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50">
                                  Remove Member
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Role & Permissions Tab */}
          {activeTab === "permissions" && (
            <div className="space-y-6">
              {/* Roles Permissions Table */}
              <div>
                <h3 className="text-base font-semibold text-title mb-4">Roles Permissions</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border-light">
                        <th className="text-left py-3 px-4 font-medium text-description">Role</th>
                        <th className="text-left py-3 px-4 font-medium text-description">Permissions</th>
                        <th className="text-left py-3 px-4 font-medium text-description">Members</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rolePermissions.map((role) => (
                        <tr key={role.id} className="border-b border-border-light last:border-0">
                          <td className="py-3 px-4">
                            <span className={`px-3 py-1 text-xs font-medium ${roleBadgeColors[role.role] || "bg-gray-50 text-gray-700"}`}>
                              {role.role}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex flex-wrap gap-1">
                              {role.permissions.map((perm) => (
                                <span key={perm} className="px-2 py-0.5 text-xs bg-gray-100 text-description rounded">
                                  {perm}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-description">{role.members}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* User Roles Table */}
              <div>
                <h3 className="text-base font-semibold text-title mb-4">User Roles</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border-light">
                        <th className="text-left py-3 px-4 font-medium text-description">Member</th>
                        <th className="text-left py-3 px-4 font-medium text-description">Role</th>
                        <th className="text-left py-3 px-4 font-medium text-description">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teamMembers.map((member) => (
                        <tr key={member.id} className="border-b border-border-light last:border-0">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="relative w-8 h-8 rounded-full overflow-hidden">
                                <Image src={member.avatar} alt={member.name} fill className="object-cover" />
                              </div>
                              <span className="text-title font-medium">{member.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-3 py-1 text-xs font-medium ${roleBadgeColors[member.role]}`}>
                              {member.role}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => handleEditPermission(member)}
                              className="text-sm text-main hover:text-main/80"
                            >
                              Edit Permission
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Activity Log Tab */}
          {activeTab === "activity" && (
            <div className="space-y-4">
              {activityLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-4 p-4 border border-border-light">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                    <Image src={log.avatar} alt={log.user} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-title">
                      <span className="font-medium">{log.user}</span>{" "}
                      <span className="text-description">{log.action}</span>{" "}
                      <span className="font-medium">{log.target}</span>
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3 text-description" />
                      <span className="text-xs text-description">{log.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border-light">
              <h2 className="text-lg font-semibold text-title">Add User</h2>
              <button onClick={() => { setShowAddUser(false); addUserForm.reset(); }}>
                <X className="w-5 h-5 text-description" />
              </button>
            </div>
            <form onSubmit={addUserForm.handleSubmit(handleAddUser)} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-title mb-1">Full Name</label>
                <input
                  {...addUserForm.register("fullName", { required: true })}
                  className="w-full px-4 py-2.5 text-sm border border-border-light focus:outline-none focus:border-main"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-title mb-1">Email</label>
                <input
                  {...addUserForm.register("email", { required: true })}
                  type="email"
                  className="w-full px-4 py-2.5 text-sm border border-border-light focus:outline-none focus:border-main"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-title mb-1">Username</label>
                <input
                  {...addUserForm.register("username", { required: true })}
                  className="w-full px-4 py-2.5 text-sm border border-border-light focus:outline-none focus:border-main"
                  placeholder="Enter username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-title mb-1">Password</label>
                <input
                  {...addUserForm.register("password", { required: true })}
                  type="password"
                  className="w-full px-4 py-2.5 text-sm border border-border-light focus:outline-none focus:border-main"
                  placeholder="Enter password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-title mb-1">Confirm Password</label>
                <input
                  {...addUserForm.register("confirmPassword", { required: true })}
                  type="password"
                  className="w-full px-4 py-2.5 text-sm border border-border-light focus:outline-none focus:border-main"
                  placeholder="Confirm password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-title mb-1">User Permission</label>
                <select
                  {...addUserForm.register("permission", { required: true })}
                  className="w-full px-4 py-2.5 text-sm border border-border-light focus:outline-none focus:border-main bg-white"
                >
                  <option value="">Select permission</option>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Instructor">Instructor</option>
                  <option value="Moderator">Moderator</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setShowAddUser(false); addUserForm.reset(); }}
                  className="flex-1 px-4 py-2.5 text-sm border border-border-light text-description hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 text-sm bg-main text-white font-medium hover:bg-main/90"
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
          <div className="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto">
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
                  className="w-full px-4 py-2.5 text-sm border border-border-light focus:outline-none focus:border-main bg-white"
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
                      className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                        selectedPermissions.includes(perm)
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
                  className="flex-1 px-4 py-2.5 text-sm border border-border-light text-description hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={saveEditPermission}
                  className="flex-1 px-4 py-2.5 text-sm bg-main text-white font-medium hover:bg-main/90"
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
