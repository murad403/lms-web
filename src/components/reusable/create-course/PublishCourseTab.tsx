"use client";
import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Link } from "@/i18n/navigation";


type Props = {
    onPrev: () => void;
    onSubmit: () => Promise<boolean>;
};

const PublishCourseTab = ({ onPrev, onSubmit }: Props) => {

    const [showSuccess, setShowSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmitForReview = async () => {
        setIsSubmitting(true);
        try {
            const success = await onSubmit();
            if (success) {
                setShowSuccess(true);
            }
        } catch (error) {
            console.error("Submission failed:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header with Save buttons */}

            <h3 className="text-xl font-bold text-title">Publish Course</h3>

            <div className="border-b border-border-light" />

            {/* Video Preview Card */}
            <div className="flex flex-col sm:flex-row gap-4 items-start">
                <div className="w-full sm:w-40 h-40 sm:h-24 bg-gray-100 rounded-md overflow-hidden shrink-0">
                    <video src="/videos/video.mp4" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-green-600 uppercase">FILE UPLOADED</span>
                        <span className="text-xs text-description">• 1:55</span>
                    </div>
                    <p className="text-sm text-title leading-relaxed">
                        Conduct-ux-research - 01 - Introduction to Course 4 Conduct UX Research and Test Early Concepts.mp4
                    </p>
                    <button className="text-sm text-main mt-2 hover:text-main/80 transition-colors">
                        Replace Video
                    </button>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-6 border-t border-border-light">
                <button
                    type="button"
                    onClick={onPrev}
                    className="px-5 py-3 border border-border-light rounded-md text-sm font-medium text-title hover:bg-gray-50 transition-colors"
                >
                    Prev Step
                </button>
                <button
                    type="button"
                    onClick={handleSubmitForReview}
                    disabled={isSubmitting}
                    className="px-5 py-3 bg-main text-white rounded-md text-sm font-medium hover:bg-main/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                    {isSubmitting ? "Submitting..." : "Submit For Review"}
                </button>
            </div>

            {/* Success Modal */}
            <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
                <DialogContent className="sm:max-w-md text-center">
                    <div className="flex flex-col items-center py-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <Check className="w-8 h-8 text-green-600" />
                        </div>
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold text-title text-center">
                                Course Published!
                            </DialogTitle>
                        </DialogHeader>
                        <p className="text-sm text-description mt-2">
                            your Course has been published successfully.
                        </p>
                        <div className="flex items-center gap-3 mt-6">
                            <Link href={"/instructor/profile"}
                                onClick={() => setShowSuccess(false)}
                                className="px-4 py-2 border border-border-light rounded-md text-sm font-medium text-title hover:bg-gray-50 transition-colors"
                            >
                                Go back to profile
                            </Link>
                            <button
                                onClick={() => setShowSuccess(false)}
                                className="px-4 py-2 bg-main text-white rounded-md text-sm font-medium hover:bg-main/90 transition-colors"
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PublishCourseTab;
