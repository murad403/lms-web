"use client";
import { useState } from "react";
import { Eye, MoreVertical, SquarePen, Trash2, UserRoundX, X } from "lucide-react";
import { instructorMembers } from "@/lib/organization";
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

type TProps = { 
    showAddInstructor: boolean; 
    setShowAddInstructor: (show: boolean) => void;
}

const InstructorTable = ({ showAddInstructor, setShowAddInstructor }: TProps) => {

    const [openAction, setOpenAction] = useState<string | null>(null);
    
    const [statusFilter, setStatusFilter] = useState("all");
    const [roleFilter, setRoleFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const form = useForm<AddInstructorForm>();

    const filteredInstructors = instructorMembers.filter((i) => {
        const matchStatus = statusFilter === "all" || i.status === statusFilter;
        const matchRole = roleFilter === "all" || i.role === roleFilter;
        const matchSearch = searchQuery === "" || i.name.toLowerCase().includes(searchQuery.toLowerCase()) || i.email.toLowerCase().includes(searchQuery.toLowerCase());
        return matchStatus && matchRole && matchSearch;
    });


    const handleAddInstructor = (data: AddInstructorForm) => {
        console.log("Add Instructor:", data);
        setShowAddInstructor(false);
        form.reset();
    };
    return (
        <div>
            {/* Table */}
            <div className="">
                <div className="mb-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-title">Available Instructors</h3>
                        <div className="flex gap-2">
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
                                <option value="Lead Instructor">Admin</option>
                                <option value="Instructor">Manager</option>
                                <option value="Assistant">Reviewer</option>
                                <option value="Assistant">Finance</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-white overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border-light">
                                <th className="text-left py-3 px-4 font-medium text-title">Instructor</th>
                                <th className="text-left py-3 px-4 font-medium text-title">Email</th>
                                <th className="text-left py-3 px-4 font-medium text-title">Role</th>
                                <th className="text-left py-3 px-4 font-medium text-title">Last Login</th>
                                <th className="text-left py-3 px-4 font-medium text-title">Status</th>
                                <th className="text-left py-3 px-4 font-medium text-title">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredInstructors.map((instructor) => (
                                <tr key={instructor.id} className="border-b border-border-light last:border-0">
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
                                                    <button className="w-full text-left px-4 py-2 text-sm text-title hover:bg-gray-50">
                                                        <SquarePen className="w-4 h-4 mr-2 inline" />
                                                        Edit Role
                                                        </button>
                                                    <button className="w-full text-left px-4 py-2 text-sm text-title hover:bg-gray-50">
                                                        <Eye className="w-4 h-4 mr-2 inline" />
                                                        View Contract
                                                        </button>
                                                    <button className="w-full text-left px-4 py-2 text-sm text-title hover:bg-gray-50">
                                                        <UserRoundX className="w-4 h-4 mr-2 inline" />
                                                        {instructor.status === "Suspended" ? "Activate" : "Suspend"}
                                                    </button>
                                                    <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50">
                                                        <Trash2 className="w-4 h-4 mr-2 inline" />
                                                        Remove Member</button>
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
                    <div className="bg-white w-full max-w-md rounded-md">
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
                                    <option value="Lead Instructor">Admin</option>
                                    <option value="Instructor">Manager</option>
                                    <option value="Assistant">Reviewer</option>
                                    <option value="Assistant">Finance</option>
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
    )
}

export default InstructorTable
