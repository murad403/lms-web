"use client"
import { teamMembers, TTeamMember } from '@/lib/organization';
import { MoreVertical, SquarePen, Trash2, UserRoundX } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react'

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

type Props = {
    onEditPermission: (member: TTeamMember) => void;
};

const TeamMembersTab = ({ onEditPermission }: Props) => {
    const [openAction, setOpenAction] = useState<string | null>(null);
    return (
        <div className="bg-white border border-border-light rounded-md">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] text-sm">
                    <thead>
                        <tr className="border-b border-border-light">
                            <th className="text-left py-3 px-4 font-semibold text-main">Member</th>
                            <th className="text-left py-3 px-4 font-semibold text-main">Email</th>
                            <th className="text-left py-3 px-4 font-semibold text-main">Role</th>
                            <th className="text-left py-3 px-4 font-semibold text-main">Last Login</th>
                            <th className="text-left py-3 px-4 font-semibold text-main">Status</th>
                            <th className="text-left py-3 px-4 font-semibold text-main">Actions</th>
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
                                <td className="py-3 px-4 text-title">{member.email}</td>
                                <td className="py-3 px-4">
                                    <span className={`px-3 py-1 text-xs font-medium ${roleBadgeColors[member.role]}`}>
                                        {member.role}
                                    </span>
                                </td>
                                <td className="py-3 px-4 text-description whitespace-nowrap">{member.lastLogin}</td>
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
                                            <div className="absolute right-8 top-8 bg-white shadow-lg border border-border-light rounded z-10 w-44">
                                                <button
                                                    onClick={() => { onEditPermission(member); setOpenAction(null); }}
                                                    className="w-full text-left px-4 py-2 text-sm text-title hover:bg-gray-50"
                                                >
                                                    <SquarePen className="w-4 h-4 mr-2 inline" />
                                                    Edit Role
                                                </button>
                                                <button className="w-full text-left px-4 py-2 text-sm text-title hover:bg-gray-50">
                                                    <UserRoundX className="w-4 h-4 mr-2 inline" />
                                                    {member.status === "Suspended" ? "Activate" : "Suspend"}
                                                </button>
                                                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50">
                                                    <Trash2 className="w-4 h-4 mr-2 inline" />
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
    )
}

export default TeamMembersTab
