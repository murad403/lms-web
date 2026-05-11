"use client";
import { useState } from "react";
import { MoreVertical, UserRoundX, User } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import AddInstructorModal, { AddInstructorForm } from "@/components/modal/AddInstructorModal";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useInstructorStatusChangeMutation, useInviteInstructorMutation, useOrganizationInstructorInvitationDashboardQuery } from "@/redux/features/organization/organization.api";
import { Skeleton } from "@/components/ui/skeleton";
import { resolveImageUrl } from "@/utils/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const roleBadgeColors: Record<string, string> = {
    instructor: "bg-blue-50 text-blue-700",
    admin: "bg-purple-50 text-purple-700",
    manager: "bg-green-50 text-green-700",
};

const statusColors: Record<string, string> = {
    active: "bg-green-50 text-green-700",
    pending: "bg-yellow-50 text-yellow-700",
    suspended: "bg-red-50 text-red-700",
};

const toTitleCase = (value: string) => {
    if (!value) return "Unknown";
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};

type TProps = {
    showAddInstructor: boolean;
    setShowAddInstructor: (show: boolean) => void;
}

const InstructorTable = ({ showAddInstructor, setShowAddInstructor }: TProps) => {

    const t = useTranslations("OrganizationInstructors");


    const [statusFilter, setStatusFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const form = useForm<AddInstructorForm>();
    const [inviteInstructor, { isLoading: isInviting }] = useInviteInstructorMutation();
    const [statusChange, { isLoading: isStatusChanging }] = useInstructorStatusChangeMutation();
    const { data, isLoading, isFetching } = useOrganizationInstructorInvitationDashboardQuery({
        search: searchQuery || undefined,
        status: statusFilter === "all" ? undefined : statusFilter,
    });

    const instructors = data?.data?.["memberships list"] ?? [];

    const skeletonRows = Array.from({ length: 5 }).map((_, idx) => (
        <tr key={`skeleton-${idx}`} className="border-b border-border-light last:border-0">
            <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                    <Skeleton className="w-8 h-8 rounded-full shrink-0" />
                    <Skeleton className="h-3.5 w-28" />
                </div>
            </td>
            <td className="py-3 px-4"><Skeleton className="h-3.5 w-36" /></td>
            <td className="py-3 px-4"><Skeleton className="h-5 w-16 rounded-sm" /></td>
            <td className="py-3 px-4"><Skeleton className="h-3.5 w-20" /></td>
            <td className="py-3 px-4"><Skeleton className="h-5 w-16 rounded-sm" /></td>
            <td className="py-3 px-4 flex justify-end">
                <Skeleton className="h-7 w-7 rounded-full" />
            </td>
        </tr>
    ));
    const dataRows = instructors.map((instructor) => (
        <tr key={instructor.id} className="border-b border-border-light last:border-0">
            <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-50 flex items-center justify-center border border-border-light">
                        {instructor.user_avatar ? (
                            <Image 
                                src={resolveImageUrl(instructor.user_avatar)} 
                                alt={instructor.user_name} 
                                fill 
                                className="object-cover" 
                            />
                        ) : (
                            <User className="w-4 h-4 text-gray-400" />
                        )}
                    </div>
                    <span className="text-title font-medium">{instructor.user_name}</span>
                </div>
            </td>
            <td className="py-3 px-4 text-description">{instructor.user_email}</td>
            <td className="py-3 px-4">
                <span className={`px-3 py-1 text-xs font-medium whitespace-nowrap ${roleBadgeColors[instructor.role] || "bg-gray-100 text-gray-700"}`}>
                    {toTitleCase(instructor.role)}
                </span>
            </td>
            <td className="py-3 px-4 text-description whitespace-nowrap">{instructor.last_login || "-"}</td>
            <td className="py-3 px-4">
                <span className={`px-3 py-1 text-xs font-medium whitespace-nowrap ${statusColors[instructor.status] || "bg-gray-100 text-gray-700"}`}>
                    {toTitleCase(instructor.status)}
                </span>
            </td>
            <td className="py-3 px-4">
                <div className="flex justify-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="p-1 hover:bg-gray-100 rounded focus:outline-none">
                                <MoreVertical className="w-4 h-4 text-description" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                            <DropdownMenuItem 
                                disabled={isStatusChanging}
                                onClick={() => handleStatusChange(instructor.id)}
                                className="cursor-pointer"
                            >
                                <UserRoundX className="w-4 h-4 mr-2" />
                                {instructor.status === "suspended" ? t("activate") : t("suspend")}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </td>
        </tr>
    ));

    const rows = (isLoading || isFetching) ? skeletonRows : dataRows;

    const handleAddInstructor = async (values: AddInstructorForm) => {
        try {
            const response = await inviteInstructor({ email: values.email }).unwrap();
            toast.success(response.message || "Invitation sent successfully.");
            setShowAddInstructor(false);
            form.reset();
        } catch (error: unknown) {
            const message =
                typeof error === "object" &&
                    error !== null &&
                    "data" in error &&
                    typeof (error as { data?: { message?: string } }).data?.message === "string"
                    ? (error as { data?: { message?: string } }).data?.message
                    : "Failed to send instructor invitation.";

            toast.error(message);
        }
    };
    
    const handleStatusChange = async (id: number) => {
        try {
            const response = await statusChange(id).unwrap();
            toast.success(response.message || "Status updated successfully.");
        } catch (error: unknown) {
            const message =
                typeof error === "object" &&
                    error !== null &&
                    "data" in error &&
                    typeof (error as { data?: { message?: string } }).data?.message === "string"
                    ? (error as { data?: { message?: string } }).data?.message
                    : "Failed to update status.";

            toast.error(message);
        }
    };

    return (
        <div>
            {/* Table */}
            <div className="">
                <div className="mb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <h3 className="text-lg font-semibold text-title">{t("availableInstructors")}</h3>
                        <div className="flex gap-2 w-full sm:w-auto">
                            <input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="px-4 py-2 text-sm border border-border-light text-description bg-white focus:outline-none"
                                placeholder="Search by name or email"
                            />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-4 py-2 text-sm border border-border-light text-description bg-white focus:outline-none"
                            >
                                <option value="all">{t("allStatus")}</option>
                                <option value="active">{t("active")}</option>
                                <option value="pending">{t("pending")}</option>
                                <option value="suspended">{t("suspended")}</option>
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
                                <th className="text-center py-3 px-4 font-medium text-title">{t("actions")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                            {!isLoading && instructors.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="py-6 px-4 text-center text-description">No instructors found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <AddInstructorModal
                show={showAddInstructor}
                onClose={() => setShowAddInstructor(false)}
                form={form}
                onSubmit={handleAddInstructor}
                isSubmitting={isInviting}
            />
        </div>
    )
}

export default InstructorTable
