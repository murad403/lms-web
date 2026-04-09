"use client";
import { LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { clearAuthCookies } from "@/utils/auth-client";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type LogoutModalProps = {
  open: boolean;
  onClose: () => void;
};

const LogoutModal = ({ open, onClose }: LogoutModalProps) => {
  const t = useTranslations("LogoutModal");
  const router = useRouter();

  const handleLogout = () => {
    clearAuthCookies();
    toast.success("Logged out successfully");
    onClose();
    router.replace("/auth/sign-in");
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-sm">
        <AlertDialogHeader className="items-center flex flex-col justify-center">
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-2">
            <LogOut className="w-6 h-6 text-red-500" />
          </div>
          <AlertDialogTitle className="text-lg font-bold text-title">
            {t("title")}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-description text-center">
            {t("description")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row gap-3 sm:justify-center">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-title hover:bg-gray-50 transition-colors"
          >
            {t("cancel")}
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 px-6 py-2.5 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
          >
            {t("confirm")}
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutModal;
