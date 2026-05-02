"use client";
import { Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useTranslations } from "next-intl";

type DeleteCourseModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  courseName?: string;
};

const DeleteCourseModal = ({ open, onClose, onConfirm, courseName }: DeleteCourseModalProps) => {
  const t = useTranslations("InstructorMyCourses");
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-sm">
        <AlertDialogHeader className="items-center flex flex-col justify-center">
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-2">
            <Trash2 className="w-6 h-6 text-red-500" />
          </div>
          <AlertDialogTitle className="text-lg font-bold text-title">
            {t("deleteCourse")}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-description text-center">
            {t("deleteConfirm", { courseName: courseName ? `"${courseName}"` : "this course" })}
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
            onClick={onConfirm}
            className="flex-1 px-6 py-2.5 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
          >
            {t("yesDelete")}
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCourseModal;
