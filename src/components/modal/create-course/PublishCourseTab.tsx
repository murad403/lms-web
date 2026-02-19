"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Upload } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Props = {
    onPrev: () => void;
    onSubmit: () => void;
};

const PublishCourseTab = ({ onPrev, onSubmit }: Props) => {
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [videoPreview, setVideoPreview] = useState<string | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setVideoFile(file);
        const url = URL.createObjectURL(file);
        setVideoPreview(url);
    };

    const handleSubmitForReview = () => {
        // TODO: API call
        setShowSuccess(true);
    };

    return (
        <div className="space-y-6">
            {/* Header with Save buttons */}
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-title">Publish Course</h3>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        className="px-4 py-2 bg-main text-white rounded-md text-sm font-medium hover:bg-main/90 transition-colors"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        className="text-sm text-main font-medium hover:text-main/80"
                    >
                        Save & Preview
                    </button>
                </div>
            </div>

            <div className="border-b border-border-light" />

            {/* Video Preview Card */}
            {videoFile ? (
                <div className="flex gap-4 items-start">
                    <div className="w-40 h-24 bg-gray-100 rounded-md overflow-hidden shrink-0">
                        {videoPreview && (
                            <video
                                src={videoPreview}
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium text-green-600 uppercase">
                                FILE UPLOADED
                            </span>
                            <span className="text-xs text-description">• 1:55</span>
                        </div>
                        <p className="text-sm text-title mb-2">
                            {videoFile.name}
                        </p>
                        <label className="text-sm text-main font-medium hover:text-main/80 cursor-pointer">
                            Replace Video
                            <input
                                type="file"
                                accept="video/*"
                                onChange={handleVideoUpload}
                                className="hidden"
                            />
                        </label>
                    </div>
                </div>
            ) : (
                <div className="border-2 border-dashed border-border-light rounded-md p-8">
                    <div className="text-center">
                        <Upload className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                        <p className="text-sm text-description mb-3">
                            Upload your course introduction video
                        </p>
                        <label className="inline-flex items-center gap-2 px-4 py-2 bg-main text-white rounded-md text-sm font-medium hover:bg-main/90 transition-colors cursor-pointer">
                            <Upload className="w-4 h-4" />
                            Upload Video
                            <input
                                type="file"
                                accept="video/*"
                                onChange={handleVideoUpload}
                                className="hidden"
                            />
                        </label>
                    </div>
                </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-6 border-t border-border-light">
                <button
                    type="button"
                    onClick={onPrev}
                    className="px-5 py-2.5 border border-border-light rounded-md text-sm font-medium text-title hover:bg-gray-50 transition-colors"
                >
                    Prev Step
                </button>
                <button
                    type="button"
                    onClick={handleSubmitForReview}
                    className="px-5 py-2.5 bg-main text-white rounded-md text-sm font-medium hover:bg-main/90 transition-colors"
                >
                    Submit For Review
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
                            <button
                                onClick={() => setShowSuccess(false)}
                                className="px-4 py-2 border border-border-light rounded-md text-sm font-medium text-title hover:bg-gray-50 transition-colors"
                            >
                                Go back to profile
                            </button>
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
