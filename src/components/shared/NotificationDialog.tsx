"use client";

import { useState } from "react";
import { Bell } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const notifications = [
  {
    id: "1",
    category: "Affiliate Program",
    message: "Neural Networks Q&A Session starts in 2 hours",
    date: "1/29/2026, 9:36:32 AM",
    read: false,
  },
  {
    id: "2",
    category: "Affiliate notification",
    message: "Someone, brought course with your affiliate link.",
    date: "1/29/2026, 9:36:32 AM",
    read: false,
  },
  {
    id: "3",
    category: "Course Update",
    message: "New module added to Advanced Machine Learning",
    date: "1/28/2026, 9:36:32 AM",
    read: true,
  },
  {
    id: "4",
    category: "Affiliate Program",
    message: "Your referral code was used 5 times this week.",
    date: "1/27/2026, 11:20:00 AM",
    read: true,
  },
  {
    id: "5",
    category: "Course Update",
    message: "React for Beginners course just got updated.",
    date: "1/26/2026, 8:45:00 AM",
    read: true,
  },
  {
    id: "6",
    category: "Affiliate notification",
    message: "Commission of €44.85 has been approved.",
    date: "1/25/2026, 3:10:00 PM",
    read: true,
  },
  {
    id: "7",
    category: "Affiliate Program",
    message: "Monthly payout of €845.50 has been processed.",
    date: "1/24/2026, 9:00:00 AM",
    read: true,
  },
  {
    id: "8",
    category: "Course Update",
    message: "TypeScript Mastery added 3 new lessons.",
    date: "1/23/2026, 2:00:00 PM",
    read: true,
  },
];

const PREVIEW_COUNT = 3;

export function NotificationsDropdown() {
  const [items, setItems] = useState(notifications);
  const [showAll, setShowAll] = useState(false);

  const unreadCount = items.filter((n) => !n.read).length;
  const visibleItems = showAll ? items : items.slice(0, PREVIEW_COUNT);

  const handleMarkAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (!open) setShowAll(false);
      }}
    >
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5 text-gray-600" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-500" />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-[380px] p-0 rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
          <span className="text-sm font-semibold text-gray-900">
            Notifications
          </span>
          <button
            onClick={handleMarkAllRead}
            className="text-xs text-blue-500 hover:text-blue-600 font-medium transition-colors"
          >
            Mark all read
          </button>
        </div>

        {/* List */}
        <div
          className={`flex flex-col divide-y divide-gray-50 transition-all duration-300 ${
            showAll ? "max-h-[420px] overflow-y-auto" : "overflow-hidden"
          }`}
        >
          {visibleItems.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3 px-5 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="mt-1.5 flex-shrink-0">
                <span
                  className={`block w-2 h-2 rounded-full ${
                    item.read ? "bg-gray-200" : "bg-blue-500"
                  }`}
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold text-gray-900">
                  {item.category}
                </span>
                <span className="text-sm text-gray-600 leading-snug">
                  {item.message}
                </span>
                <span className="text-xs text-gray-400 mt-0.5">
                  {item.date}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 px-5 py-3">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="w-full text-center text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors"
          >
            {showAll ? "Show less" : "View all notifications"}
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
