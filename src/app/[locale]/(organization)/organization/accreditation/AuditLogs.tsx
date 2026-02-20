"use client";
import React from "react";
import { Download, Clock } from "lucide-react";
import { jsPDF } from "jspdf";
import { auditLogs } from "@/lib/organization";

const AuditLogs = () => {
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Audit Logs Report", 14, 22);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text("Track all accreditation and compliance activities", 14, 30);
    doc.text(`Generated: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`, 14, 36);

    // Line
    doc.setDrawColor(200);
    doc.line(14, 40, 196, 40);

    let y = 50;

    auditLogs.forEach((log, index) => {
      if (y > 260) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(30);
      doc.text(`${index + 1}. ${log.action}`, 14, y);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100);
      doc.text(log.subtitle, 14, y + 7);
      doc.text(`Date: ${log.date}  |  Performed by: ${log.performedBy}`, 14, y + 14);
      doc.text(log.details, 14, y + 21);

      doc.setDrawColor(230);
      doc.line(14, y + 26, 196, y + 26);

      y += 34;
    });

    doc.save("audit-logs.pdf");
  };

  return (
    <div className="border border-border-light p-5 rounded-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-title">Audit Logs</h3>
          <p className="text-sm text-description mt-1">Track all accreditation and compliance activities</p>
        </div>
        <button
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 px-5 py-2.5 bg-main text-white text-sm font-medium rounded-lg hover:bg-main/90 transition-colors"
        >
          <Download className="w-4 h-4" />
          Audit Logs
        </button>
      </div>

      {/* Log Cards */}
      <div className="space-y-3">
        {auditLogs.map((log) => (
          <div
            key={log.id}
            className="flex items-center gap-4 border border-border-light rounded-md px-5 py-4"
          >
            {/* Icon */}
            <div className="w-10 h-10 rounded-md bg-[#E7ECF4] flex items-center justify-center shrink-0 mt-0.5">
              <Clock className="w-5 h-5 text-[#042F54]" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-title">{log.action}</h4>
              <p className="text-sm text-description mt-0.5">{log.subtitle}</p>
            </div>

            {/* Time */}
            <span className="text-sm text-[#EBCC2B] whitespace-nowrap shrink-0">
              {log.timeAgo}
            </span>
          </div>
        ))}

        {auditLogs.length === 0 && (
          <div className="text-center py-12 text-description text-sm">
            No audit logs available.
          </div>
        )}
      </div>
    </div>
  );
};

export default AuditLogs;
