"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import SignatureCanvas from "react-signature-canvas";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
    useGetSignatureQuery,
    useUploadSignatureMutation,
} from "@/redux/features/instructor/instructor.api";
import { resolveImageUrl } from "@/utils/image";

type SignatureModalProps = {
    open: boolean;
    onClose: () => void;
};

const dataUrlToFile = (dataUrl: string, fileName: string) => {
    const [header, base64Data = ""] = dataUrl.split(",");
    const mimeMatch = header.match(/data:(.*?);base64/);
    const mimeType = mimeMatch?.[1] || "image/png";
    const binaryString = atob(base64Data);
    const bytes = new Uint8Array(binaryString.length);

    for (let index = 0; index < binaryString.length; index += 1) {
        bytes[index] = binaryString.charCodeAt(index);
    }

    return new File([bytes], fileName, { type: mimeType });
};

const SignaturePreviewSkeleton = () => (
    <div className="space-y-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-24 w-full rounded-lg" />
    </div>
);

const SignatureModal = ({ open, onClose }: SignatureModalProps) => {
    const signatureRef = useRef<SignatureCanvas | null>(null);
    const { data: signatureResponse, isLoading: isSignatureLoading } = useGetSignatureQuery(undefined, {
        skip: !open,
    });
    const [uploadSignature, { isLoading: isUploading }] = useUploadSignatureMutation();

    const currentSignature = signatureResponse?.data?.signature;
    const currentSignatureName = signatureResponse?.data?.name;

    useEffect(() => {
        if (!open) {
            signatureRef.current?.clear();
        }
    }, [open]);

    const handleClear = () => {
        signatureRef.current?.clear();
    };

    const handleSave = async () => {
        if (!signatureRef.current || signatureRef.current.isEmpty()) {
            toast.error("Please draw your signature before uploading.");
            return;
        }

        const dataUrl = signatureRef.current.toDataURL("image/png");
        const file = dataUrlToFile(dataUrl, "instructor-signature.png");
        const formData = new FormData();
        formData.append("signature", file);

        try {
            const response = await uploadSignature(formData).unwrap();
            toast.success(response.message?.message || "Signature updated successfully");
            onClose();
        } catch (error: unknown) {
            const message =
                typeof error === "object" &&
                    error !== null &&
                    "data" in error &&
                    typeof (error as { data?: { message?: string } }).data?.message === "string"
                    ? (error as { data?: { message?: string } }).data?.message
                    : "Failed to upload signature";

            toast.error(message);
        }
    };

    return (
        <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && onClose()}>
            <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl">Create Signature</DialogTitle>
                    <DialogDescription>
                        Draw your signature and upload it as an image. Your current saved signature appears below.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-5 pt-2">
                    <div className="space-y-3">
                        <div className="flex items-center justify-between gap-3">
                            <h3 className="text-sm font-semibold text-gray-900">Signature Pad</h3>
                            <p className="text-xs text-gray-500">Use your mouse or touchscreen to sign</p>
                        </div>

                        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-3 shadow-sm">
                            <div className="rounded-xl border border-gray-200 bg-gray-50">
                                <SignatureCanvas
                                    ref={signatureRef}
                                    canvasProps={{
                                        className: "h-56 w-full rounded-xl bg-white",
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Button type="button" variant="outline" onClick={handleClear} className="cursor-pointer">
                                Clear
                            </Button>
                            <Button
                                type="button"
                                onClick={handleSave}
                                disabled={isUploading}
                                className="bg-main hover:bg-main/90 cursor-pointer"
                            >
                                {isUploading ? "Uploading..." : "Upload Signature"}
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900">Previous Signature</h3>
                            <p className="text-xs text-gray-500">The latest signature stored for this instructor.</p>
                        </div>

                        {isSignatureLoading ? (
                            <SignaturePreviewSkeleton />
                        ) : currentSignature ? (
                            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 space-y-3">
                                <div className="flex items-center justify-between gap-3">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{currentSignatureName || "Saved signature"}</p>
                                    </div>
                                </div>
                                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white p-3">
                                    <Image
                                        src={resolveImageUrl(currentSignature)}
                                        alt="Instructor signature"
                                        width={600}
                                        height={160}
                                        unoptimized
                                        className="h-28 w-full object-contain"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm text-gray-500">
                                No previous signature found.
                            </div>
                        )}
                    </div>
                </div>

                <DialogFooter className="pt-2">
                    <Button type="button" variant="outline" onClick={onClose} className="cursor-pointer">
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default SignatureModal;
