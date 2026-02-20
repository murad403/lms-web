import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Props = {
    open: boolean;
    onClose: () => void;
    editingSectionTitle: string;
    setEditingSectionTitle: (val: string) => void;
    onSave: () => void;
};

const EditSectionModal = ({ open, onClose, editingSectionTitle, setEditingSectionTitle, onSave }: Props) => {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-lg font-bold text-title">Edit Section Name</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-2">
                    <div>
                        <label className="text-sm font-medium text-title mb-1.5 block">Section</label>
                        <input
                            value={editingSectionTitle}
                            onChange={(e) => setEditingSectionTitle(e.target.value)}
                            placeholder="Write your section name here..."
                            className="w-full border border-border-light rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-main"
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
                            onClick={onSave}
                            className="px-4 py-2 bg-main text-white rounded-md text-sm font-medium hover:bg-main/90 transition-colors"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EditSectionModal;
