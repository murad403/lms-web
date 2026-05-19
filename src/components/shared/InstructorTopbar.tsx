"use client";
import { useState, useRef, useEffect } from "react";
import { Bell, Menu as MenuIcon, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { LayoutDashboard, BookOpen, Video, DollarSign, MessageSquare, Award, Bot, Settings, LogOut, PlusCircle } from "lucide-react";
import RoleProfileDropdown from "./RoleProfileDropdown";
import LogoutModal from "./LogoutModal";
import { PiGraduationCap } from "react-icons/pi";
import { useTranslations } from "next-intl";
import { getDashboardPathByRole, getProfilePathByRole } from "@/utils/auth-shared";
import { useGetInstructorProfileQuery, useOwnerCourseDetailsQuery } from "@/redux/features/instructor/instructor.api";
import { useGetMentorCoursesQuery } from "@/redux/features/mentor/mentor.api";
import { resolveImageUrl } from "@/utils/image";
import { Skeleton } from "@/components/ui/skeleton";
import { landingApi, useGetNotificationsQuery } from "@/redux/features/landing/landing.api";
import { ACCESS_TOKEN_COOKIE } from "@/utils/auth-shared";
import { getCookie } from "@/utils/auth-client";
import { formatNotificationTime, getNotificationIcon } from "./notification-utils";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";

type SidebarItem = {
    labelKey: string;
    href: string;
    icon: React.ElementType;
};

const mobileMenuItems: SidebarItem[] = [
    { labelKey: "dashboard", href: "/instructor/dashboard", icon: LayoutDashboard },
    { labelKey: "createNewCourse", href: "/instructor/create-course", icon: PlusCircle },
    { labelKey: "myCourses", href: "/instructor/my-courses", icon: BookOpen },
    { labelKey: "liveClasses", href: "/instructor/live-classes", icon: Video },
    { labelKey: "earning", href: "/instructor/earnings", icon: DollarSign },
    { labelKey: "message", href: "/instructor/messages", icon: MessageSquare },
    { labelKey: "accreditation", href: "/instructor/accreditation", icon: Award },
    { labelKey: "aiAssistant", href: "/instructor/ai-assistant", icon: Bot },
    { labelKey: "settings", href: "/instructor/settings", icon: Settings },
];

const InstructorTopbar = () => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const dispatch = useAppDispatch();
    const notificationRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const t = useTranslations("InstructorTopbar");
    const { data: profileResponse, isLoading: isProfileLoading } = useGetInstructorProfileQuery();
    const hasAccessToken = Boolean(getCookie(ACCESS_TOKEN_COOKIE));
    const {
        data: notificationsResponse,
        refetch: refetchNotifications,
    } = useGetNotificationsQuery(undefined, {
        skip: !hasAccessToken,
    });
    const fetchedNotifications = notificationsResponse?.data || [];
    const unreadCount = fetchedNotifications.filter((notification) => !notification.is_read).length;

    const segments = pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1] || "dashboard";
    const isNum = !isNaN(Number(lastSegment)) && lastSegment.trim() !== "";
    const isMentor = pathname.includes("/mentor/");
    
    const { data: courseDetail } = useOwnerCourseDetailsQuery(Number(lastSegment), {
        skip: !isNum || isMentor,
    });

    const { data: mentorCourses } = useGetMentorCoursesQuery(undefined, {
        skip: !isNum || !isMentor,
    });

    // Derive page title from pathname
    const getPageTitle = () => {
        if (isNum) {
            if (isMentor && mentorCourses?.data) {
                const matched = mentorCourses.data.find((c: any) => c.course_id === Number(lastSegment));
                if (matched?.course_title) return matched.course_title;
            } else if (courseDetail?.data?.title) {
                return courseDetail.data.title;
            }
        }

        const titleKeys: Record<string, string> = {
            dashboard: "dashboard",
            "create-course": "createNewCourse",
            "my-courses": "myCourses",
            "live-classes": "liveClasses",
            earnings: "earning",
            messages: "message",
            accreditation: "accreditation",
            "ai-assistant": "aiAssistant",
            settings: "settings",
            profile: "profile",
        };
        const key = titleKeys[lastSegment];
        return key ? t(key) : lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1).replace(/-/g, " ");
    };

    const isActive = (href: string) => {
        return pathname === href || pathname.startsWith(href + "/");
    };

    const handleMarkAsRead = async (id: number) => {
        try {
            await dispatch(landingApi.endpoints.markAsRead.initiate(id)).unwrap();
            await refetchNotifications();
        } catch {
            toast.error("Failed to update notification.");
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setShowNotifications(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
                <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-6 xl:px-10 py-3.5">
                    {/* Left - Mobile menu + Title */}
                    <div className="flex items-center gap-3">
                        {/* Mobile Menu Button */}
                        <button
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                        >
                            {showMobileMenu ? (
                                <X className="w-6 h-6 text-gray-700" />
                            ) : (
                                <MenuIcon className="w-6 h-6 text-gray-700" />
                            )}
                        </button>

                        <div>
                            <h1 className="text-base sm:text-xl font-bold text-title">{getPageTitle()}</h1>
                        </div>
                    </div>

                    {/* Right - Notification + Profile */}
                    <div className="flex items-center gap-3">
                        {/* Notification */}
                        <div className="relative" ref={notificationRef}>
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className="p-2 hover:bg-gray-100 rounded-lg relative"
                            >
                                <Bell className="size-6 text-gray-700" />
                                {unreadCount > 0 && (
                                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white" />
                                )}
                            </button>

                            {showNotifications && (
                                <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-[80vh] overflow-hidden">
                                    <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                                        <h3 className="text-lg font-bold text-title">{t("notifications")}</h3>
                                        {/* Showing all notifications by default */}
                                    </div>
                                    <div className="max-h-96 overflow-y-auto">
                                        {fetchedNotifications.length > 0 ? (
                                            fetchedNotifications.map((notification) => {
                                                const { bg, text, icon: Icon } = getNotificationIcon(notification.type);
                                                return (
                                                    <div key={notification.id} className={`p-4 hover:bg-gray-50 border-b border-gray-100 flex gap-3 ${!notification.is_read ? "bg-blue-50/20" : ""}`}>
                                                        <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center shrink-0`}>
                                                            <Icon className={`w-5 h-5 ${text}`} />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="font-semibold text-title text-sm">{notification.title}</h4>
                                                            <p className="text-xs text-description mt-0.5">{notification.body}</p>
                                                            <div className="mt-1 flex items-center gap-3">
                                                                <p className="text-[10px] text-gray-400">{formatNotificationTime(notification.created_at)}</p>
                                                                {!notification.is_read && (
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleMarkAsRead(notification.id)}
                                                                        className="text-[10px] font-semibold text-main hover:text-main/80 transition-colors"
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
                                            <div className="py-8 text-center text-description text-sm">
                                                No notifications found
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {isProfileLoading ? (
                            <div className="flex items-center gap-3">
                                <Skeleton className="h-10 w-10 rounded-md" />
                                <div className="hidden sm:block space-y-2">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-3 w-20" />
                                </div>
                            </div>
                        ) : (
                            <RoleProfileDropdown
                                name={profileResponse?.data?.user?.name || "Instructor"}
                                roleLabel={profileResponse?.data?.title || "Instructor"}
                                avatarSrc={resolveImageUrl(profileResponse?.data?.user?.avatar) || "/home/user1.png"}
                                avatarAlt={profileResponse?.data?.user?.name || "Instructor"}
                                profileHref={getProfilePathByRole("instructor")}
                                dashboardHref={getDashboardPathByRole("instructor")}
                                profileLabel={t("profile")}
                                dashboardLabel={t("dashboard")}
                                logoutLabel={t("signOut")}
                                triggerClassName="flex items-center gap-2 hover:opacity-80 transition-opacity outline-none"
                                contentClassName="w-72 p-0 rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                            />
                        )}
                    </div>
                </div>

                {/* Mobile Menu */}
                {showMobileMenu && (
                    <div className="lg:hidden border-t border-gray-200 bg-[#0F1B35]">
                        <div className="px-3 py-4">
                            {/* Mobile Logo */}
                            <div className="px-3 pb-3 mb-3 border-b border-white/10">
                                <Link href="/" className="flex items-center gap-2" onClick={() => setShowMobileMenu(false)}>
                                    <PiGraduationCap className="size-7 text-white" />
                                    <span className="text-lg font-bold text-white">Forma-Cert</span>
                                </Link>
                            </div>
                            <nav className="space-y-1">
                                {mobileMenuItems.map((item) => {
                                    const active = isActive(item.href);
                                    const Icon = item.icon;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setShowMobileMenu(false)}
                                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${active
                                                ? "bg-main text-white font-semibold"
                                                : "text-gray-300 hover:bg-white/10 hover:text-white"
                                                }`}
                                        >
                                            <Icon className="w-5 h-5 shrink-0" />
                                            <span>{t(item.labelKey)}</span>
                                        </Link>
                                    );
                                })}
                                <button
                                    onClick={() => {
                                        setShowMobileMenu(false);
                                        setShowLogout(true);
                                    }}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors w-full"
                                >
                                    <LogOut className="w-5 h-5 shrink-0" />
                                    <span>{t("signOut")}</span>
                                </button>
                            </nav>
                        </div>
                    </div>
                )}
            </header>

            <LogoutModal open={showLogout} onClose={() => setShowLogout(false)} />
        </>
    );
};

export default InstructorTopbar;
