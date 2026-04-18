import { StudentDashboardInvoice } from '@/redux/features/student/student.type';
import { FileDown } from 'lucide-react'
import { useTranslations } from 'next-intl';
import { Skeleton } from '@/components/ui/skeleton';

type RecentInvoicesProps = {
    invoices: StudentDashboardInvoice[];
    isLoading?: boolean;
};

const handleDownload = (invoice: StudentDashboardInvoice) => {
    import('jspdf').then(({ jsPDF }) => {
        const doc = new jsPDF();

        // Header background
        doc.setFillColor(86, 37, 232);
        doc.rect(0, 0, 210, 35, 'F');

        // Header text
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        doc.text('INVOICE', 14, 22);

        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.text(invoice.invoice_id, 196, 22, { align: 'right' });

        // Reset text color
        doc.setTextColor(30, 30, 30);

        // Invoice details section
        const startY = 50;
        const lineH = 10;

        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text('Course / Title', 14, startY);
        doc.setFont('helvetica', 'normal');
        doc.text(invoice.name, 14, startY + lineH);

        // Divider
        doc.setDrawColor(220, 220, 220);
        doc.line(14, startY + lineH + 5, 196, startY + lineH + 5);

        // Amount & Status row
        const detailY = startY + lineH + 16;
        doc.setFont('helvetica', 'bold');
        doc.text('Amount', 14, detailY);
        doc.text('Status', 110, detailY);

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(86, 37, 232);
        doc.text(`$${invoice.amount}`, 14, detailY + lineH);

        // Status badge
        doc.setFillColor(34, 197, 94);
        doc.roundedRect(108, detailY + lineH - 6, 28, 9, 2, 2, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        doc.text(invoice.status.toUpperCase(), 122, detailY + lineH, { align: 'center' });

        // Footer
        doc.setTextColor(160, 160, 160);
        doc.setFontSize(9);
        doc.text(`Generated on ${new Date().toLocaleDateString()}`, 14, 285);

        doc.save(`${invoice.invoice_id}.pdf`);
    });
};

const RecentInvoices = ({ invoices, isLoading = false }: RecentInvoicesProps) => {
    const t = useTranslations("Dashboard");

    if (isLoading) {
        return (
            <div className="rounded-md border border-border-light p-4 sm:p-5">
                <h3 className="text-base sm:text-lg font-bold text-title mb-4 border-b border-border-light pb-4">
                    {t("recentInvoices")}
                </h3>
                <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="flex items-center justify-between py-2">
                            <div className="min-w-0 flex-1 space-y-2">
                                <Skeleton className="h-5 w-40" />
                                <Skeleton className="h-4 w-52" />
                            </div>
                            <div className="flex items-center gap-2 shrink-0 ml-3">
                                <Skeleton className="h-7 w-16 rounded" />
                                <Skeleton className="h-6 w-6 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-md border border-border-light p-4 sm:p-5">
            <h3 className="text-base sm:text-lg font-bold text-title mb-4 border-b border-border-light pb-4">
                {t("recentInvoices")}
            </h3>
            <div className="space-y-3">
                {invoices.map((invoice) => (
                    <div
                        key={invoice.id}
                        className="flex items-center justify-between py-2"
                    >
                        <div className="min-w-0 flex-1">
                            <h4 className="text-base font-semibold text-title truncate">
                                {invoice.name}
                            </h4>
                            <p className="text-sm text-description">
                                {invoice.invoice_id} • {t("amount")} :{" "}
                                <span className=" text-[#5625E8]">${invoice.amount}</span>
                            </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 ml-3">
                            <span className="px-3 py-1 text-white bg-green-500 text-sm font-semibold rounded">
                                {t(invoice.status.toLowerCase() as "paid" | "pending" | "failed")}
                            </span>
                            <button
                                onClick={() => handleDownload(invoice)}
                                className="p-1 text-description hover:text-title transition-colors"
                            >
                                <FileDown className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RecentInvoices
