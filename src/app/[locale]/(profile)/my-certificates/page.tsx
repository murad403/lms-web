"use client";
import { useState } from "react";
import { Eye, Download } from "lucide-react";
import Pagination from "@/components/reusable/Pagination";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import jsPDF from "jspdf";
import { useTranslations } from "next-intl";
import { useCertificatesQuery } from "@/redux/features/student/student.api";
import { Skeleton } from "@/components/ui/skeleton";

type CertificateViewItem = {
    id: string;
    courseName: string;
    studentName: string;
    date: string;
    marks: number;
    outOf: number;
};

const MyCertificatesPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [viewCert, setViewCert] = useState<string | null>(null);
    const t = useTranslations("CertificatesPage");
    const { data: certificatesData, isLoading: isCertificatesLoading } = useCertificatesQuery({
        page: currentPage,
    });

    const certificates: CertificateViewItem[] = (certificatesData?.data || []).map((cert) => ({
        id: cert.id,
        courseName: cert.course_name,
        studentName: cert.student_name,
        date: cert.date,
        marks: cert.marks,
        outOf: cert.out_of,
    }));

    const totalPages = certificatesData?.total_pages || 1;
    const paginated = certificates;

    const selectedCert = certificates.find((c) => c.id === viewCert);

    // PDF Download Function
    const handleDownloadCertificate = (cert: CertificateViewItem) => {
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        // Background color
        pdf.setFillColor(255, 255, 255);
        pdf.rect(0, 0, pageWidth, pageHeight, 'F');

        // Border
        pdf.setDrawColor(37, 99, 235); // main color
        pdf.setLineWidth(2);
        pdf.rect(10, 10, pageWidth - 20, pageHeight - 20);

        // Inner border
        pdf.setLineWidth(0.5);
        pdf.rect(15, 15, pageWidth - 30, pageHeight - 30);

        // Title
        pdf.setFontSize(32);
        pdf.setTextColor(37, 99, 235); // main color
        pdf.setFont('helvetica', 'bold');
        pdf.text('Certificate of Completion', pageWidth / 2, 40, { align: 'center' });

        // Decorative line
        pdf.setLineWidth(0.5);
        pdf.setDrawColor(37, 99, 235);
        pdf.line(pageWidth / 2 - 40, 45, pageWidth / 2 + 40, 45);

        // "This certifies that"
        pdf.setFontSize(14);
        pdf.setTextColor(100, 100, 100);
        pdf.setFont('helvetica', 'normal');
        pdf.text('This certifies that', pageWidth / 2, 60, { align: 'center' });

        // Student name
        pdf.setFontSize(24);
        pdf.setTextColor(0, 0, 0);
        pdf.setFont('helvetica', 'bold');
        pdf.text(cert.studentName, pageWidth / 2, 75, { align: 'center' });

        // "has successfully completed"
        pdf.setFontSize(14);
        pdf.setTextColor(100, 100, 100);
        pdf.setFont('helvetica', 'normal');
        pdf.text('has successfully completed the course', pageWidth / 2, 90, { align: 'center' });

        // Course name
        pdf.setFontSize(20);
        pdf.setTextColor(37, 99, 235);
        pdf.setFont('helvetica', 'bold');
        pdf.text(cert.courseName, pageWidth / 2, 105, { align: 'center' });

        // Score and date
        pdf.setFontSize(12);
        pdf.setTextColor(100, 100, 100);
        pdf.setFont('helvetica', 'normal');
        pdf.text(
            `Score: ${cert.marks}/${cert.outOf} • Date: ${cert.date}`,
            pageWidth / 2,
            120,
            { align: 'center' }
        );

        // Certificate ID
        pdf.setFontSize(10);
        pdf.setTextColor(150, 150, 150);
        pdf.text(`Certificate ID: ${cert.id}`, pageWidth / 2, 135, { align: 'center' });

        // Footer signature area
        pdf.setLineWidth(0.3);
        pdf.setDrawColor(100, 100, 100);
        
        // Left signature line
        pdf.line(40, 160, 90, 160);
        pdf.setFontSize(10);
        pdf.setTextColor(100, 100, 100);
        pdf.text('Instructor Signature', 65, 167, { align: 'center' });

        // Right signature line
        pdf.line(pageWidth - 90, 160, pageWidth - 40, 160);
        pdf.text('Director Signature', pageWidth - 65, 167, { align: 'center' });

        // Save PDF
        pdf.save(`Certificate_${cert.courseName.replace(/\s+/g, '_')}_${cert.id}.pdf`);
    };

    return (
        <div>
            <h2 className="text-lg sm:text-xl font-bold text-title mb-6">
                {t("title")}
            </h2>

            <div className="bg-white rounded-md border border-border-light overflow-hidden">
                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-200 bg-gray-50">
                                <th className="text-left py-3 px-4 font-semibold text-main text-base">
                                    {t("id")}
                                </th>
                                <th className="text-left py-3 px-4 font-semibold text-main text-base">
                                    {t("courseName")}
                                </th>
                                <th className="text-left py-3 px-4 font-semibold text-main text-base">
                                    {t("date")}
                                </th>
                                <th className="text-left py-3 px-4 font-semibold text-main text-base">
                                    {t("marks")}
                                </th>
                                <th className="text-left py-3 px-4 font-semibold text-main text-base">
                                    {t("outOf")}
                                </th>
                                <th className="text-right py-3 px-4 font-semibold text-main text-base">
                                    {t("actions")}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {isCertificatesLoading && (
                                Array.from({ length: 4 }).map((_, index) => (
                                    <tr key={`loading-${index}`} className="border-b border-gray-50">
                                        <td className="py-4 px-4"><Skeleton className="h-4 w-20" /></td>
                                        <td className="py-4 px-4"><Skeleton className="h-4 w-44" /></td>
                                        <td className="py-4 px-4"><Skeleton className="h-4 w-24" /></td>
                                        <td className="py-4 px-4"><Skeleton className="h-4 w-8" /></td>
                                        <td className="py-4 px-4"><Skeleton className="h-4 w-8" /></td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <Skeleton className="h-7 w-7" />
                                                <Skeleton className="h-7 w-7" />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}

                            {!isCertificatesLoading && paginated.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="py-10 px-4 text-center text-sm text-description">
                                        No certificates found.
                                    </td>
                                </tr>
                            )}

                            {paginated.map((cert) => (
                                <tr key={cert.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                                    <td className="py-4 px-4 text-sm text-description">{cert.id}</td>
                                    <td className="py-4 px-4 text-sm sm:text-sm font-medium text-title">
                                        {cert.courseName}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-description">{cert.date}</td>
                                    <td className="py-4 px-4 text-sm text-description">{cert.marks}</td>
                                    <td className="py-4 px-4 text-sm text-description">{cert.outOf}</td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => setViewCert(cert.id)}
                                                className="p-1.5 text-description hover:text-main hover:bg-blue-50 rounded transition-colors"
                                                title={t("viewCertificate")}
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDownloadCertificate(cert)}
                                                className="p-1.5 text-description hover:text-main hover:bg-blue-50 rounded transition-colors"
                                                title={t("downloadCertificate")}
                                            >
                                                <Download className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />

            {/* View Certificate Dialog */}
            <Dialog open={!!viewCert} onOpenChange={() => setViewCert(null)}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-bold text-title">
                            {t("certificatePreview")}
                        </DialogTitle>
                    </DialogHeader>
                    {selectedCert && (
                        <div className="border border-border-light rounded-lg p-6 text-center space-y-4">
                            <div className="w-16 h-16 mx-auto bg-main/10 rounded-full flex items-center justify-center">
                                <svg
                                    className="w-8 h-8 text-main"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-title">
                                {t("certificateOfCompletion")}
                            </h3>
                            <p className="text-sm text-description">
                                {t("certifiesUserCompleted")}
                            </p>
                            <p className="text-base font-bold text-main">
                                {selectedCert.courseName}
                            </p>
                            <p className="text-sm text-description">
                                {t("score")}: {selectedCert.marks}/{selectedCert.outOf} • {t("date")}:{" "}
                                {selectedCert.date}
                            </p>
                            <button 
                                onClick={() => handleDownloadCertificate(selectedCert)}
                                className="mt-4 px-6 py-2 bg-main text-white rounded-md text-sm font-semibold hover:bg-main/90 transition-colors"
                            >
                                {t("downloadPDF")}
                            </button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default MyCertificatesPage;