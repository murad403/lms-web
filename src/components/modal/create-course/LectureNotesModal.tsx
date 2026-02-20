import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Props = {
    open: boolean;
    onClose: () => void;
    lectureNotes: string;
    setLectureNotes: (val: string) => void;
};

const LectureNotesModal = ({ open, onClose, lectureNotes, setLectureNotes }: Props) => {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-lg font-bold text-title">Add Lecture Notes</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-2">
                    <div>
                        <label className="text-sm font-medium text-title mb-1.5 block">Notes</label>
                        <textarea
                            value={lectureNotes}
                            onChange={(e) => setLectureNotes(e.target.value)}
                            rows={4}
                            placeholder="Write your lecture Notes here..."
                            className="w-full border border-border-light rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-main resize-none"
                        />
                    </div>
                    <div className="border border-dashed border-border-light rounded-md p-4 text-center">
                        <p className="text-sm font-medium text-title mb-2">Uploads Notes</p>
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
                            Add Notes
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default LectureNotesModal;
