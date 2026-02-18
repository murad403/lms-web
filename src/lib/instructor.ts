// Instructor related types and mock data

export type TInstructorProfile = {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  bio: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  studentCount: number;
  courseCount: number;
  email: string;
  phone: string;
  socialLinks: {
    website?: string;
    twitter?: string;
    linkedin?: string;
  };
};

export type TInstructorCourse = {
  id: number;
  title: string;
  image: string;
  category: string;
  rating: number;
  reviews: string;
  students: string;
  price: number;
  status: "Published" | "Draft" | "Under Review";
};

export type TInstructorCourseDetail = {
  id: number;
  title: string;
  image: string;
  description: string;
  creators: string[];
  rating: number;
  ratingCount: string;
  price: number;
  totalRevenue: number;
  lectureCount: number;
  lectureSize: string;
  totalComments: number;
  studentsEnrolled: number;
  attachFiles: number;
  attachSize: string;
  language: string;
  totalHours: string;
  publishedDate: string;
  lastUpdated: string;
};

export type TDashboardStats = {
  coursesCreated: number;
  activeCourses: number;
  studentsEnrolled: number;
  onlineStudents: number;
  onlineCourses: number;
  totalEarning: number;
};

export type TRecentActivity = {
  id: string;
  type: "comment" | "rating" | "purchase";
  userName: string;
  action: string;
  courseName: string;
  time: string;
};

export type TRevenueData = {
  label: string;
  value: number;
};

export type TRatingBreakdown = {
  star: number;
  percentage: number;
};

export type TCourseOverviewData = {
  label: string;
  comments: number;
  views: number;
};

export type TEarningStats = {
  totalRevenue: number;
  currentBalance: number;
  totalWithdrawals: number;
  todayRevenue: number;
};

export type TPaymentCard = {
  id: string;
  type: "visa" | "mastercard";
  lastFour: string;
  expiry: string;
  holderName: string;
  isDefault?: boolean;
};

export type TWithdrawalHistory = {
  id: string;
  date: string;
  method: string;
  amount: string;
  provider: string;
  status: "Pending" | "Completed" | "Cancelled" | "Cancel Withdraw";
};

export type TStatisticData = {
  label: string;
  value: number;
};

export type TAccreditationSubmission = {
  id: string;
  course: string;
  submitted: string;
  certificateType: string;
  status: "Approved" | "Pending" | "Needs Revision" | "Rejected";
};

export type TActiveCertificate = {
  id: string;
  courseName: string;
  certId: string;
  issued: number;
  validUntil: string;
  status: "Active";
};

export type TAccreditationStats = {
  approvedCourses: number;
  pendingReview: number;
  certificatesIssued: number;
  activeCertificates: number;
};

export type TLiveClassStats = {
  totalClasses: number;
  upcomingClasses: number;
  studentsEnrolled: number;
};

export type TInstructorLiveClass = {
  id: string;
  title: string;
  courseName: string;
  instructor: string;
  date: string;
  time: string;
  meetLink: string;
};

export type TInstructorPastClass = {
  id: string;
  title: string;
  courseName: string;
  instructor: string;
  date: string;
  time: string;
  status: "Attended" | "Missed";
};

// Create Course Types
export type TCourseLecture = {
  id: string;
  title: string;
  type: "video" | "document" | "quiz";
  duration?: string;
};

export type TCourseSection = {
  id: string;
  title: string;
  lectures: TCourseLecture[];
};

export type TQuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
};

export type TQuiz = {
  id: string;
  title: string;
  sectionId: string;
  timeLimit: number;
  passingScore: number;
  questions: TQuizQuestion[];
};

export type TBasicInfoForm = {
  title: string;
  category: string;
  level: string;
  language: string;
  price: string;
  discount: string;
  thumbnail: File | null;
  trailer: File | null;
};

export type TAdvanceInfoForm = {
  description: string;
  requirements: string[];
  whatYouWillTeach: string[];
  tags: string[];
};

// Mock Data

export const instructorProfile: TInstructorProfile = {
  id: "1",
  firstName: "Fillipo",
  lastName: "Franzies",
  title: "Web Designer & Best-Selling Instructor",
  bio: "I'm a passionate educator who loves to share knowledge in a fun, engaging way. I created some of the world's most popular online learning programs and have helped millions of students master new skills. I'm originally from Italy, but I've been living and teaching internationally for over 10 years, traveling the world and creating content that makes complex topics approachable and enjoyable.\n\nMy teaching philosophy centers on practical, real-world skills. By combining theory with hands-on projects, I help students build confidence and competence. I believe that anyone can learn anything if the concepts are broken down clearly. Digital platforms have democratized education in a world-changing way.\n\nI'm always eager to connect with my students via social media and here on the platform. Drop me a message, leave a review, or just say hi—your feedback makes my day.",
  avatar: "/home/banner.jpg",
  rating: 0.0,
  reviewCount: 0,
  studentCount: 0,
  courseCount: 0,
  email: "fillipo@instructor.com",
  phone: "+880 1633012838",
  socialLinks: {
    website: "https://fillipo.dev",
    twitter: "https://twitter.com/fillipo",
    linkedin: "https://linkedin.com/in/fillipo",
  },
};

export const instructorCourses: TInstructorCourse[] = [
  {
    id: 1,
    title: "Premiere Pro CC for Beginners: Video Editing in Premiere",
    image: "/courses/Course Images.png",
    category: "DEVELOPMENT",
    rating: 4.9,
    reviews: "962,041",
    students: "962,041",
    price: 24.0,
    status: "Published",
  },
  {
    id: 2,
    title: "Learn Python Programming Masterclass",
    image: "/courses/Course Images (1).png",
    category: "DEVELOPMENT",
    rating: 4.9,
    reviews: "811,223",
    students: "811,223",
    price: 49.0,
    status: "Published",
  },
  {
    id: 3,
    title: "Data Structures & Algorithms Essentials (2021)",
    image: "/courses/Course Images (2).png",
    category: "DEVELOPMENT",
    rating: 5.0,
    reviews: "197,837",
    students: "197,837",
    price: 23.0,
    status: "Published",
  },
  {
    id: 4,
    title: "Machine Learning A-Z™: Hands-On Python & R In Data Science",
    image: "/courses/Course Images (3).png",
    category: "DEVELOPMENT",
    rating: 4.8,
    reviews: "211,434",
    students: "211,434",
    price: 9.0,
    status: "Draft",
  },
  {
    id: 5,
    title: "Complete Blender Creator: Learn 3D Modelling for Beginners",
    image: "/courses/Course Images (4).png",
    category: "DEVELOPMENT",
    rating: 4.5,
    reviews: "435,671",
    students: "435,671",
    price: 18.0,
    status: "Published",
  },
  {
    id: 6,
    title: "SQL for NEWBS: Weekender Crash Course",
    image: "/courses/Course Images (5).png",
    category: "DEVELOPMENT",
    rating: 4.7,
    reviews: "154,837",
    students: "154,837",
    price: 13.0,
    status: "Published",
  },
  {
    id: 7,
    title: "SEO 2023: Complete SEO Training + SEO for WordPress Websites",
    image: "/courses/Course Images (6).png",
    category: "DEVELOPMENT",
    rating: 4.9,
    reviews: "161,073",
    students: "161,073",
    price: 57.0,
    status: "Under Review",
  },
  {
    id: 8,
    title: "Angular - The Complete Guide (2021 Edition)",
    image: "/courses/Course Images.png",
    category: "DEVELOPMENT",
    rating: 4.6,
    reviews: "236,568",
    students: "236,568",
    price: 32.0,
    status: "Published",
  },
  {
    id: 9,
    title: "Graphic Design Masterclass - Learn GREAT Design",
    image: "/courses/Course Images (1).png",
    category: "DEVELOPMENT",
    rating: 5.0,
    reviews: "1,395,236",
    students: "1,395,236",
    price: 89.0,
    status: "Published",
  },
  {
    id: 10,
    title: "[NEW] Ultimate AWS Certified Cloud Practitioner - 2021",
    image: "/courses/Course Images (2).png",
    category: "DEVELOPMENT",
    rating: 4.5,
    reviews: "426,071",
    students: "426,071",
    price: 24.0,
    status: "Published",
  },
  {
    id: 11,
    title: "2021 Complete Python Bootcamp From Zero to Hero in Python",
    image: "/courses/Course Images (3).png",
    category: "DEVELOPMENT",
    rating: 4.3,
    reviews: "418,071",
    students: "418,071",
    price: 18.0,
    status: "Published",
  },
  {
    id: 12,
    title: "Instagram Marketing 2021: Complete Guide to Instagram Gre...",
    image: "/courses/Course Images (4).png",
    category: "DEVELOPMENT",
    rating: 4.6,
    reviews: "854",
    students: "854",
    price: 35.0,
    status: "Published",
  },
  {
    id: 13,
    title: "Complete Adobe Lightroom Megacourse: Beginner to Expert",
    image: "/courses/Course Images (5).png",
    category: "DEVELOPMENT",
    rating: 4.6,
    reviews: "864",
    students: "864",
    price: 23.0,
    status: "Published",
  },
  {
    id: 14,
    title: "The Python Mega Course: Build 10 Real World Applications",
    image: "/courses/Course Images (6).png",
    category: "DEVELOPMENT",
    rating: 4.7,
    reviews: "164,837",
    students: "164,837",
    price: 89.0,
    status: "Published",
  },
  {
    id: 15,
    title: "The Ultimate Drawing Course - Beginner to Advanced",
    image: "/courses/Course Images.png",
    category: "DEVELOPMENT",
    rating: 4.5,
    reviews: "3,711",
    students: "3,711",
    price: 35.0,
    status: "Published",
  },
];

export const instructorCourseDetail: TInstructorCourseDetail = {
  id: 1,
  title: "2026 Complete Python Course from beginner to advance",
  image: "/courses/Course Images.png",
  description: "3 in 1 Course: Learn to design websites with Figma, build with Webflow, and make a living freelancing.",
  creators: ["Kevin Gilbert", "Kristin Watson"],
  rating: 4.8,
  ratingCount: "451,444 Rating",
  price: 13.99,
  totalRevenue: 131800455.82,
  lectureCount: 1957,
  lectureSize: "170.3 GB",
  totalComments: 51429,
  studentsEnrolled: 9419418,
  attachFiles: 142,
  attachSize: "14.4 GB",
  language: "English",
  totalHours: "19:37:51",
  publishedDate: "Jan 21, 2024",
  lastUpdated: "Feb 02, 2025",
};

export const dashboardStats: TDashboardStats = {
  coursesCreated: 4,
  activeCourses: 4,
  studentsEnrolled: 400,
  onlineStudents: 400,
  onlineCourses: 3,
  totalEarning: 7461767,
};

export const recentActivities: TRecentActivity[] = [
  { id: "1", type: "comment", userName: "Kevin", action: "comments on your lecture \"What is ux\" in", courseName: "2021 ui/ux design with figma", time: "Just now" },
  { id: "2", type: "rating", userName: "John", action: "give a 5 star rating on your course", courseName: "2021 ui/ux design with figma", time: "5 mins ago" },
  { id: "3", type: "purchase", userName: "Sraboni", action: "purchase your course", courseName: "2021 ui/ux design with figma", time: "6 mins ago" },
  { id: "4", type: "purchase", userName: "Arif", action: "purchase your course", courseName: "2021 ui/ux design with figma", time: "6 mins ago" },
  { id: "5", type: "purchase", userName: "Arif", action: "purchase your course", courseName: "2021 ui/ux design with figma", time: "6 mins ago" },
  { id: "6", type: "purchase", userName: "Arif", action: "purchase your course", courseName: "2021 ui/ux design with figma", time: "6 mins ago" },
  { id: "7", type: "purchase", userName: "Arif", action: "purchase your course", courseName: "2021 ui/ux design with figma", time: "6 mins ago" },
  { id: "8", type: "purchase", userName: "Arif", action: "purchase your course", courseName: "2021 ui/ux design with figma", time: "6 mins ago" },
  { id: "9", type: "purchase", userName: "Arif", action: "purchase your course", courseName: "2021 ui/ux design with figma", time: "6 mins ago" },
  { id: "10", type: "purchase", userName: "Arif", action: "purchase your course", courseName: "2021 ui/ux design with figma", time: "6 mins ago" },
  { id: "11", type: "purchase", userName: "Arif", action: "purchase your course", courseName: "2021 ui/ux design with figma", time: "6 mins ago" },
];

export const revenueData: TRevenueData[] = [
  { label: "Aug 01", value: 200000 },
  { label: "Aug 05", value: 150000 },
  { label: "Aug 10", value: 500000 },
  { label: "Aug 15", value: 800000 },
  { label: "Aug 17", value: 517490 },
  { label: "Aug 20", value: 600000 },
  { label: "Aug 25", value: 300000 },
  { label: "Aug 31", value: 450000 },
];

export const ratingBreakdown: TRatingBreakdown[] = [
  { star: 5, percentage: 56 },
  { star: 4, percentage: 37 },
  { star: 3, percentage: 8 },
  { star: 2, percentage: 1 },
  { star: 1, percentage: 1 },
];

export const courseOverviewData: TCourseOverviewData[] = [
  { label: "Sun", comments: 50000, views: 100000 },
  { label: "Mon", comments: 80000, views: 150000 },
  { label: "Tue", comments: 100000, views: 200000 },
  { label: "Wed", comments: 120000, views: 500000 },
  { label: "Thu", comments: 90000, views: 250000 },
  { label: "Fri", comments: 60000, views: 170000 },
  { label: "Sat", comments: 40000, views: 120000 },
];

export const earningStats: TEarningStats = {
  totalRevenue: 13804.0,
  currentBalance: 16593.0,
  totalWithdrawals: 13184.0,
  todayRevenue: 162.0,
};

export const paymentCards: TPaymentCard[] = [
  { id: "1", type: "visa", lastFour: "4855", expiry: "04/24", holderName: "Vako Shvili", isDefault: true },
  { id: "2", type: "mastercard", lastFour: "3855", expiry: "04/24", holderName: "Vako Shvili" },
];

export const withdrawalHistory: TWithdrawalHistory[] = [
  { id: "1", date: "21 Sep, 2021 at 2:14 AM", method: "Mastercard", amount: "234", provider: "American Express", status: "Pending" },
  { id: "2", date: "21 Sep, 2021 at 2:14 AM", method: "Visa", amount: "234", provider: "American Express", status: "Pending" },
  { id: "3", date: "21 Sep, 2021 at 2:14 AM", method: "Visa", amount: "234", provider: "American Expr...", status: "Cancel Withdraw" },
  { id: "4", date: "21 Sep, 2021 at 2:14 AM", method: "Mastercard", amount: "234", provider: "American Express", status: "Completed" },
  { id: "5", date: "21 Sep, 2021 at 2:14 AM", method: "Visa", amount: "234", provider: "American Express", status: "Completed" },
  { id: "6", date: "21 Sep, 2021 at 2:14 AM", method: "Mastercard", amount: "234", provider: "American Express", status: "Cancelled" },
  { id: "7", date: "21 Sep, 2021 at 2:14 AM", method: "Mastercard", amount: "234", provider: "American Express", status: "Completed" },
];

export const statisticData: TStatisticData[] = [
  { label: "Aug 01", value: 1000 },
  { label: "Aug 05", value: 1500 },
  { label: "Aug 10", value: 3000 },
  { label: "Aug 15", value: 5114900 },
  { label: "Aug 20", value: 2500 },
  { label: "Aug 25", value: 1200 },
  { label: "Aug 31", value: 1800 },
];

export const accreditationStats: TAccreditationStats = {
  approvedCourses: 2,
  pendingReview: 1,
  certificatesIssued: 2139,
  activeCertificates: 1987,
};

export const accreditationSubmissions: TAccreditationSubmission[] = [
  { id: "ACC-001", course: "Advanced Machine Learning", submitted: "1/5/2024", certificateType: "Professional", status: "Approved" },
  { id: "ACC-002", course: "Deep Learning Fundamentals", submitted: "1/8/2024", certificateType: "Standard", status: "Pending" },
  { id: "ACC-003", course: "NLP with Transformers", submitted: "1/10/2024", certificateType: "Professional", status: "Needs Revision" },
  { id: "ACC-004", course: "Computer Vision Basics", submitted: "12/15/2023", certificateType: "Standard", status: "Rejected" },
];

export const activeCertificates: TActiveCertificate[] = [
  { id: "1", courseName: "Advanced Machine Learning", certId: "CERT-001", issued: 1247, validUntil: "1/5/2027", status: "Active" },
  { id: "2", courseName: "UX Design Masterclass", certId: "CERT-002", issued: 1247, validUntil: "1/5/2027", status: "Active" },
];

export const liveClassStats: TLiveClassStats = {
  totalClasses: 10,
  upcomingClasses: 5,
  studentsEnrolled: 10000,
};

export const instructorLiveClasses: TInstructorLiveClass[] = [
  { id: "1", title: "User Research Methods", courseName: "React Masterclass", instructor: "Sarah Johnson", date: "2024-01-15", time: "10:00 AM - 11:30 AM", meetLink: "#" },
  { id: "2", title: "Pandas DataFrames", courseName: "React Masterclass", instructor: "Michael Chen", date: "2024-01-15", time: "10:00 AM - 11:30 AM", meetLink: "#" },
  { id: "3", title: "User Research Methods", courseName: "React Masterclass", instructor: "Sarah Johnson", date: "2024-01-15", time: "10:00 AM - 11:30 AM", meetLink: "#" },
];

export const instructorPastClasses: TInstructorPastClass[] = [
  { id: "1", title: "State Management Basics", courseName: "React Masterclass", instructor: "Sarah Johnson", date: "2024-01-15", time: "10:00 AM - 11:30 AM", status: "Attended" },
  { id: "2", title: "Introduction to React 18", courseName: "React Masterclass", instructor: "Sarah Johnson", date: "2024-01-15", time: "10:00 AM - 11:30 AM", status: "Attended" },
  { id: "3", title: "NumPy Fundamentals", courseName: "React Masterclass", instructor: "Sarah Johnson", date: "2024-01-15", time: "10:00 AM - 11:30 AM", status: "Missed" },
  { id: "4", title: "Design Thinking Process", courseName: "React Masterclass", instructor: "Sarah Johnson", date: "2024-01-15", time: "10:00 AM - 11:30 AM", status: "Attended" },
];

export const accreditationGuidelines = {
  courseRequirements: [
    "Minimum 10 hours of content for Standard certification",
    "Minimum 20 hours of content for Professional certification",
    "At least 3 assessments or quizzes",
    "Clear learning objectives for each module",
    "High-quality video and audio content",
  ],
  reviewProcess: [
    "Submit course for review with all materials",
    "Initial review within 3-5 business days",
    "Feedback provided if revisions needed",
    "Final approval and certificate activation",
  ],
};

export const courseSelectOptions = [
  { value: "computer-vision", label: "Computer Vision Basics" },
  { value: "nlp-transformers", label: "NLP with Transformers (Draft)" },
];

export const certificateTypeOptions = [
  { value: "enterprise", label: "Enterprise (5 years validity)" },
  { value: "professional", label: "Professional (3 years validity)" },
  { value: "standard", label: "Standard (2 years validity)" },
];

export const organizationOptions = [
  { value: "org-1", label: "Tech Academy" },
  { value: "org-2", label: "Digital Learning Institute" },
];

export const courseCategoryOptions = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "business", label: "Business" },
  { value: "marketing", label: "Marketing" },
  { value: "data-science", label: "Data Science" },
  { value: "photography", label: "Photography" },
  { value: "music", label: "Music" },
];

export const courseLevelOptions = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "all-levels", label: "All Levels" },
];

export const courseLanguageOptions = [
  { value: "english", label: "English" },
  { value: "italian", label: "Italian" },
  { value: "spanish", label: "Spanish" },
  { value: "french", label: "French" },
  { value: "german", label: "German" },
];
