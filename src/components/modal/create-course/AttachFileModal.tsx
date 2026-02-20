import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Props = {
    open: boolean;
    onClose: () => void;
};

const AttachFileModal = ({ open, onClose }: Props) => {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-lg font-bold text-title">Attach File</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-2">
                    <div className="border border-dashed border-border-light rounded-md p-6 text-center">
                        <p className="text-sm font-medium text-title mb-2">Attach File</p>
                        <label className="text-sm text-description cursor-pointer">
                            Drag and drop a file or <span className="text-main">Browse file</span>
                            <input type="file" className="hidden" />
                        </label>
                    </div>
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 border border-border-light rounded-md text-sm font-medium text-title hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-main text-white rounded-md text-sm font-medium hover:bg-main/90 transition-colors"
                        >
                            Save & upload
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AttachFileModal;
