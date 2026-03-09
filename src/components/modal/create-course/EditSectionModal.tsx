import { useTranslations } from "next-intl";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Props = {
    open: boolean;
    onClose: () => void;
    editingSectionTitle: string;
    setEditingSectionTitle: (val: string) => void;
    onSave: () => void;
};

const EditSectionModal = ({ open, onClose, editingSectionTitle, setEditingSectionTitle, onSave }: Props) => {
    const t = useTranslations("InstructorCreateCourse");
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-lg font-bold text-title">{t("editSectionTitle")}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-2">
                    <div>
                        <label className="text-sm font-medium text-title mb-1.5 block">{t("section")}</label>
                        <input
                            value={editingSectionTitle}
                            onChange={(e) => setEditingSectionTitle(e.target.value)}
                            placeholder={t("sectionNamePlaceholder")}
                            className="w-full border border-border-light rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-main"
                        />
                    </div>
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 border border-border-light rounded-md text-sm font-medium text-title hover:bg-gray-50 transition-colors"
                        >
                            {t("cancel")}
                        </button>
                        <button
                            onClick={onSave}
                            className="px-4 py-2 bg-main text-white rounded-md text-sm font-medium hover:bg-main/90 transition-colors"
                        >
                            {t("saveChanges")}
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EditSectionModal;
