import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Props = {
    open: boolean;
    onClose: () => void;
    lectureDescription: string;
    setLectureDescription: (val: string) => void;
};

const LectureDescriptionModal = ({ open, onClose, lectureDescription, setLectureDescription }: Props) => {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-lg font-bold text-title">Add Lecture Description</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-2">
                    <div className="border-2 border-dashed border-main rounded-md p-4">
                        <textarea
                            value={lectureDescription}
                            onChange={(e) => setLectureDescription(e.target.value)}
                            rows={4}
                            placeholder="Write your lecture description here..."
                            className="w-full text-sm focus:outline-none resize-none"
                        />
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
                            Add Description
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default LectureDescriptionModal;
