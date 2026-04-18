/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useTranslations } from "next-intl";
import { useDeleteAccountMutation } from "@/redux/features/student/student.api";
import { toast } from "sonner";
import { clearAuthCookies } from "@/utils/auth-client";
import { useRouter } from "@/i18n/navigation";


type AccountDeleteModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

const AccountDeleteModal = ({ open, onOpenChange }: AccountDeleteModalProps) => {
    const router = useRouter();
    const t = useTranslations("SettingsPage");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [deleteAccount, { isLoading: isDeleting }] = useDeleteAccountMutation();

    const handleOpenChange = (nextOpen: boolean) => {
        onOpenChange(nextOpen);
        if (!nextOpen) {
            setPassword("");
            setPasswordError("");
        }
    };

    const handleDelete = async () => {
        const trimmedPassword = password.trim();
        if (!trimmedPassword) {
            setPasswordError("Password is required");
            return;
        }
        setPasswordError("");
        try {
            const response = await deleteAccount({ password: trimmedPassword }).unwrap();
            toast.success(response?.message || "Account deleted successfully.");
            clearAuthCookies();
            handleOpenChange(false);
            router.replace("/");
        } catch (error: any) {
            // console.log(error?.data?.message)
            toast.error(error?.data?.message || "Failed to delete account.");
            setPassword("")
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={handleOpenChange}>
            <AlertDialogContent className="max-w-sm">
                <AlertDialogHeader className="items-center flex justify-center flex-col">
                    <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-2">
                        <Trash2 className="w-6 h-6 text-red-500" />
                    </div>
                    <AlertDialogTitle className="text-lg font-bold text-title">{t("deleteAccount")}</AlertDialogTitle>
                    <AlertDialogDescription className="text-sm text-description text-center">
                        {t("deleteAccountConfirm")}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <div>
                    <label className="text-xs font-medium text-title mb-1 block">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            if (passwordError) {
                                setPasswordError("");
                            }
                        }}
                        placeholder="Enter your account password"
                        className="w-full px-3 py-3 border border-gray-300 text-sm focus:outline-none focus:border-main"
                    />
                    {passwordError && <p className="text-xs text-red-600 mt-1">{passwordError}</p>}
                </div>

                <AlertDialogFooter className="flex-row gap-3 sm:justify-center">
                    <button
                        onClick={() => handleOpenChange(false)}
                        disabled={isDeleting}
                        className="flex-1 px-6 py-3 border border-gray-300 rounded-md text-sm font-medium text-title hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                        {t("cancel")}
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="flex-1 px-6 py-3 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600 transition-colors cursor-pointer"
                    >
                        {isDeleting ? "Deleting..." : t("yesDelete")}
                    </button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default AccountDeleteModal;
