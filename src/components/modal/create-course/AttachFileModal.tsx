import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Props = {
    open: boolean;
    onClose: () => void;
    attachmentFile: File | null;
    setAttachmentFile: (file: File | null) => void;
    onSave: () => void | Promise<void>;
    isSaving?: boolean;
};

const AttachFileModal = ({ open, onClose, attachmentFile, setAttachmentFile, onSave, isSaving = false }: Props) => {
    const t = useTranslations("InstructorCreateCourse");
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-lg font-bold text-title">{t("attachFileTitle")}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-2">
                    <div className="border border-dashed border-border-light rounded-md p-6 text-center">
                        <p className="text-sm font-medium text-title mb-2">{t("attachFileTitle")}</p>
                        <label className="text-sm text-description cursor-pointer">
                            {t("dragAndDrop")} <span className="text-main">{t("browseFile")}</span>
                            <input
                                type="file"
                                className="hidden"
                                onChange={(e) => setAttachmentFile(e.target.files?.[0] || null)}
                            />
                        </label>
                        {attachmentFile && (
                            <p className="text-xs text-description mt-2">{attachmentFile.name}</p>
                        )}
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
                            {t("saveAndUpload")}
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AttachFileModal;
