"use client";
import { Download, DollarSign, X } from "lucide-react";
import { TContract } from "@/lib/organization";
import jsPDF from "jspdf";

const statusColors: Record<string, string> = {
    Active: "bg-green-50 text-green-700",
    Pending: "bg-yellow-50 text-yellow-700",
    Expired: "bg-red-50 text-red-700",
};

const statusLabel: Record<string, string> = {
    Active: "Signed",
    Pending: "Pending",
    Expired: "Expired",
};

type Props = {
    show: boolean;
    contract: TContract | null;
    onClose: () => void;
};

const ContractDetailsModal = ({ show, contract, onClose }: Props) => {
    if (!show || !contract) return null;

    const totalRevenue = 12450 * (contract.revenueShare / 10);
    const instructorEarnings = totalRevenue * (contract.revenueShare / 100);

    const handleDownloadPDF = () => {
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
        doc.text(contract.course, 14, 28);

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
        doc.text(contract.instructor, 14, 50);
        doc.text(statusLabel[contract.status] || contract.status, pageWidth / 2, 50);

        doc.setFont("helvetica", "normal");
        doc.setTextColor(100);
        doc.setFontSize(9);
        doc.text("Revenue Share", 14, 62);
        doc.text("Signed Date", pageWidth / 2, 62);
        doc.setTextColor(30);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.text(`${contract.revenueShare}%`, 14, 70);
        doc.text(contract.signedDate, pageWidth / 2, 70);

        doc.setFont("helvetica", "normal");
        doc.setTextColor(100);
        doc.setFontSize(9);
        doc.text("Expiry Date", 14, 82);
        doc.setTextColor(30);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.text(contract.expiry, 14, 90);

        // Divider
        doc.setDrawColor(220);
        doc.line(14, 96, pageWidth - 14, 96);

        // Revenue Summary
        doc.setTextColor(30);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(13);
        doc.text("Revenue Summary", 14, 106);

        // Cards
        doc.setDrawColor(220);
        doc.setFillColor(249, 250, 251);
        doc.roundedRect(14, 112, (pageWidth - 34) / 2, 30, 2, 2, "FD");
        doc.roundedRect(14 + (pageWidth - 34) / 2 + 6, 112, (pageWidth - 34) / 2, 30, 2, 2, "FD");

        doc.setTextColor(100);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.text("Total Revenue", 20, 120);
        doc.text("Instructor Earnings", 20 + (pageWidth - 34) / 2 + 6, 120);

        doc.setTextColor(30);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text(`$${totalRevenue.toLocaleString()}`, 20, 133);
        doc.setTextColor(22, 163, 74);
        doc.text(`$${instructorEarnings.toLocaleString()}`, 20 + (pageWidth - 34) / 2 + 6, 133);

        // Terms
        doc.setTextColor(30);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(13);
        doc.text("Terms & Conditions", 14, 154);

        doc.setDrawColor(220);
        doc.setFillColor(255, 255, 255);
        doc.roundedRect(14, 159, pageWidth - 28, 60, 2, 2, "S");

        doc.setFont("helvetica", "normal");
        doc.setTextColor(80);
        doc.setFontSize(9);
        const terms = [
            `This agreement is entered into between the Organization and ${contract.instructor}`,
            `("Instructor") for the creation and delivery of educational content.`,
            "",
            `1. Revenue Distribution: The Instructor shall receive ${contract.revenueShare}% of all net`,
            `   revenue generated from course sales.`,
            "",
            `2. Contract Duration: This agreement is valid until ${contract.expiry} and may`,
            `   be renewed upon mutual agreement.`,
            "",
            `3. Early Termination: Requires 30 days written notice from either party.`,
        ];
        terms.forEach((line, i) => {
            doc.text(line, 20, 167 + i * 5.2);
        });

        doc.save(`contract-${contract.id}.pdf`);
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl">
                {/* Header */}
                <div className="flex items-start justify-between p-6 border-b border-border-light">
                    <div>
                        <h2 className="text-lg font-bold text-title">Contract Details</h2>
                        <p className="text-sm text-description mt-0.5">{contract.course}</p>
                    </div>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
                        <X className="w-5 h-5 text-description" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Info Grid */}
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                        <div>
                            <p className="text-xs text-description mb-1">Instructor</p>
                            <p className="text-sm font-bold text-title">{contract.instructor}</p>
                        </div>
                        <div>
                            <p className="text-xs text-description mb-1">Status</p>
                            <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${statusColors[contract.status]}`}>
                                {statusLabel[contract.status] || contract.status}
                            </span>
                        </div>
                        <div>
                            <p className="text-xs text-description mb-1">Revenue Share</p>
                            <p className="text-sm font-bold text-title">{contract.revenueShare}%</p>
                        </div>
                        <div>
                            <p className="text-xs text-description mb-1">Signed Date</p>
                            <p className="text-sm font-bold text-title">{contract.signedDate}</p>
                        </div>
                        <div>
                            <p className="text-xs text-description mb-1">Expiry Date</p>
                            <p className="text-sm font-bold text-title">{contract.expiry}</p>
                        </div>
                    </div>

                    {/* Revenue Summary */}
                    <div>
                        <h4 className="text-sm font-bold text-title mb-3">Revenue Summary</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="border border-border-light rounded-lg p-4">
                                <DollarSign className="w-4 h-4 text-description mb-2" />
                                <p className="text-xl font-bold text-title">${totalRevenue.toLocaleString()}</p>
                                <p className="text-xs text-description mt-1">Total Revenue</p>
                            </div>
                            <div className="border border-border-light rounded-lg p-4">
                                <DollarSign className="w-4 h-4 text-main mb-2" />
                                <p className="text-xl font-bold text-main">${instructorEarnings.toLocaleString()}</p>
                                <p className="text-xs text-description mt-1">Instructor Earnings</p>
                            </div>
                        </div>
                    </div>

                    {/* Terms & Conditions */}
                    <div>
                        <h4 className="text-sm font-bold text-title mb-3">Terms & Conditions</h4>
                        <div className="border border-border-light rounded-lg p-4 space-y-3 text-sm text-description leading-relaxed">
                            <p>
                                This agreement is entered into between the Organization and {contract.instructor}&nbsp;
                                (&quot;Instructor&quot;) for the creation and delivery of educational content...
                            </p>
                            <p>
                                1. Revenue Distribution: The Instructor shall receive {contract.revenueShare}% of all net revenue generated
                                from course sales...
                            </p>
                            <p>
                                2. Content Ownership: All course materials created under this agreement...
                            </p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 justify-end pt-1">
                        <button
                            onClick={onClose}
                            className="px-5 py-2.5 text-sm border border-border-light text-description hover:bg-gray-50 rounded"
                        >
                            Close
                        </button>
                        <button
                            onClick={handleDownloadPDF}
                            className="px-5 py-2.5 text-sm bg-main text-white font-medium hover:bg-main/90 flex items-center gap-2 rounded"
                        >
                            <Download className="w-4 h-4" /> Download PDF
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContractDetailsModal;

