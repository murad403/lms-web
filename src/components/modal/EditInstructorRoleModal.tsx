"use client";
import { X } from "lucide-react";
import { TInstructorMember } from "@/lib/organization";
import Image from "next/image";

type Props = {
    show: boolean;
    instructor: TInstructorMember | null;
    selectedRole: string;
    onRoleChange: (role: string) => void;
    onClose: () => void;
    onSave: () => void;
};

const EditInstructorRoleModal = ({ show, instructor, selectedRole, onRoleChange, onClose, onSave }: Props) => {
    if (!show || !instructor) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-md">
                <div className="flex items-center justify-between p-6 border-b border-border-light">
                    <h2 className="text-lg font-semibold text-title">Edit Role</h2>
                    <button onClick={onClose}>
                        <X className="w-5 h-5 text-description" />
                    </button>
                </div>
                <div className="p-6 space-y-4">
                    {/* Instructor Info */}
                    <div className="flex items-center gap-3 p-3 bg-gray-50">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden">
                            <Image src={instructor.avatar} alt={instructor.name} fill className="object-cover" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-title">{instructor.name}</p>
                            <p className="text-xs text-description">{instructor.email}</p>
                        </div>
                    </div>

                    {/* Role Select */}
                    <div>
                        <label className="block text-sm font-medium text-title mb-1">Role</label>
                        <select
                            value={selectedRole}
                            onChange={(e) => onRoleChange(e.target.value)}
                            className="w-full px-4 py-2.5 text-sm border border-border-light focus:outline-none focus:border-main bg-white"
                        >
                            <option value="Lead Instructor">Lead Instructor</option>
                            <option value="Instructor">Instructor</option>
                            <option value="Assistant">Assistant</option>
                        </select>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 text-sm border border-border-light text-description hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={onSave}
                            className="flex-1 px-4 py-2.5 text-sm bg-main text-white font-medium hover:bg-main/90"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditInstructorRoleModal;
