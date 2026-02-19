"use client";
import { Eye, Pencil, Award, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Link } from "@/i18n/navigation";

type CourseActionsModalProps = {
    isOpen: boolean;
    onClose: () => void;
    courseId: number;
    onDelete: (id: number) => void;
    path: string;
};

const CourseActionsModal = ({ isOpen, onClose, courseId, onDelete, path }: CourseActionsModalProps) => {
    const handleDelete = () => {
        onDelete(courseId);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-xs p-0 gap-0">
                <DialogHeader className="p-5 pb-3 border-b border-border-light">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-lg font-bold text-title">
                            Course Actions
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
                            <p className="font-medium">View Details</p>
                            <p className="text-xs text-description">See course information</p>
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
                            <p className="font-medium">Edit Course</p>
                            <p className="text-xs text-description">Update course content</p>
                        </div>
                    </Link>

                    <Link
                        href={`${path}/accreditation`}
                        onClick={onClose}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-title hover:bg-gray-50 rounded-lg transition-colors"
                    >
                        <div className="w-9 h-9 rounded-full bg-purple-50 flex items-center justify-center">
                            <Award className="w-4 h-4 text-purple-600" />
                        </div>
                        <div className="flex-1">
                            <p className="font-medium">Request Accreditation</p>
                            <p className="text-xs text-description">Get official certification</p>
                        </div>
                    </Link>

                    <button
                        onClick={handleDelete}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full"
                    >
                        <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center">
                            <Trash2 className="w-4 h-4 text-red-600" />
                        </div>
                        <div className="flex-1 text-left">
                            <p className="font-medium">Delete Course</p>
                            <p className="text-xs text-red-400">Permanently remove course</p>
                        </div>
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CourseActionsModal;
