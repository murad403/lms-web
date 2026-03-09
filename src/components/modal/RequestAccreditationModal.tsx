"use client";

import { useForm } from "react-hook-form";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    courseSelectOptions,
    certificateTypeOptions,
    organizationOptions,
} from "@/lib/instructor";
import { Send } from "lucide-react";
import { useTranslations } from "next-intl";

type Props = {
    open: boolean;
    onClose: () => void;
};

type FormValues = {
    course: string;
    organization: string;
    certificateType: string;
    notes: string;
};

const RequestAccreditationModal = ({ open, onClose }: Props) => {
    const { register, handleSubmit, reset } = useForm<FormValues>();
    const t = useTranslations("InstructorAccreditation");

    const onSubmit = (data: FormValues) => {
        console.log("Request Accreditation:", data);
        reset();
        onClose();
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle className="text-xl">{t("submitForAccreditation")}</DialogTitle>
                    <p className="text-base text-description">{t("chooseACourse")}</p>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
                    {/* Course Select */}
                    <div>
                        <label className="text-sm font-medium text-title mb-1.5 block">
                            {t("selectCourse")}
                        </label>
                        <select
                            {...register("course", { required: true })}
                            className="w-full border border-border-light rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-main bg-white"
                        >
                            <option value="">{t("chooseACourseOption")}</option>
                            {courseSelectOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Organization */}
                    <div>
                        <label className="text-sm font-medium text-title mb-1.5 block">
                            {t("accreditingOrganization")}
                        </label>
                        <select
                            {...register("organization", { required: true })}
                            className="w-full border border-border-light rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-main bg-white"
                        >
                            <option value="">{t("selectOrganization")}</option>
                            {organizationOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Certificate Type */}
                    <div>
                        <label className="text-sm font-medium text-title mb-1.5 block">
                            {t("certificateType")}
                        </label>
                        <select
                            {...register("certificateType", { required: true })}
                            className="w-full border border-border-light rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-main bg-white"
                        >
                            <option value="">{t("selectType")}</option>
                            {certificateTypeOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Additional Notes */}
                    <div>
                        <label className="text-sm font-medium text-title mb-1.5 block">
                            {t("additionalNotes")}
                        </label>
                        <textarea
                            {...register("notes")}
                            rows={3}
                            placeholder={t("additionalNotesPlaceholder")}
                            className="w-full border border-border-light rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-main resize-none"
                        />
                    </div>

                    {/* Actions */}
                    
                     
                        <button
                            type="submit"
                            className="w-full py-3 bg-main text-white text-sm font-medium hover:bg-main/90 transition-colors"
                        >
                            {t("submit")} <Send className="w-4 h-4 ml-2 inline" />
                        </button>
                    
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default RequestAccreditationModal;
