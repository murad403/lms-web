"use client";
import { useState } from "react";
import { Users, UserCheck, Clock, BookOpen, MoreVertical, Plus, Search, X } from "lucide-react";
import { instructorStats, instructorMembers } from "@/lib/organization";
import Image from "next/image";
import { useForm } from "react-hook-form";

type AddInstructorForm = {
  fullName: string;
  email: string;
  role: string;
};

const roleBadgeColors: Record<string, string> = {
  "Lead Instructor": "bg-purple-50 text-purple-700",
  Instructor: "bg-blue-50 text-blue-700",
  Assistant: "bg-green-50 text-green-700",
};

const statusColors: Record<string, string> = {
  Active: "bg-green-50 text-green-700",
  Pending: "bg-yellow-50 text-yellow-700",
  Suspended: "bg-red-50 text-red-700",
};

const InstructorsPage = () => {
  const [openAction, setOpenAction] = useState<string | null>(null);
  const [showAddInstructor, setShowAddInstructor] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const form = useForm<AddInstructorForm>();

  const stats = [
    { label: "Total Instructors", value: instructorStats.totalInstructors, icon: Users, color: "bg-blue-50 text-blue-600" },
    { label: "Active", value: instructorStats.activeInstructors, icon: UserCheck, color: "bg-green-50 text-green-600" },
    { label: "Pending", value: instructorStats.pendingInstructors, icon: Clock, color: "bg-yellow-50 text-yellow-600" },
    { label: "Total Courses", value: instructorStats.totalCourses, icon: BookOpen, color: "bg-purple-50 text-purple-600" },
  ];

  const filteredInstructors = instructorMembers.filter((i) => {
    const matchStatus = statusFilter === "all" || i.status === statusFilter;
    const matchRole = roleFilter === "all" || i.role === roleFilter;
    const matchSearch = searchQuery === "" || i.name.toLowerCase().includes(searchQuery.toLowerCase()) || i.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchRole && matchSearch;
  });

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredInstructors.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredInstructors.map((i) => i.id));
    }
  };

  const handleAddInstructor = (data: AddInstructorForm) => {
    console.log("Add Instructor:", data);
    setShowAddInstructor(false);
    form.reset();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-title">Instructors</h1>
          <p className="text-sm text-description mt-1">Manage your organization instructors</p>
        </div>
        <button
          onClick={() => setShowAddInstructor(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-main text-white text-sm font-medium hover:bg-main/90 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Instructor
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

      {/* Table */}
      <div className="bg-white">
        <div className="p-6 border-b border-border-light">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-title">Available Instructors</h3>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-description" />
                <input
                  type="text"
                  placeholder="Search instructors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 text-sm border border-border-light focus:outline-none focus:border-main w-56"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 text-sm border border-border-light text-description bg-white focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Suspended">Suspended</option>
              </select>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-4 py-2 text-sm border border-border-light text-description bg-white focus:outline-none"
              >
                <option value="all">All Roles</option>
                <option value="Lead Instructor">Lead Instructor</option>
                <option value="Instructor">Instructor</option>
                <option value="Assistant">Assistant</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-light">
                <th className="text-left py-3 px-4">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === filteredInstructors.length && filteredInstructors.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 accent-main"
                  />
                </th>
                <th className="text-left py-3 px-4 font-medium text-description">Instructor</th>
                <th className="text-left py-3 px-4 font-medium text-description">Email</th>
                <th className="text-left py-3 px-4 font-medium text-description">Role</th>
                <th className="text-left py-3 px-4 font-medium text-description">Last Login</th>
                <th className="text-left py-3 px-4 font-medium text-description">Status</th>
                <th className="text-left py-3 px-4 font-medium text-description">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInstructors.map((instructor) => (
                <tr key={instructor.id} className="border-b border-border-light last:border-0">
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(instructor.id)}
                      onChange={() => toggleSelect(instructor.id)}
                      className="w-4 h-4 accent-main"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden">
                        <Image src={instructor.avatar} alt={instructor.name} fill className="object-cover" />
                      </div>
                      <span className="text-title font-medium">{instructor.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-description">{instructor.email}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 text-xs font-medium ${roleBadgeColors[instructor.role]}`}>
                      {instructor.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-description">{instructor.lastLogin}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 text-xs font-medium ${statusColors[instructor.status]}`}>
                      {instructor.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="relative">
                      <button
                        onClick={() => setOpenAction(openAction === instructor.id ? null : instructor.id)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <MoreVertical className="w-4 h-4 text-description" />
                      </button>
                      {openAction === instructor.id && (
                        <div className="absolute right-0 top-8 bg-white shadow-lg border border-border-light rounded z-10 w-44">
                          <button className="w-full text-left px-4 py-2 text-sm text-title hover:bg-gray-50">Edit Role</button>
                          <button className="w-full text-left px-4 py-2 text-sm text-title hover:bg-gray-50">View Contract</button>
                          <button className="w-full text-left px-4 py-2 text-sm text-title hover:bg-gray-50">
                            {instructor.status === "Suspended" ? "Activate" : "Suspend"}
                          </button>
                          <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50">Remove Member</button>
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

      {/* Add Instructor Modal */}
      {showAddInstructor && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-border-light">
              <h2 className="text-lg font-semibold text-title">Add Instructor</h2>
              <button onClick={() => { setShowAddInstructor(false); form.reset(); }}>
                <X className="w-5 h-5 text-description" />
              </button>
            </div>
            <form onSubmit={form.handleSubmit(handleAddInstructor)} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-title mb-1">Full Name</label>
                <input
                  {...form.register("fullName", { required: true })}
                  className="w-full px-4 py-2.5 text-sm border border-border-light focus:outline-none focus:border-main"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-title mb-1">Email</label>
                <input
                  {...form.register("email", { required: true })}
                  type="email"
                  className="w-full px-4 py-2.5 text-sm border border-border-light focus:outline-none focus:border-main"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-title mb-1">Role</label>
                <select
                  {...form.register("role", { required: true })}
                  className="w-full px-4 py-2.5 text-sm border border-border-light focus:outline-none focus:border-main bg-white"
                >
                  <option value="">Select role</option>
                  <option value="Lead Instructor">Lead Instructor</option>
                  <option value="Instructor">Instructor</option>
                  <option value="Assistant">Assistant</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setShowAddInstructor(false); form.reset(); }}
                  className="flex-1 px-4 py-2.5 text-sm border border-border-light text-description hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 text-sm bg-main text-white font-medium hover:bg-main/90"
                >
                  Add Instructor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorsPage;
