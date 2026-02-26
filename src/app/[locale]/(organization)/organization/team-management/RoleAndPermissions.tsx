"use client";
import { useState } from "react";
import { Pencil, X } from "lucide-react";

type TRoleRow = {
    id: string;
    role: string;
    access: string;
    permissions: string;
};

const rolesData: TRoleRow[] = [
    { id: "1", role: "Super Admin", access: "2 People", permissions: "Administrator" },
    { id: "2", role: "Manager Access", access: "10 People", permissions: "Instructor Management" },
    { id: "3", role: "Instructor", access: "20 People", permissions: "Upload Courses" },
];

const allPermissions = [
    "Manage Users", "Manage Courses", "Manage Settings", "View Reports",
    "Manage Billing", "Create Courses", "Manage Own Content", "Review Content", "Manage Comments",
];

const RoleAndPermissions = () => {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [editingRole, setEditingRole] = useState<TRoleRow | null>(null);
    const [selectedPerms, setSelectedPerms] = useState<string[]>([]);

    const openEdit = (row: TRoleRow) => {
        setEditingRole(row);
        setSelectedPerms([row.permissions]);
        setShowModal(true);
    };

    const togglePerm = (perm: string) => {
        setSelectedPerms((prev) =>
            prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
        );
    };

    return (
        <>
            <div >
              
                    <h3 className="text-base font-semibold text-title mb-4">Roles Permissions</h3>
             

                <div className="overflow-x-auto bg-white rounded-md border border-border-light">
                    <table className="w-full min-w-[450px] text-sm">
                        <thead>
                            <tr className="border-b border-border-light">
                                <th className="text-left py-3 px-6 font-semibold text-main">Role</th>
                                <th className="text-left py-3 px-6 font-semibold text-main">Access</th>
                                <th className="text-left py-3 px-6 font-semibold text-main">Permissions</th>
                                <th className="text-left py-3 px-6 font-semibold text-main">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rolesData.map((row) => {
                                const isSelected = selectedId === row.id;
                                return (
                                    <tr
                                        key={row.id}
                                        onClick={() => setSelectedId(isSelected ? null : row.id)}
                                        className={`border-b border-border-light last:border-0 cursor-pointer transition-all ${isSelected ? "outline-2 outline-amber-400 -outline-offset-2" : "hover:bg-gray-50"
                                            }`}
                                    >
                                        <td className="py-4 px-6 text-title font-medium">{row.role}</td>
                                        <td className="py-4 px-6 text-description">{row.access}</td>
                                        <td className="py-4 px-6 text-description">{row.permissions}</td>
                                        <td className="py-4 px-6">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); openEdit(row); }}
                                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-description bg-gray-100 hover:bg-gray-200 transition-colors rounded"
                                            >
                                                <Pencil className="w-3.5 h-3.5" />
                                                Edit Permission
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit Permission Modal */}
            {showModal && editingRole && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="flex items-center justify-between px-6 py-5 border-b border-border-light">
                            <div>
                                <h2 className="text-base font-bold text-title">Edit Permission</h2>
                                <p className="text-xs text-description mt-0.5">{editingRole.role}</p>
                            </div>
                            <button onClick={() => { setShowModal(false); setEditingRole(null); }}>
                                <X className="w-5 h-5 text-description" />
                            </button>
                        </div>

                        <div className="px-6 py-5 space-y-4">
                            {/* Role info */}
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                                <span className="text-sm font-medium text-title">{editingRole.role}</span>
                                <span className="text-xs text-description">{editingRole.access}</span>
                            </div>

                            {/* Permissions toggle */}
                            <div>
                                <label className="block text-sm font-medium text-title mb-2">Permissions</label>
                                <div className="flex flex-wrap gap-2">
                                    {allPermissions.map((perm) => (
                                        <button
                                            key={perm}
                                            type="button"
                                            onClick={() => togglePerm(perm)}
                                            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${selectedPerms.includes(perm)
                                                    ? "bg-main text-white"
                                                    : "bg-gray-100 text-description hover:bg-gray-200"
                                                }`}
                                        >
                                            {perm}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    onClick={() => { setShowModal(false); setEditingRole(null); }}
                                    className="flex-1 px-4 py-2.5 text-sm border border-border-light text-description rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => { setShowModal(false); setEditingRole(null); }}
                                    className="flex-1 px-4 py-2.5 text-sm bg-main text-white font-medium rounded-lg hover:bg-main/90"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default RoleAndPermissions;

