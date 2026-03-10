"use client";
import { useState } from "react";
import { MoreVertical, SquarePen, Eye, Trash2, UserRoundX } from "lucide-react";
import { instructorMembers, TInstructorMember } from "@/lib/organization";
import Image from "next/image";
import { useForm } from "react-hook-form";
import AddInstructorModal, { AddInstructorForm } from "@/components/modal/AddInstructorModal";
import EditInstructorRoleModal from "@/components/modal/EditInstructorRoleModal";
import ViewContractModal from "@/components/modal/ViewContractModal";
import { useTranslations } from "next-intl";

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

    const t = useTranslations("OrganizationInstructors");

    const [openAction, setOpenAction] = useState<string | null>(null);
    
    const [statusFilter, setStatusFilter] = useState("all");
    const [roleFilter, setRoleFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const [showEditRole, setShowEditRole] = useState(false);
    const [editingInstructor, setEditingInstructor] = useState<TInstructorMember | null>(null);
    const [selectedRole, setSelectedRole] = useState("");

    const [showViewContract, setShowViewContract] = useState(false);
    const [viewingInstructor, setViewingInstructor] = useState<TInstructorMember | null>(null);

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

    const handleEditRole = (instructor: TInstructorMember) => {
        setEditingInstructor(instructor);
        setSelectedRole(instructor.role);
        setOpenAction(null);
        setShowEditRole(true);
    };

    const handleViewContract = (instructor: TInstructorMember) => {
        setViewingInstructor(instructor);
        setOpenAction(null);
        setShowViewContract(true);
    };

    const saveEditRole = () => {
        console.log("Save role:", editingInstructor?.id, selectedRole);
        setShowEditRole(false);
        setEditingInstructor(null);
    };
    return (
        <div>
            {/* Table */}
            <div className="">
                <div className="mb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <h3 className="text-lg font-semibold text-title">{t("availableInstructors")}</h3>
                        <div className="flex gap-2 w-full sm:w-auto">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-4 py-2 text-sm border border-border-light text-description bg-white focus:outline-none"
                            >
                                <option value="all">{t("allStatus")}</option>
                                <option value="Active">{t("active")}</option>
                                <option value="Pending">{t("pending")}</option>
                                <option value="Suspended">{t("suspended")}</option>
                            </select>
                            <select
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
                                className="px-4 py-2 text-sm border border-border-light text-description bg-white focus:outline-none"
                            >
                                <option value="all">{t("allRoles")}</option>
                                <option value="Lead Instructor">{t("admin")}</option>
                                <option value="Instructor">{t("manager")}</option>
                                <option value="Assistant">{t("reviewer")}</option>
                                <option value="Assistant">{t("finance")}</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-white overflow-x-auto">
                    <table className="w-full min-w-175 text-sm">
                        <thead>
                            <tr className="border-b border-border-light">
                                <th className="text-left py-3 px-4 font-medium text-title">{t("instructor")}</th>
                                <th className="text-left py-3 px-4 font-medium text-title">{t("email")}</th>
                                <th className="text-left py-3 px-4 font-medium text-title">{t("role")}</th>
                                <th className="text-left py-3 px-4 font-medium text-title">{t("lastLogin")}</th>
                                <th className="text-left py-3 px-4 font-medium text-title">{t("status")}</th>
                                <th className="text-left py-3 px-4 font-medium text-title">{t("actions")}</th>
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
                                        <span className={`px-3 py-1 text-xs font-medium whitespace-nowrap ${roleBadgeColors[instructor.role]}`}>
                                            {instructor.role}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-description whitespace-nowrap">{instructor.lastLogin}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-3 py-1 text-xs font-medium whitespace-nowrap ${statusColors[instructor.status]}`}>
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
                                                    <button
                                                        onClick={() => handleEditRole(instructor)}
                                                        className="w-full text-left px-4 py-2 text-sm text-title hover:bg-gray-50">
                                                        <SquarePen className="w-4 h-4 mr-2 inline" />
                                                        {t("editRole")}
                                                        </button>
                                                    <button
                                                        onClick={() => handleViewContract(instructor)}
                                                        className="w-full text-left px-4 py-2 text-sm text-title hover:bg-gray-50">
                                                        <Eye className="w-4 h-4 mr-2 inline" />
                                                        {t("viewContract")}
                                                        </button>
                                                    <button className="w-full text-left px-4 py-2 text-sm text-title hover:bg-gray-50">
                                                        <UserRoundX className="w-4 h-4 mr-2 inline" />
                                                        {instructor.status === "Suspended" ? t("activate") : t("suspend")}
                                                    </button>
                                                    <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50">
                                                        <Trash2 className="w-4 h-4 mr-2 inline" />
                                                        {t("removeMember")}</button>
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

            <AddInstructorModal
                show={showAddInstructor}
                onClose={() => setShowAddInstructor(false)}
                form={form}
                onSubmit={handleAddInstructor}
            />

            <EditInstructorRoleModal
                show={showEditRole}
                instructor={editingInstructor}
                selectedRole={selectedRole}
                onRoleChange={setSelectedRole}
                onClose={() => { setShowEditRole(false); setEditingInstructor(null); }}
                onSave={saveEditRole}
            />

            <ViewContractModal
                show={showViewContract}
                instructor={viewingInstructor}
                onClose={() => { setShowViewContract(false); setViewingInstructor(null); }}
            />
        </div>
    )
}

export default InstructorTable
