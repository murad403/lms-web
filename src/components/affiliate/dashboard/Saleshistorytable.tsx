"use client";

import { useState } from "react";
import { Search, Download } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export type SaleStatus = "Paid" | "Approved" | "Pending";

export interface SaleRecord {
  orderId: string;
  course: string;
  customer: string;
  price: number;
  commissionPercent: number;
  commissionAmount: number;
  status: SaleStatus;
  date: string;
  currency?: string;
}

interface SalesHistoryTableProps {
  data?: SaleRecord[];
  currency?: string;
  className?: string;
}

const defaultData: SaleRecord[] = [
  {
    orderId: "ORD-8821",
    course: "Advanced React Development",
    customer: "Sarah Johnson",
    price: 299.0,
    commissionPercent: 15,
    commissionAmount: 44.85,
    status: "Paid",
    date: "Feb 10, 2026",
  },
  {
    orderId: "ORD-8820",
    course: "TypeScript Mastery",
    customer: "Michael Chen",
    price: 199.0,
    commissionPercent: 15,
    commissionAmount: 29.85,
    status: "Approved",
    date: "Feb 9, 2026",
  },
  {
    orderId: "ORD-8819",
    course: "Node.js Complete Guide",
    customer: "Emma Wilson",
    price: 249.0,
    commissionPercent: 15,
    commissionAmount: 37.35,
    status: "Pending",
    date: "Feb 8, 2026",
  },
  {
    orderId: "ORD-8818",
    course: "Full Stack Web Development",
    customer: "James Brown",
    price: 399.0,
    commissionPercent: 15,
    commissionAmount: 59.85,
    status: "Paid",
    date: "Feb 7, 2026",
  },
  {
    orderId: "ORD-8817",
    course: "Python for Data Science",
    customer: "Olivia Martinez",
    price: 279.0,
    commissionPercent: 15,
    commissionAmount: 41.85,
    status: "Approved",
    date: "Feb 6, 2026",
  },
];

const statusStyles: Record<SaleStatus, string> = {
  Paid: "bg-green-50 text-green-600 border-green-200 hover:bg-green-50",
  Approved: "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-50",
  Pending: "bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-50",
};

function formatAmount(amount: number, currency: string) {
  return `${currency}${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function SalesHistoryTable({
  data = defaultData,
  currency = "€",
  className = "",
}: SalesHistoryTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = data.filter((row) => {
    const matchesSearch =
      row.orderId.toLowerCase().includes(search.toLowerCase()) ||
      row.course.toLowerCase().includes(search.toLowerCase()) ||
      row.customer.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      row.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleExport = () => {
    const headers = [
      "Order ID",
      "Course",
      "Customer",
      "Price",
      "Commission %",
      "Commission Amount",
      "Status",
      "Date",
    ];
    const rows = filtered.map((r) => [
      r.orderId,
      r.course,
      r.customer,
      formatAmount(r.price, currency),
      `${r.commissionPercent}%`,
      formatAmount(r.commissionAmount, currency),
      r.status,
      r.date,
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sales-history.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6 flex flex-col gap-5 ${className} `}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-[18px] font-bold  text-gray-900 ">Sales History</h2>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search sales..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 w-full sm:w-40 lg:w-52 text-sm border-gray-200 focus-visible:ring-0"
            />
          </div>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-9 w-28 sm:w-32 lg:w-36 text-sm border-gray-200 focus:ring-0">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>

          {/* Export */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            className="h-9 gap-2 text-sm border-gray-200 text-gray-700 hover:bg-gray-50"
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-gray-100 overflow-x-auto">
        <Table className="min-w-[800px]">
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="text-xs font-semibold text-gray-500 py-3">
                Order ID
              </TableHead>
              <TableHead className="text-xs font-semibold text-gray-500 py-3">
                Course
              </TableHead>
              <TableHead className="text-xs font-semibold text-gray-500 py-3">
                Customer
              </TableHead>
              <TableHead className="text-xs font-semibold text-gray-500 py-3">
                Price
              </TableHead>
              <TableHead className="text-xs font-semibold text-gray-500 py-3">
                Commission %
              </TableHead>
              <TableHead className="text-xs font-semibold text-gray-500 py-3">
                Commission Amount
              </TableHead>
              <TableHead className="text-xs font-semibold text-gray-500 py-3">
                Status
              </TableHead>
              <TableHead className="text-xs font-semibold text-gray-500 py-3">
                Date
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center text-sm text-gray-400 py-10"
                >
                  No results found.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((row) => (
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
                    {row.commissionPercent}%
                  </TableCell>
                  <TableCell className="text-sm font-semibold text-green-500 py-4">
                    {formatAmount(row.commissionAmount, currency)}
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge
                      variant="outline"
                      className={`text-xs h-7 font-medium px-2.5 py-0.5 rounded-md ${statusStyles[row.status]}`}
                    >
                      {row.status}
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
