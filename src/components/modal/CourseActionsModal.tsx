"use client";
import { Eye, Pencil, Award, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type CourseActionsModalProps = {
    isOpen: boolean;
    onClose: () => void;
    courseId: number;
    onDelete: (id: number) => void;
    path: string;
};

const CourseActionsModal = ({ isOpen, onClose, courseId, onDelete, path }: CourseActionsModalProps) => {
    const t = useTranslations("InstructorCourseActions");
    const handleDelete = () => {
        onDelete(courseId);
        onClose();
    };

    const handleRequestAccreditation = () => {
        console.log("Requesting accreditation for course ID:", courseId);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-xs p-0 gap-0">
                <DialogHeader className="p-5 pb-3 border-b border-border-light">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-lg font-bold text-title">
                            {t("courseActions")}
                        </DialogTitle>
                    </div>
                </DialogHeader>

                <div className="p-2">
                    <Link
                        href={`${path}/my-courses/${courseId}`}
                        onClick={onClose}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-title hover:bg-gray-50 rounded-lg transition-colors"
                    >
                        <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center">
                            <Eye className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                            <p className="font-medium">{t("viewDetails")}</p>
                            <p className="text-xs text-description">{t("seeCourseInfo")}</p>
                        </div>
                    </Link>

                    <Link
                        href={`${path}/create-course?edit=${courseId}`}
                        onClick={onClose}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-title hover:bg-gray-50 rounded-lg transition-colors"
                    >
                        <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center">
                            <Pencil className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                            <p className="font-medium">{t("editCourse")}</p>
                            <p className="text-xs text-description">{t("updateContent")}</p>
                        </div>
                    </Link>

                    <button
                        onClick={handleDelete}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full cursor-pointer"
                    >
                        <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center">
                            <Trash2 className="w-4 h-4 text-red-600" />
                        </div>
                        <div className="flex-1 text-left">
                            <p className="font-medium">{t("deleteCourse")}</p>
                            <p className="text-xs text-red-400">{t("permanentlyRemove")}</p>
                        </div>
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CourseActionsModal;
