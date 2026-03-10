"use client";
import { Calendar } from 'lucide-react'
import { earnings } from '@/lib/organization'
import { useState, useRef, useEffect } from 'react'
import { useTranslations } from 'next-intl';

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function getMonthRange(year: number, month: number) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const fmt = (d: Date) =>
    `${String(d.getDate()).padStart(2, "0")} ${MONTHS[d.getMonth()].slice(0, 3)} ${d.getFullYear()}`;
  return `${fmt(first)} - ${fmt(last)}`;
}

const EarningsTable = () => {
  const t = useTranslations("OrganizationReports");
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedMonth, setSelectedMonth] = useState(0); // 0 = January
  const [open, setOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  const dateLabel = getMonthRange(selectedYear, selectedMonth);

  // Close picker on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="bg-white rounded-md">
      <div className="p-5 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-title">{t("earnings")}</h3>

        {/* Date Range Picker */}
        <div className="relative" ref={pickerRef}>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 text-sm text-description border border-border-light rounded-md px-3 py-2 hover:border-main transition-colors"
          >
            <Calendar className="w-4 h-4" />
            <span>{dateLabel}</span>
          </button>

          {open && (
            <div className="absolute right-0 top-full mt-2 z-50 bg-white border border-border-light rounded-lg shadow-lg p-4 w-64">
              {/* Year selector */}
              <div className="flex items-center justify-between mb-3">
                <button
                  onClick={() => setSelectedYear((y) => y - 1)}
                  className="text-description hover:text-title px-2 py-1 rounded hover:bg-gray-100 text-sm"
                >
                  ‹
                </button>
                <span className="font-semibold text-title text-sm">{selectedYear}</span>
                <button
                  onClick={() => setSelectedYear((y) => y + 1)}
                  className="text-description hover:text-title px-2 py-1 rounded hover:bg-gray-100 text-sm"
                >
                  ›
                </button>
              </div>

              {/* Month grid */}
              <div className="grid grid-cols-3 gap-1.5">
                {MONTHS.map((month, i) => (
                  <button
                    key={month}
                    onClick={() => { setSelectedMonth(i); setOpen(false); }}
                    className={`text-xs py-1.5 rounded-md transition-colors ${
                      i === selectedMonth
                        ? "bg-main text-white font-medium"
                        : "text-description hover:bg-gray-100 hover:text-title"
                    }`}
                  >
                    {month.slice(0, 3)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="px-6 pb-6 overflow-x-auto">
        <table className="w-full min-w-[600px] text-sm">
          <thead>
            <tr className="border-b border-border-light">
              <th className="text-left py-3 font-semibold text-title">{t("orderId")}</th>
              <th className="text-left py-3 font-semibold text-title">{t("date")}</th>
              <th className="text-left py-3 font-semibold text-title">{t("course")}</th>
              <th className="text-left py-3 font-semibold text-title">{t("amount")}</th>
            </tr>
          </thead>
          <tbody>
            {earnings.slice(0, 5).map((earning) => (
              <tr key={earning.orderId} className="border-b border-border-light last:border-0">
                <td className="py-4 text-[#392C7D] font-medium">{earning.orderId.replace("ORD-", "ORD")}</td>
                <td className="py-4 text-description">{earning.date}</td>
                <td className="py-4 text-description">{earning.course}</td>
                <td className="py-4 text-title font-medium">${earning.amount.toFixed(0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EarningsTable
