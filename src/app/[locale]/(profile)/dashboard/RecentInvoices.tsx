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

        // Colors
        const primaryColor = [86, 37, 232];
        const darkColor = [31, 41, 55];
        const greyColor = [107, 114, 128];
        const lightGreyColor = [243, 244, 246];

        // Margins
        const marginX = 20;

        // --- HEADER ---
        // Brand Title
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        doc.text('LEARN HUB', marginX, 25);
        
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(greyColor[0], greyColor[1], greyColor[2]);
        doc.text('Online Education Platform', marginX, 30);

        // Invoice title
        doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
        doc.setFontSize(24);
        doc.setFont('helvetica', 'bold');
        doc.text('INVOICE', 190, 25, { align: 'right' });

        // Invoice ID
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(greyColor[0], greyColor[1], greyColor[2]);
        doc.text(invoice.invoice_id, 190, 30, { align: 'right' });

        // Divider
        doc.setDrawColor(229, 231, 235); // Gray 200
        doc.setLineWidth(0.5);
        doc.line(marginX, 38, 190, 38);

        // --- BILLING / INFO GRID ---
        const startY = 48;
        
        // Billed To (Left)
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(greyColor[0], greyColor[1], greyColor[2]);
        doc.text('BILLED TO:', marginX, startY);

        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
        doc.text(invoice.name, marginX, startY + 6);
        
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(greyColor[0], greyColor[1], greyColor[2]);
        doc.text('Student Dashboard User', marginX, startY + 11);

        // Invoice Details (Right)
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(greyColor[0], greyColor[1], greyColor[2]);
        doc.text('INVOICE DETAILS:', 130, startY);

        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.text(`Invoice Date: ${invoice.invoice_date}`, 130, startY + 6);
        doc.text(`Payment: ${invoice.payment_method.toUpperCase()}`, 130, startY + 11);

        // Status with pill background
        doc.text('Status:', 130, startY + 16);
        const isPaid = invoice.status.toLowerCase() === 'paid';
        if (isPaid) {
            doc.setFillColor(240, 253, 244); // light green bg
            doc.setTextColor(21, 128, 61); // green-700 text
        } else {
            doc.setFillColor(254, 242, 242); // light red bg
            doc.setTextColor(185, 28, 28); // red-700 text
        }
        // status pill
        doc.roundedRect(143, startY + 12.5, 18, 5, 1, 1, 'F');
        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.text(invoice.status.toUpperCase(), 152, startY + 16, { align: 'center' });

        // --- TABLE ---
        const tableY = startY + 28;
        
        // Table Header
        doc.setFillColor(lightGreyColor[0], lightGreyColor[1], lightGreyColor[2]);
        doc.rect(marginX, tableY, 170, 9, 'F');

        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(greyColor[0], greyColor[1], greyColor[2]);
        doc.text('ITEM DESCRIPTION', marginX + 3, tableY + 6);
        doc.text('PAYMENT', 110, tableY + 6);
        doc.text('AMOUNT', 190, tableY + 6, { align: 'right' });

        // Table Row (Course item)
        const rowY = tableY + 9;
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);

        const splitTitle = doc.splitTextToSize(invoice.course_title || '', 80);
        doc.text(splitTitle, marginX + 3, rowY + 7);
        doc.text(invoice.payment_method.toUpperCase(), 110, rowY + 7);
        doc.setFont('helvetica', 'bold');
        doc.text(`$${invoice.amount}`, 190, rowY + 7, { align: 'right' });

        const rowHeight = Math.max(12, splitTitle.length * 5 + 4);
        
        // Border under row
        doc.setDrawColor(243, 244, 246);
        doc.setLineWidth(0.5);
        doc.line(marginX, rowY + rowHeight, 190, rowY + rowHeight);

        // --- TOTALS ---
        const totalY = rowY + rowHeight + 12;
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(greyColor[0], greyColor[1], greyColor[2]);
        doc.text('Subtotal:', 140, totalY);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
        doc.text(`$${invoice.amount}`, 190, totalY, { align: 'right' });

        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text('Total Amount:', 140, totalY + 8);
        doc.text(`$${invoice.amount}`, 190, totalY + 8, { align: 'right' });

        // --- FOOTER ---
        const footerY = 250;
        doc.setDrawColor(229, 231, 235);
        doc.setLineWidth(0.5);
        doc.line(marginX, footerY, 190, footerY);

        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text('Thank you for choosing Learn Hub!', 105, footerY + 10, { align: 'center' });

        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(greyColor[0], greyColor[1], greyColor[2]);
        doc.text('If you have any questions about this invoice, please contact support@learnhub.com', 105, footerY + 16, { align: 'center' });
        doc.text(`Generated on ${new Date().toLocaleString()} • Learn Hub Inc.`, 105, footerY + 22, { align: 'center' });

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
                                {invoice.course_title}
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
