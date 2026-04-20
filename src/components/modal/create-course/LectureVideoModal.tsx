import { useTranslations } from "next-intl";
import { Loader2, Upload } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Props = {
    open: boolean;
    onClose: () => void;
    uploadedVideo: { name: string; preview: string; file?: File } | null;
    setUploadedVideo: (val: { name: string; preview: string; file?: File } | null) => void;
    onSave: () => void | Promise<void>;
    isSaving?: boolean;
};

const LectureVideoModal = ({ open, onClose, uploadedVideo, setUploadedVideo, onSave, isSaving = false }: Props) => {
    const t = useTranslations("InstructorCreateCourse");
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-lg font-bold text-title">{t("lectureVideoTitle")}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-2">
                    {uploadedVideo ? (
                        <div className="flex gap-4 items-start">
                            <div className="w-32 h-20 bg-gray-100 rounded-md overflow-hidden">
                                <video src={uploadedVideo.preview} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-medium text-green-600 uppercase">{t("fileUploaded")}</span>
                                    <span className="text-xs text-description">• 1:55</span>
                                </div>
                                <p className="text-sm text-title truncate">{uploadedVideo.name}</p>
                                <button
                                    onClick={() => setUploadedVideo(null)}
                                    className="text-sm text-main mt-2"
                                >
                                    {t("replaceVideo")}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="border-2 border-dashed border-border-light rounded-md p-6 text-center">
                            <p className="text-sm text-description mb-2">{t("uploadFiles")}</p>
                            <label className="inline-flex items-center gap-2 px-4 py-2 text-main text-sm font-medium hover:text-main/80 cursor-pointer">
                                <Upload className="w-4 h-4" />
                                {t("uploadFile")}
                                <input
                                    type="file"
                                    accept="video/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setUploadedVideo({
                                                name: file.name,
                                                preview: URL.createObjectURL(file),
                                                file,
                                            });
                                        }
                                    }}
                                    className="hidden"
                                />
                            </label>
                            <p className="text-xs text-description mt-2">
                                {t("videoNote")}
                            </p>
                        </div>
                    )}
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
                            disabled={isSaving || !uploadedVideo?.file}
                            className="px-4 py-2 bg-main text-white rounded-md text-sm font-medium hover:bg-main/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                            {t("uploadVideo")}
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default LectureVideoModal;
