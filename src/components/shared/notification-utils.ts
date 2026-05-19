import { Bell, CreditCard } from "lucide-react";
import type { LandingNotificationItem } from "@/redux/features/landing/landing.type";

export type NotificationIconInfo = {
	bg: string;
	text: string;
	icon: typeof Bell;
};

export const getNotificationIcon = (type: string): NotificationIconInfo => {
	switch (type) {
		case "course_updated":
			return {
				bg: "bg-blue-50",
				text: "text-blue-600",
				icon: Bell,
			};
		case "payment":
		case "purchase":
			return {
				bg: "bg-emerald-50",
				text: "text-emerald-600",
				icon: CreditCard,
			};
		default:
			return {
				bg: "bg-gray-50",
				text: "text-gray-600",
				icon: Bell,
			};
	}
};

export const formatNotificationTime = (dateStr: string) => {
	try {
		const date = new Date(dateStr);
		const now = new Date();
		const diffMs = now.getTime() - date.getTime();
		if (diffMs < 0) return "Just now";

		const diffMins = Math.floor(diffMs / 60000);
		if (diffMins < 1) return "Just now";
		if (diffMins < 60) return `${diffMins}m ago`;

		const diffHours = Math.floor(diffMins / 60);
		if (diffHours < 24) return `${diffHours}h ago`;

		const diffDays = Math.floor(diffHours / 24);
		if (diffDays === 1) return "Yesterday";
		if (diffDays < 7) return `${diffDays}d ago`;

		return new Intl.DateTimeFormat("en-US", {
			month: "short",
			day: "numeric",
		}).format(date);
	} catch {
		return "";
	}
};

export type SharedNotificationItem = LandingNotificationItem;