"use client";

import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type SaleStatus = "paid" | "approved" | "pending";

export interface SaleRecord {
  orderId: string;
  course: string;
  customer: string;
  price: number;
  commissionPercent: string;
  commissionAmount: number;
  status: SaleStatus;
  date: string;
}

interface SalesHistoryTableProps {
  data?: SaleRecord[];
  currency?: string;
  className?: string;
  isLoading?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

const statusStyles: Record<SaleStatus, string> = {
  paid: "bg-green-50 text-green-600 border-green-200 hover:bg-green-50",
  approved: "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-50",
  pending: "bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-50",
};

function formatStatusLabel(status: SaleStatus) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function formatAmount(amount: number, currency: string) {
  return `${currency}${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function SalesHistoryTable({
  data = [],
  currency = "$",
  className = "",
  isLoading = false,
  searchValue = "",
  onSearchChange,
}: SalesHistoryTableProps) {
  const t = useTranslations("AffiliateDashboard");

  const renderSkeletonRows = () =>
    Array.from({ length: 5 }).map((_, index) => (
      <TableRow key={`skeleton-${index}`} className="border-b border-gray-50">
        <TableCell className="py-4">
          <Skeleton className="h-4 w-28" />
        </TableCell>
        <TableCell className="py-4">
          <Skeleton className="h-4 w-40" />
        </TableCell>
        <TableCell className="py-4">
          <Skeleton className="h-4 w-32" />
        </TableCell>
        <TableCell className="py-4">
          <Skeleton className="h-4 w-20" />
        </TableCell>
        <TableCell className="py-4">
          <Skeleton className="h-4 w-16" />
        </TableCell>
        <TableCell className="py-4">
          <Skeleton className="h-4 w-24" />
        </TableCell>
        <TableCell className="py-4">
          <Skeleton className="h-7 w-20 rounded-md" />
        </TableCell>
        <TableCell className="py-4">
          <Skeleton className="h-4 w-24" />
        </TableCell>
      </TableRow>
    ));

  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6 flex flex-col gap-5 ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-[18px] font-bold text-gray-900">{t("salesHistory")}</h2>

        <div className="w-full sm:w-64">
          <input
            type="search"
            value={searchValue}
            onChange={(event) => onSearchChange?.(event.target.value)}
            placeholder={t("searchSales")}
            className="h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-sm outline-none transition focus:border-gray-300 focus:ring-0"
          />
        </div>
      </div>

      <div className="rounded-xl border border-gray-100 overflow-x-auto">
        <Table className="min-w-200">
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="text-xs font-semibold text-gray-500 py-3">
                {t("orderId")}
              </TableHead>
              <TableHead className="text-xs font-semibold text-gray-500 py-3">
                {t("course")}
              </TableHead>
              <TableHead className="text-xs font-semibold text-gray-500 py-3">
                {t("customer")}
              </TableHead>
              <TableHead className="text-xs font-semibold text-gray-500 py-3">
                {t("price")}
              </TableHead>
              <TableHead className="text-xs font-semibold text-gray-500 py-3">
                {t("commissionPercent")}
              </TableHead>
              <TableHead className="text-xs font-semibold text-gray-500 py-3">
                {t("commissionAmount")}
              </TableHead>
              <TableHead className="text-xs font-semibold text-gray-500 py-3">
                {t("status")}
              </TableHead>
              <TableHead className="text-xs font-semibold text-gray-500 py-3">
                {t("date")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              renderSkeletonRows()
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center text-sm text-gray-400 py-10"
                >
                  {t("noResults")}
                </TableCell>
              </TableRow>
            ) : (
              data.map((row) => (
                <TableRow
                  key={row.orderId}
                  className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                >
                  <TableCell className="text-sm font-medium text-gray-700 py-4">
                    {row.orderId}
                  </TableCell>
                  <TableCell className="text-sm text-gray-700 py-4">
                    {row.course}
                  </TableCell>
                  <TableCell className="text-sm text-blue-500 py-4">
                    {row.customer}
                  </TableCell>
                  <TableCell className="text-sm text-gray-700 py-4">
                    {formatAmount(row.price, currency)}
                  </TableCell>
                  <TableCell className="text-sm text-gray-700 py-4">
                    {row.commissionPercent}
                  </TableCell>
                  <TableCell className="text-sm font-semibold text-green-500 py-4">
                    {formatAmount(row.commissionAmount, currency)}
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge
                      variant="outline"
                      className={`text-xs h-7 font-medium px-2.5 py-0.5 rounded-md ${statusStyles[row.status]}`}
                    >
                      {formatStatusLabel(row.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-400 py-4">
                    {row.date}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
