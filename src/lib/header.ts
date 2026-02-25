export type TMenuItem = {
    label: string;
    href: string;
}

export const menuItems: TMenuItem[] = [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "Certifications", href: "/certifications" },
    { label: "For Trainers", href: "/for-trainers" },
    { label: "For School", href: "/for-school" },
    { label: "Partnerships", href: "/partnerships" },
];

export type TNotification = {
    id: number;
    icon: string;
    iconBg: string;
    title: string;
    description: string;
    time: string;
}
export const notifications: TNotification[] = [
    {
        id: 1,
        icon: "bell",
        iconBg: "bg-blue-100",
        title: "New Class lesson updated",
        description: "Check out the new lesson on conditional formatting",
        time: "5 minutes ago",
    },
    {
        id: 2,
        icon: "bell",
        iconBg: "bg-blue-100",
        title: "New Class lesson updated",
        description: "Check out the new lesson on conditional formatting",
        time: "5 minutes ago",
    },
    {
        id: 3,
        icon: "bell",
        iconBg: "bg-blue-100",
        title: "New Class lesson updated",
        description: "Check out the new lesson on conditional formatting",
        time: "5 minutes ago",
    },
    {
        id: 4,
        icon: "bell",
        iconBg: "bg-blue-100",
        title: "New Class lesson updated",
        description: "Check out the new lesson on conditional formatting",
        time: "5 minutes ago",
    },
    {
        id: 5,
        icon: "bell",
        iconBg: "bg-blue-100",
        title: "New Class lesson updated",
        description: "Check out the new lesson on conditional formatting",
        time: "5 minutes ago",
    },
    {
        id: 6,
        icon: "credit",
        iconBg: "bg-green-100",
        title: "New course purchased $169.69",
        description: "Check out the new health care course you just purchased",
        time: "5 minutes ago",
    },
];


export type TCategory = {
    name: string;
    count: string;
}

export const categories: TCategory[] = [
    { name: "Healthcare & Medical", count: "20,126 Courses" },
    { name: "Academic & School", count: "18,540 Courses" },
    { name: "Workplace Safety", count: "15,320 Courses" },
    { name: "Quality, Health, Safety & Environment (QHSE)", count: "12,750 Courses" },
    {
        name: "Professional Development & Soft Skills",
        count: "10,890 Courses",
    },
];
