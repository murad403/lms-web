import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Props = {
    open: boolean;
    onClose: () => void;
    editingLectureTitle: string;
    setEditingLectureTitle: (val: string) => void;
    onSave: () => void | Promise<void>;
    isSaving?: boolean;
};

const EditLectureModal = ({ open, onClose, editingLectureTitle, setEditingLectureTitle, onSave, isSaving = false }: Props) => {
    const t = useTranslations("InstructorCreateCourse");
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-lg font-bold text-title">{t("editLectureTitle")}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-2">
                    <div>
                        <label className="text-sm font-medium text-title mb-1.5 block">{t("lectureName")}</label>
                        <input
                            value={editingLectureTitle}
                            onChange={(e) => setEditingLectureTitle(e.target.value)}
                            placeholder={t("lectureNamePlaceholder")}
                            className="w-full border border-border-light rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-main"
                        />
                    </div>
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            disabled={isSaving}
                            className="px-4 py-2 border border-border-light rounded-md text-sm font-medium text-title hover:bg-gray-50 transition-colors"
                        >
                            {t("cancel")}
                        </button>
                        <button
                            onClick={onSave}
                            disabled={isSaving}
                            className="px-4 py-2 bg-main text-white rounded-md text-sm font-medium hover:bg-main/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                            {t("saveChanges")}
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EditLectureModal;
