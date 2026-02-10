"use client";
import { LogOut } from "lucide-react";
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
  const handleLogout = () => {
    // TODO: API call for logout
    onClose();
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-sm">
        <AlertDialogHeader className="items-center flex flex-col justify-center">
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-2">
            <LogOut className="w-6 h-6 text-red-500" />
          </div>
          <AlertDialogTitle className="text-lg font-bold text-title">
            Logout
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-description text-center">
            Are you sure you want to logout?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row gap-3 sm:justify-center">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-title hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 px-6 py-2.5 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
          >
            Yes, Logout
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutModal;
