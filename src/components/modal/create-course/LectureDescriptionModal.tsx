import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Props = {
    open: boolean;
    onClose: () => void;
    lectureDescription: string;
    setLectureDescription: (val: string) => void;
    onSave: () => void | Promise<void>;
    isSaving?: boolean;
};

const LectureDescriptionModal = ({ open, onClose, lectureDescription, setLectureDescription, onSave, isSaving = false }: Props) => {
    const t = useTranslations("InstructorCreateCourse");
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-lg font-bold text-title">{t("addLectureDescTitle")}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-2">
                    <div className="border-2 border-dashed border-main rounded-md p-4">
                        <textarea
                            value={lectureDescription}
                            onChange={(e) => setLectureDescription(e.target.value)}
                            rows={4}
                            placeholder={t("lectureDescPlaceholder")}
                            className="w-full text-sm focus:outline-none resize-none"
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
                            {t("addDescription")}
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default LectureDescriptionModal;
