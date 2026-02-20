// Organization related types and mock data

export type TTeamMember = {
  id: string;
  name: string;
  avatar: string;
  email: string;
  role: "Admin" | "Manager" | "Instructor" | "Moderator";
  lastLogin: string;
  status: "Active" | "Suspended" | "Pending";
};

export type TTeamStats = {
  totalMembers: number;
  activeMembers: number;
  suspendedMembers: number;
  admins: number;
};

export type TRolePermission = {
  id: string;
  role: string;
  permissions: string[];
  members: number;
};

export type TActivityLog = {
  id: string;
  user: string;
  avatar: string;
  action: string;
  target: string;
  time: string;
};

export type TInstructorMember = {
  id: string;
  name: string;
  avatar: string;
  email: string;
  role: "Lead Instructor" | "Instructor" | "Assistant";
  lastLogin: string;
  status: "Active" | "Pending" | "Suspended";
  courses: number;
};

export type TInstructorStats = {
  totalInstructors: number;
  activeInstructors: number;
  pendingInstructors: number;
  totalCourses: number;
};

export type TContract = {
  id: string;
  instructor: string;
  avatar: string;
  course: string;
  revenueShare: number;
  expiry: string;
  status: "Active" | "Pending" | "Expired";
  signedDate: string;
  splitPercentage: number;
};

export type TContractStats = {
  totalContracts: number;
  activeContracts: number;
  pendingContracts: number;
  expiredContracts: number;
};

export type TReportStats = {
  totalRevenue: number;
  instructorPayouts: number;
  organizationShare: number;
  avgCoursePrice: number;
};

export type TRevenueBarData = {
  month: string;
  revenue: number;
};

export type TEarning = {
  orderId: string;
  date: string;
  course: string;
  amount: number;
};

export type TRecentCourse = {
  id: string;
  title: string;
  image: string;
  enrolled: number;
  status: "Published" | "Draft" | "Under Review";
};

export type TAuditLog = {
  id: string;
  action: string;
  performedBy: string;
  date: string;
  details: string;
};

export type TAttendanceRecord = {
  id: string;
  studentName: string;
  avatar: string;
  course: string;
  instructor: string;
  attendance: boolean;
  loginTime: string;
  logoutTime: string;
  sessionDuration: string;
  status: "Present" | "Absent";
};

export type TExamRule = {
  id: string;
  title: string;
  description: string;
  category: "Exam" | "Certificate";
};

// ─── Mock Data ───

export const teamStats: TTeamStats = {
  totalMembers: 5,
  activeMembers: 4,
  suspendedMembers: 1,
  admins: 1,
};

export const teamMembers: TTeamMember[] = [
  { id: "1", name: "Sarah Johnson", avatar: "/home/banner.jpg", email: "sarah@org.com", role: "Admin", lastLogin: "2 hours ago", status: "Active" },
  { id: "2", name: "Michael Chen", avatar: "/home/banner.jpg", email: "michael@org.com", role: "Manager", lastLogin: "5 hours ago", status: "Active" },
  { id: "3", name: "Emily Davis", avatar: "/home/banner.jpg", email: "emily@org.com", role: "Instructor", lastLogin: "1 day ago", status: "Active" },
  { id: "4", name: "James Wilson", avatar: "/home/banner.jpg", email: "james@org.com", role: "Moderator", lastLogin: "3 days ago", status: "Suspended" },
  { id: "5", name: "Lisa Anderson", avatar: "/home/banner.jpg", email: "lisa@org.com", role: "Instructor", lastLogin: "6 hours ago", status: "Active" },
];

export const rolePermissions: TRolePermission[] = [
  { id: "1", role: "Admin", permissions: ["Manage Users", "Manage Courses", "Manage Settings", "View Reports", "Manage Billing"], members: 1 },
  { id: "2", role: "Manager", permissions: ["Manage Courses", "View Reports", "Manage Users"], members: 1 },
  { id: "3", role: "Instructor", permissions: ["Create Courses", "View Reports", "Manage Own Content"], members: 2 },
  { id: "4", role: "Moderator", permissions: ["Review Content", "Manage Comments", "View Reports"], members: 1 },
];

export const activityLogs: TActivityLog[] = [
  { id: "1", user: "Sarah Johnson", avatar: "/home/banner.jpg", action: "added new member", target: "Lisa Anderson", time: "2 hours ago" },
  { id: "2", user: "Michael Chen", avatar: "/home/banner.jpg", action: "updated role for", target: "Emily Davis", time: "5 hours ago" },
  { id: "3", user: "Sarah Johnson", avatar: "/home/banner.jpg", action: "suspended member", target: "James Wilson", time: "1 day ago" },
  { id: "4", user: "Emily Davis", avatar: "/home/banner.jpg", action: "created a new course", target: "React Masterclass", time: "2 days ago" },
  { id: "5", user: "Michael Chen", avatar: "/home/banner.jpg", action: "updated permissions for", target: "Moderator role", time: "3 days ago" },
  { id: "6", user: "Sarah Johnson", avatar: "/home/banner.jpg", action: "approved accreditation for", target: "Advanced ML Course", time: "4 days ago" },
  { id: "7", user: "Lisa Anderson", avatar: "/home/banner.jpg", action: "uploaded contract for", target: "Data Science Course", time: "5 days ago" },
  { id: "8", user: "Michael Chen", avatar: "/home/banner.jpg", action: "generated report for", target: "Q4 2024", time: "1 week ago" }
];

export const instructorStats: TInstructorStats = {
  totalInstructors: 5,
  activeInstructors: 4,
  pendingInstructors: 1,
  totalCourses: 1,
};

export const instructorMembers: TInstructorMember[] = [
  { id: "1", name: "Sarah Johnson", avatar: "/home/banner.jpg", email: "sarah@org.com", role: "Lead Instructor", lastLogin: "2 hours ago", status: "Active", courses: 5 },
  { id: "2", name: "Michael Chen", avatar: "/home/banner.jpg", email: "michael@org.com", role: "Instructor", lastLogin: "5 hours ago", status: "Active", courses: 3 },
  { id: "3", name: "Emily Davis", avatar: "/home/banner.jpg", email: "emily@org.com", role: "Instructor", lastLogin: "1 day ago", status: "Pending", courses: 2 },
  { id: "4", name: "James Wilson", avatar: "/home/banner.jpg", email: "james@org.com", role: "Assistant", lastLogin: "3 days ago", status: "Active", courses: 1 },
  { id: "5", name: "Lisa Anderson", avatar: "/home/banner.jpg", email: "lisa@org.com", role: "Lead Instructor", lastLogin: "6 hours ago", status: "Active", courses: 4 },
  { id: "6", name: "David Miller", avatar: "/home/banner.jpg", email: "david@org.com", role: "Assistant", lastLogin: "1 week ago", status: "Active", courses: 2 },
  { id: "7", name: "Sophia Garcia", avatar: "/home/banner.jpg", email: "sophia@org.com", role: "Instructor", lastLogin: "2 weeks ago", status: "Active", courses: 3 },
];

export const contractStats: TContractStats = {
  totalContracts: 5,
  activeContracts: 3,
  pendingContracts: 1,
  expiredContracts: 1,
};

export const contracts: TContract[] = [
  { id: "CON-001", instructor: "Sarah Johnson", avatar: "/home/banner.jpg", course: "Advanced Machine Learning", revenueShare: 70, expiry: "Dec 31, 2025", status: "Active", signedDate: "Jan 01, 2024", splitPercentage: 70 },
  { id: "CON-002", instructor: "Michael Chen", avatar: "/home/banner.jpg", course: "Deep Learning Fundamentals", revenueShare: 60, expiry: "Jun 30, 2025", status: "Active", signedDate: "Feb 15, 2024", splitPercentage: 60 },
  { id: "CON-003", instructor: "Emily Davis", avatar: "/home/banner.jpg", course: "UX Design Masterclass", revenueShare: 65, expiry: "Mar 15, 2025", status: "Pending", signedDate: "Mar 01, 2024", splitPercentage: 65 },
  { id: "CON-004", instructor: "James Wilson", avatar: "/home/banner.jpg", course: "React Development", revenueShare: 55, expiry: "Jan 15, 2024", status: "Expired", signedDate: "Jan 15, 2023", splitPercentage: 55 },
  { id: "CON-005", instructor: "Lisa Anderson", avatar: "/home/banner.jpg", course: "Data Science Bootcamp", revenueShare: 75, expiry: "Sep 30, 2025", status: "Active", signedDate: "Apr 01, 2024", splitPercentage: 75 },
];

export const reportStats: TReportStats = {
  totalRevenue: 328000,
  instructorPayouts: 229000,
  organizationShare: 99000,
  avgCoursePrice: 82,
};

export const revenueBarData: TRevenueBarData[] = [
  { month: "Jul", revenue: 45000 },
  { month: "Aug", revenue: 52000 },
  { month: "Sep", revenue: 48000 },
  { month: "Oct", revenue: 61000 },
  { month: "Nov", revenue: 55000 },
  { month: "Dec", revenue: 67000 },
];

export const earnings: TEarning[] = [
  { orderId: "ORD-001", date: "Jan 15, 2024", course: "Advanced Machine Learning", amount: 49.99 },
  { orderId: "ORD-002", date: "Jan 14, 2024", course: "Deep Learning Fundamentals", amount: 39.99 },
  { orderId: "ORD-003", date: "Jan 13, 2024", course: "UX Design Masterclass", amount: 29.99 },
  { orderId: "ORD-004", date: "Jan 12, 2024", course: "React Development", amount: 59.99 },
  { orderId: "ORD-005", date: "Jan 11, 2024", course: "Data Science Bootcamp", amount: 44.99 },
  { orderId: "ORD-006", date: "Jan 10, 2024", course: "Python Programming", amount: 34.99 },
  { orderId: "ORD-007", date: "Jan 09, 2024", course: "Cloud Computing Basics", amount: 24.99 },
  { orderId: "ORD-008", date: "Jan 08, 2024", course: "DevOps Essentials", amount: 54.99 },
];

export const recentCourses: TRecentCourse[] = [
  { id: "1", title: "Advanced Machine Learning", image: "/courses/Course Images.png", enrolled: 1247, status: "Published" },
  { id: "2", title: "Deep Learning Fundamentals", image: "/courses/Course Images (1).png", enrolled: 856, status: "Published" },
  { id: "3", title: "UX Design Masterclass", image: "/courses/Course Images (2).png", enrolled: 432, status: "Draft" },
  { id: "4", title: "React Development Complete Guide", image: "/courses/Course Images (3).png", enrolled: 978, status: "Under Review" },
  { id: "5", title: "Data Science Bootcamp", image: "/courses/Course Images (4).png", enrolled: 1563, status: "Published" },
];

export const auditLogs: TAuditLog[] = [
  { id: "1", action: "Course Accredited", performedBy: "Sarah Johnson", date: "Jan 15, 2024", details: "Advanced Machine Learning course was accredited with Professional certification" },
  { id: "2", action: "Certificate Issued", performedBy: "System", date: "Jan 14, 2024", details: "Certificate CERT-001 issued for Advanced Machine Learning" },
  { id: "3", action: "Accreditation Submitted", performedBy: "Michael Chen", date: "Jan 13, 2024", details: "Deep Learning Fundamentals submitted for Standard certification" },
  { id: "4", action: "Course Revision Requested", performedBy: "Emily Davis", date: "Jan 12, 2024", details: "NLP with Transformers needs content revision before accreditation" },
  { id: "5", action: "Certificate Renewed", performedBy: "System", date: "Jan 11, 2024", details: "Certificate CERT-002 renewed for UX Design Masterclass" },
  { id: "6", action: "Accreditation Rejected", performedBy: "Admin", date: "Jan 10, 2024", details: "Computer Vision Basics accreditation rejected due to insufficient content" },
];

export const examRules: TExamRule[] = [
  { id: "1", title: "Minimum Passing Score", description: "Students must achieve a minimum of 70% on all assessments to qualify for certification.", category: "Exam" },
  { id: "2", title: "Time Limits", description: "Each exam has a maximum time limit of 120 minutes. Extensions are not permitted.", category: "Exam" },
  { id: "3", title: "Retake Policy", description: "Students may retake exams up to 3 times. A 24-hour cooling period is required between attempts.", category: "Exam" },
  { id: "4", title: "Certificate Validity", description: "Standard certificates are valid for 2 years. Professional certificates are valid for 3 years.", category: "Certificate" },
  { id: "5", title: "Certificate Renewal", description: "Certificates can be renewed by completing a refresher course and passing the renewal exam.", category: "Certificate" },
  { id: "6", title: "Digital Verification", description: "All certificates include a unique QR code for digital verification by employers.", category: "Certificate" },
];

export const attendanceRecords: TAttendanceRecord[] = [
  { id: "1", studentName: "John Smith", avatar: "/home/banner.jpg", course: "Advanced Machine Learning", instructor: "Sarah Johnson", attendance: true, loginTime: "09:00 AM", logoutTime: "11:30 AM", sessionDuration: "2h 30m", status: "Present" },
  { id: "2", studentName: "Emma Watson", avatar: "/home/banner.jpg", course: "Advanced Machine Learning", instructor: "Sarah Johnson", attendance: true, loginTime: "09:15 AM", logoutTime: "11:45 AM", sessionDuration: "2h 30m", status: "Present" },
  { id: "3", studentName: "David Brown", avatar: "/home/banner.jpg", course: "Advanced Machine Learning", instructor: "Sarah Johnson", attendance: false, loginTime: "—", logoutTime: "—", sessionDuration: "—", status: "Absent" },
  { id: "4", studentName: "Sophie Turner", avatar: "/home/banner.jpg", course: "Advanced Machine Learning", instructor: "Sarah Johnson", attendance: true, loginTime: "09:05 AM", logoutTime: "11:35 AM", sessionDuration: "2h 30m", status: "Present" },
  { id: "5", studentName: "Alex Johnson", avatar: "/home/banner.jpg", course: "Advanced Machine Learning", instructor: "Sarah Johnson", attendance: false, loginTime: "—", logoutTime: "—", sessionDuration: "—", status: "Absent" },
  { id: "6", studentName: "Olivia Martinez", avatar: "/home/banner.jpg", course: "Advanced Machine Learning", instructor: "Sarah Johnson", attendance: true, loginTime: "09:10 AM", logoutTime: "11:40 AM", sessionDuration: "2h 30m", status: "Present" },
  { id: "7", studentName: "Ryan Cooper", avatar: "/home/banner.jpg", course: "Advanced Machine Learning", instructor: "Sarah Johnson", attendance: true, loginTime: "09:20 AM", logoutTime: "11:50 AM", sessionDuration: "2h 30m", status: "Present" },
  { id: "8", studentName: "Mia Thompson", avatar: "/home/banner.jpg", course: "Advanced Machine Learning", instructor: "Sarah Johnson", attendance: false, loginTime: "—", logoutTime: "—", sessionDuration: "—", status: "Absent" },
];
