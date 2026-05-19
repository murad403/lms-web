"use client";

// no local state needed; always show all notifications
import { Bell } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { landingApi, useGetNotificationsQuery } from "@/redux/features/landing/landing.api";
import { ACCESS_TOKEN_COOKIE } from "@/utils/auth-shared";
import { getCookie } from "@/utils/auth-client";
import { formatNotificationTime, getNotificationIcon } from "./notification-utils";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";

export function NotificationsDropdown() {
  const t = useTranslations("Notifications");
  const dispatch = useAppDispatch();
  const hasAccessToken = Boolean(getCookie(ACCESS_TOKEN_COOKIE));
  const {
    data: notificationsResponse,
    refetch: refetchNotifications,
  } = useGetNotificationsQuery(undefined, {
    skip: !hasAccessToken,
  });

  const items = notificationsResponse?.data || [];
  const unreadCount = items.filter((notification) => !notification.is_read).length;
  const visibleItems = items;

  const handleMarkAsRead = async (id: number) => {
    try {
      await dispatch(landingApi.endpoints.markAsRead.initiate(id)).unwrap();
      await refetchNotifications();
    } catch {
      toast.error("Failed to update notification.");
    }
  };

  return (
    <DropdownMenu>
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
        className="w-95 p-0 rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
          <span className="text-sm font-semibold text-gray-900">{t("title")}</span>
        </div>

        <div className="flex flex-col divide-y divide-gray-50 transition-all duration-300 max-h-105 overflow-y-auto">
          {visibleItems.length > 0 ? (
            visibleItems.map((item) => {
              const { bg, text, icon: Icon } = getNotificationIcon(item.type);

              return (
                <div
                  key={item.id}
                  className={`flex items-start gap-3 px-5 py-4 hover:bg-gray-50 transition-colors ${item.is_read ? "" : "bg-blue-50/20"}`}
                >
                  <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${bg}`}>
                    <Icon className={`h-5 w-5 ${text}`} />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="text-sm font-semibold text-gray-900">
                      {item.title}
                    </span>
                    <span className="text-sm text-gray-600 leading-snug">
                      {item.body}
                    </span>
                    <div className="mt-1 flex items-center gap-3">
                      <span className="text-xs text-gray-400 mt-0.5">
                        {formatNotificationTime(item.created_at)}
                      </span>
                      {!item.is_read && (
                        <button
                          type="button"
                          onClick={() => handleMarkAsRead(item.id)}
                          className="text-xs text-blue-500 hover:text-blue-600 font-medium transition-colors"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="px-5 py-6 text-center text-sm text-gray-500">
              No notifications found
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}