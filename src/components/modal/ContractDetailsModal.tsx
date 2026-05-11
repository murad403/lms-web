"use client";
import { Download, X, User, Loader2 } from "lucide-react";
import jsPDF from "jspdf";
import { useContractDetailsQuery } from "@/redux/features/organization/organization.api";
import Image from "next/image";
import { resolveImageUrl } from "@/utils/image";

const statusColors: Record<string, string> = {
    ongoing: "bg-green-50 text-green-700",
    Pending: "bg-yellow-50 text-yellow-700",
    Expired: "bg-red-50 text-red-700",
};

const statusLabel: Record<string, string> = {
    ongoing: "Signed",
    Pending: "Pending",
    Expired: "Expired",
};

type Props = {
    show: boolean;
    contract: any | null;
    onClose: () => void;
};

const ContractDetailsModal = ({ show, contract, onClose }: Props) => {
    const { data: detailsData, isLoading } = useContractDetailsQuery(contract?.id || 0, {
        skip: !show || !contract?.id,
    });

    if (!show || !contract) return null;

    const details = detailsData?.data;

    const handleDownloadPDF = () => {
        if (!details) return;
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();

        // Title
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.text("Contract Details", 14, 20);

        // Course
        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(100);
        doc.text(details.course_name, 14, 28);

        // Divider
        doc.setDrawColor(220);
        doc.line(14, 33, pageWidth - 14, 33);

        // Info Grid
        doc.setTextColor(100);
        doc.setFontSize(9);
        doc.text("Instructor", 14, 42);
        doc.text("Status", pageWidth / 2, 42);
        doc.setTextColor(30);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.text(details.instructor_name, 14, 50);
        doc.text(statusLabel[details.status] || details.status, pageWidth / 2, 50);

        doc.setFont("helvetica", "normal");
        doc.setTextColor(100);
        doc.setFontSize(9);
        doc.text("Revenue Share", 14, 62);
        doc.text("Signed Date", pageWidth / 2, 62);
        doc.setTextColor(30);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.text(`${details.revenue_share}%`, 14, 70);
        doc.text(new Date(details.created_at).toLocaleDateString(), pageWidth / 2, 70);

        doc.setFont("helvetica", "normal");
        doc.setTextColor(100);
        doc.setFontSize(9);
        doc.text("Expiry Date", 14, 82);
        doc.setTextColor(30);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.text(details.expiry_date, 14, 90);

        // Divider
        doc.setDrawColor(220);
        doc.line(14, 96, pageWidth - 14, 96);

        // Terms
        doc.setTextColor(30);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(13);
        doc.text("Terms & Conditions", 14, 106);

        doc.setDrawColor(220);
        doc.setFillColor(255, 255, 255);
        doc.roundedRect(14, 111, pageWidth - 28, 60, 2, 2, "S");

        doc.setFont("helvetica", "normal");
        doc.setTextColor(80);
        doc.setFontSize(9);
        const terms = [
            `This agreement is entered into between the Organization and ${details.instructor_name}`,
            `("Instructor") for the creation and delivery of educational content.`,
            "",
            `1. Revenue Distribution: The Instructor shall receive ${details.revenue_share}% of all net`,
            `   revenue generated from course sales.`,
            "",
            `2. Contract Duration: This agreement is valid until ${details.expiry_date} and may`,
            `   be renewed upon mutual agreement.`,
            "",
            `3. Early Termination: Requires 30 days written notice from either party.`,
        ];
        terms.forEach((line, i) => {
            doc.text(line, 20, 119 + i * 5.2);
        });

        doc.save(`contract-${details.id}.pdf`);
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl relative">
                {/* Header */}
                <div className="flex items-start justify-between p-6 border-b border-border-light sticky top-0 bg-white z-10">
                    <div>
                        <h2 className="text-lg font-bold text-title">Contract Details</h2>
                        {details && <p className="text-sm text-description mt-0.5">{details.course_name}</p>}
                    </div>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full cursor-pointer">
                        <X className="w-5 h-5 text-description" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <Loader2 className="w-8 h-8 text-main animate-spin mb-2" />
                            <p className="text-sm text-description">Loading contract details...</p>
                        </div>
                    ) : details ? (
                        <>
                            {/* Instructor Info */}
                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-white border border-border-light flex items-center justify-center shrink-0">
                                    {details.instructor_avatar ? (
                                        <Image src={resolveImageUrl(details.instructor_avatar)} alt={details.instructor_name} fill className="object-cover" />
                                    ) : (
                                        <User className="w-8 h-8 text-description" />
                                    )}
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-title">{details.instructor_name}</p>
                                    <p className="text-sm text-description">{details.organization_name}</p>
                                </div>
                            </div>

                            {/* Info Grid */}
                            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                                <div>
                                    <p className="text-xs text-description mb-1">Status</p>
                                    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${statusColors[details.status] || "bg-gray-100 text-gray-700"}`}>
                                        {statusLabel[details.status] || details.status}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-xs text-description mb-1">Revenue Share</p>
                                    <p className="text-sm font-bold text-title">{details.revenue_share}%</p>
                                </div>
                                <div>
                                    <p className="text-xs text-description mb-1">Created At</p>
                                    <p className="text-sm font-bold text-title">{new Date(details.created_at).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-description mb-1">Expiry Date</p>
                                    <p className="text-sm font-bold text-title">{details.expiry_date}</p>
                                </div>
                            </div>

                            {/* Terms & Conditions */}
                            <div>
                                <h4 className="text-sm font-bold text-title mb-3">Terms & Conditions</h4>
                                <div className="border border-border-light rounded-lg p-4 space-y-3 text-sm text-description leading-relaxed">
                                    <p>
                                        This agreement is entered into between the Organization and {details.instructor_name}&nbsp;
                                        (&quot;Instructor&quot;) for the creation and delivery of educational content...
                                    </p>
                                    <p>
                                        1. Revenue Distribution: The Instructor shall receive {details.revenue_share}% of all net revenue generated
                                        from course sales...
                                    </p>
                                    <p>
                                        2. Content Ownership: All course materials created under this agreement...
                                    </p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 justify-end pt-1 sticky bottom-0 bg-white py-2 mt-auto border-t border-border-light">
                                <button
                                    onClick={onClose}
                                    className="px-5 py-2.5 text-sm border border-border-light text-description hover:bg-gray-50 rounded cursor-pointer"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={handleDownloadPDF}
                                    className="px-5 py-2.5 text-sm bg-main text-white font-medium hover:bg-main/90 flex items-center gap-2 rounded cursor-pointer"
                                >
                                    <Download className="w-4 h-4" /> Download PDF
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-sm text-description">Failed to load contract details.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContractDetailsModal;
