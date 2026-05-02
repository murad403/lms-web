"use client";
import { Eye, Pencil } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type CourseActionsModalProps = {
    isOpen: boolean;
    onClose: () => void;
    courseId: number;
    path: string;
};

const CourseActionsModal = ({ isOpen, onClose, courseId, path }: CourseActionsModalProps) => {
    const t = useTranslations("InstructorCourseActions");



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
                        href={`/instructor/edit-course/`}
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
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CourseActionsModal;
