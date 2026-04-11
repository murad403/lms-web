// Profile related types and mock data

export type TUserProfile = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  age: number;
  registrationDate: string;
  title: string;
  bio: string;
  avatar: string;
};

export type TCertificate = {
  id: string;
  courseName: string;
  date: string;
  marks: number;
  outOf: number;
};

export type TWishlistCourse = {
  id: number;
  title: string;
  image: string;
  rating: number;
  reviews: string;
  price: number;
  originalPrice?: number;
  instructor: string;
};

export type TReview = {
  id: string;
  userName: string;
  avatar: string;
  rating: number;
  timeAgo: string;
  comment: string;
  isOwn: boolean;
};

export type TQuizAttempt = {
  id: string;
  title: string;
  numberOfQuestions: number;
};

export type TPurchaseItem = {
  id: string;
  title: string;
  image: string;
  instructor: string;
  price: number;
  rating: number;
};

export type TPurchaseGroup = {
  id: string;
  date: string;
  courses: number;
  totalPrice: number;
  paymentMethod: string;
  items: TPurchaseItem[];
};

export type TChatUser = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread?: number;
  online?: boolean;
};

export type TChatMessage = {
  id: string;
  senderId: string;
  text: string;
  time: string;
  isOwn: boolean;
};

export type TInvoice = {
  id: string;
  invoiceNo: string;
  title: string;
  amount: number;
  status: "Paid" | "Pending" | "Failed";
};

export type TQuizResult = {
  id: string;
  title: string;
  correctAnswer: number;
  totalQuestions: number;
  date: string;
  percentage: number;
};

export type TEnrolledCourse = {
  id: number;
  title: string;
  image: string;
  instructor: string;
  instructorAvatar: string;
  category: string;
  rating: number;
  reviews: string;
  price: number;
  progress: number;
};

export type TLiveClass = {
  id: string;
  title: string;
  courseName: string;
  instructor: string;
  date: string;
  time: string;
  meetLink: string;
};

export type TPastSession = {
  id: string;
  title: string;
  courseName: string;
  instructor: string;
  date: string;
  time: string;
  status: "Attended" | "Missed";
};

export type TLessonTracking = {
  id: string;
  module: string;
  lesson: string;
  watchTime: string;
  status: "Completed" | "In Progress" | "Not Started";
  date: string;
};

export type TExamAssessment = {
  id: string;
  title: string;
  instructor: string;
  completedLessons: number;
  totalLessons: number;
  progress: number;
  passingMark: number;
  status?: "Completed" | "Exam Eligible" | "Certificate Ready";
};

export type TQuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option
};

export type TQuizData = {
  id: string;
  title: string;
  questions: TQuizQuestion[];
};

export type TCourseSection = {
  id: string;
  title: string;
  lectureCount: number;
  totalDuration: string;
  completionPercent?: number;
  lectures: TCourseLecture[];
  hasQuiz?: boolean;
};

export type TCourseLecture = {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  videoUrl: string;
  isPlaying?: boolean;
};

export type TCheckoutCourse = {
  id: number;
  title: string;
  image: string;
  instructor: string;
  rating: number;
  reviews: string;
  price: number;
  originalPrice?: number;
};

export const certificates: TCertificate[] = [
  { id: "01", courseName: "UI/UX Design Certificate", date: "22 Aug 2025", marks: 20, outOf: 20 },
  { id: "02", courseName: "Wordpress Certificate", date: "10 Aug 2025", marks: 18, outOf: 20 },
  { id: "03", courseName: "HTML CSS Certificate", date: "26 Jul 2025", marks: 25, outOf: 30 },
  { id: "04", courseName: "JavaScript Certificate", date: "14 Jul 2025", marks: 15, outOf: 20 },
  { id: "05", courseName: "Photoshop Certificate", date: "19 Jun 2025", marks: 20, outOf: 30 },
  { id: "06", courseName: "Python Certificate", date: "12 Jun 2025", marks: 20, outOf: 20 },
];

export const wishlistCourses: TWishlistCourse[] = [
  {
    id: 1,
    title: "The Ultimate Drawing Course - Beginner to Advanced",
    image: "/courses/Course Images.png",
    rating: 4.8,
    reviews: "451,444 Reviews",
    price: 37.0,
    originalPrice: 49.0,
    instructor: "Harry Potter • John Wick",
  },
  {
    id: 2,
    title: "Digital Marketing Masterclass - 23 Courses in",
    image: "/courses/Course Images (1).png",
    rating: 4.8,
    reviews: "451,444 Reviews",
    price: 24.0,
    instructor: "Nobody",
  },
  {
    id: 3,
    title: "Angular - The Complete Guide (2021 Edition)",
    image: "/courses/Course Images (2).png",
    rating: 4.7,
    reviews: "451,444 Reviews",
    price: 13.0,
    instructor: "Kevin Gilbert",
  },
];

export const reviews: TReview[] = [
  {
    id: "1",
    userName: "Kevin Gilbert",
    avatar: "/home/user1.png",
    rating: 4,
    timeAgo: "4 months ago",
    comment: "Great tutorial! I'm subscribing. I'm just wondering if is this feasible to be materialized in a real project or can be integrated in an actual app code?",
    isOwn: true,
  },
  {
    id: "2",
    userName: "Kevin Gilbert",
    avatar: "/home/user1.png",
    rating: 5,
    timeAgo: "7 months ago",
    comment: "Great tutorial! I'm subscribing. I'm just wondering if is this feasible to be materialized in a real project or can be integrated in an actual app code?",
    isOwn: true,
  },
  {
    id: "3",
    userName: "Kevin Gilbert",
    avatar: "/home/user1.png",
    rating: 3,
    timeAgo: "6 weeks ago",
    comment: "Great tutorial! I'm subscribing. I'm just wondering if is this feasible to be materialized in a real project or can be integrated in an actual app code?",
    isOwn: true,
  },
  {
    id: "4",
    userName: "Kevin Gilbert",
    avatar: "/home/user1.png",
    rating: 4,
    timeAgo: "3 weeks ago",
    comment: "Great tutorial! I'm subscribing. I'm just wondering if is this feasible to be materialized in a real project or can be integrated in an actual app code?",
    isOwn: true,
  },
  {
    id: "5",
    userName: "Kevin Gilbert",
    avatar: "/home/user1.png",
    rating: 4,
    timeAgo: "2 weeks ago",
    comment: "Great tutorial! I'm subscribing. I'm just wondering if is this feasible to be materialized in a real project or can be integrated in an actual app code?",
    isOwn: true,
  },
  {
    id: "6",
    userName: "Arya Petrova",
    avatar: "/home/user1.png",
    rating: 5,
    timeAgo: "1 week ago",
    comment: "This course was exactly what I needed to level up my skills. The instructor was very knowledgeable and explained things clearly.",
    isOwn: false,
  },
];

export const quizAttempts: TQuizAttempt[] = [
  { id: "1", title: "Information About UI/UX Design Degree", numberOfQuestions: 5 },
  { id: "2", title: "Learn JavaScript and Express to become a Expert", numberOfQuestions: 10 },
  { id: "3", title: "Introduction to Python Programming", numberOfQuestions: 8 },
  { id: "4", title: "Build Responsive Websites with HTML5 and CSS3", numberOfQuestions: 5 },
  { id: "5", title: "Information About Photoshop Design Degree", numberOfQuestions: 12 },
  { id: "6", title: "C# Developers Double Your Coding with Visual Studio", numberOfQuestions: 7 },
];

export const purchaseHistory: TPurchaseGroup[] = [
  {
    id: "1",
    date: "08 February, 2026 at 11:30 PM",
    courses: 2,
    totalPrice: 75.0,
    paymentMethod: "Credit Card",
    items: [
      {
        id: "p1",
        title: "Learn Ethical Hacking From Scratch",
        image: "/courses/Course Images (5).png",
        instructor: "Jane Cooper",
        price: 13.99,
        rating: 4.7,
      },
      {
        id: "p2",
        title: "Mega Digital Marketing Course A-Z: 12 Courses in 1 + Updates",
        image: "/courses/Course Images (6).png",
        instructor: "Baron Howard",
        price: 49.0,
        rating: 4.7,
      },
    ],
  },
  {
    id: "2",
    date: "10 February, 2026 at 11:30 PM",
    courses: 2,
    totalPrice: 62.99,
    paymentMethod: "Credit Card",
    items: [
      {
        id: "p3",
        title: "Learn Ethical Hacking From Scratch",
        image: "/courses/Course Images (5).png",
        instructor: "Jane Cooper",
        price: 13.99,
        rating: 4.7,
      },
      {
        id: "p4",
        title: "Mega Digital Marketing Course A-Z: 12 Courses in 1 + Updates",
        image: "/courses/Course Images (6).png",
        instructor: "Baron Howard",
        price: 49.0,
        rating: 4.7,
      },
    ],
  },
];

export const chatUsers: TChatUser[] = [
  { id: "1", name: "Jane Cooper", avatar: "/home/user1.png", lastMessage: "Yeah sure, tell me...", time: "Just now", unread: 1, online: true },
  { id: "2", name: "Jenny Wilson", avatar: "/home/user1.png", lastMessage: "Thank you so much, sir", time: "2 d", online: false },
  { id: "3", name: "Marvin McKinney", avatar: "/home/user1.png", lastMessage: "You're Welcome", time: "1 m", online: true },
  { id: "4", name: "Eleanor Pena", avatar: "/home/user1.png", lastMessage: "Thank you so much, sir", time: "1 m", online: false },
  { id: "5", name: "Ronald Richards", avatar: "/home/user1.png", lastMessage: "Sorry, I can't help you", time: "3 m", online: false },
];

export const chatMessages: TChatMessage[] = [
  { id: "1", senderId: "ai", text: "Hello there! Instructor, Good evening, I have a question about the component, is this a good time to chat?", time: "Time", isOwn: false },
  { id: "2", senderId: "user", text: "Hello, Good Evening", time: "Time", isOwn: true },
  { id: "3", senderId: "user", text: "Sure, ask away", time: "", isOwn: true },
  { id: "4", senderId: "user", text: "what exactly do you want to know about component, ask don't hesitate to reach out, i will be always here for you.", time: "", isOwn: true },
  { id: "5", senderId: "ai", text: "Yeah sure, thanks", time: "", isOwn: false },
];

export const invoices: TInvoice[] = [
  { id: "1", invoiceNo: "#INV001", title: "Build Responsive Real World Websites...", amount: 200, status: "Paid" },
  { id: "2", invoiceNo: "#INV002", title: "Wordpress for Beginners", amount: 310, status: "Paid" },
  { id: "3", invoiceNo: "#INV003", title: "Information About UI/UX Design Degree", amount: 270, status: "Paid" },
  { id: "4", invoiceNo: "#INV004", title: "Sketch from A to Z (2024)", amount: 180, status: "Paid" },
  { id: "5", invoiceNo: "#INV005", title: "Become an app designer", amount: 220, status: "Paid" },
];

export const quizResults: TQuizResult[] = [
  { id: "1", title: "Sketch from A to Z (2024)", correctAnswer: 15, totalQuestions: 22, date: "15 Jan 2026", percentage: 95 },
  { id: "2", title: "Build Responsive Real World", correctAnswer: 18, totalQuestions: 22, date: "15 Jan 2026", percentage: 91 },
  { id: "3", title: "UI/UX Design Degree", correctAnswer: 25, totalQuestions: 30, date: "15 Jan 2026", percentage: 75 },
  { id: "4", title: "Build Responsive Real World", correctAnswer: 15, totalQuestions: 20, date: "15 Jan 2026", percentage: 67 },
  { id: "5", title: "Become an app designer", correctAnswer: 12, totalQuestions: 20, date: "15 Jan 2026", percentage: 20 },
];

export const enrolledCourses: TEnrolledCourse[] = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  title: "Information About UI/UX Design Degree",
  image: "/courses/Course Images (3).png",
  instructor: "David Benitez",
  instructorAvatar: "/home/user1.png",
  category: "Design",
  rating: 4.9,
  reviews: "200 Reviews",
  price: 120,
  progress: 61,
}));

export const upcomingLiveClasses: TLiveClass[] = [
  { id: "1", title: "User Research Methods", courseName: "React Masterclass", instructor: "Sarah Johnson", date: "2024-01-15", time: "10:00 AM - 11:30 AM", meetLink: "https://meet.google.com/abc-defg-hij" },
  { id: "2", title: "Pandas DataFrames", courseName: "React Masterclass", instructor: "Michael Chen", date: "2024-01-15", time: "10:00 AM - 11:30 AM", meetLink: "https://meet.google.com/abc-defg-hij" },
  { id: "3", title: "User Research Methods", courseName: "React Masterclass", instructor: "Sarah Johnson", date: "2024-01-15", time: "10:00 AM - 11:30 AM", meetLink: "https://meet.google.com/abc-defg-hij" },
];

export const pastSessions: TPastSession[] = [
  { id: "1", title: "State Management Basics", courseName: "React Masterclass", instructor: "Sarah Johnson", date: "2024-01-15", time: "10:00 AM - 11:30 AM", status: "Attended" },
  { id: "2", title: "Introduction to React 18", courseName: "React Masterclass", instructor: "Sarah Johnson", date: "2024-01-15", time: "10:00 AM - 11:30 AM", status: "Attended" },
  { id: "3", title: "NumPy Fundamentals", courseName: "React Masterclass", instructor: "Sarah Johnson", date: "2024-01-15", time: "10:00 AM - 11:30 AM", status: "Missed" },
  { id: "4", title: "Design Thinking Process", courseName: "React Masterclass", instructor: "Sarah Johnson", date: "2024-01-15", time: "10:00 AM - 11:30 AM", status: "Attended" },
];

export const examAssessments: TExamAssessment[] = [
  { id: "1", title: "Information About UI/UX Design Degree", instructor: "Dr. Angela Yu", completedLessons: 360, totalLessons: 480, progress: 70, passingMark: 100 },
  { id: "2", title: "Information About UI/UX Design Degree", instructor: "Kirill Eremenko", completedLessons: 144, totalLessons: 320, progress: 45, passingMark: 100 },
  { id: "3", title: "Information About UI/UX Design Degree", instructor: "Stephanie Maarns", completedLessons: 390, totalLessons: 390, progress: 100, passingMark: 100, status: "Completed" },
  { id: "4", title: "Information About UI/UX Design Degree", instructor: "Daniel Walter Scott", completedLessons: 48, totalLessons: 240, progress: 20, passingMark: 100 },
  { id: "5", title: "Information About UI/UX Design Degree", instructor: "Andrei Neagoie", completedLessons: 310, totalLessons: 310, progress: 100, passingMark: 100, status: "Completed" },
];

export const lessonTracking: TLessonTracking[] = [
  { id: "1", module: "React Fundamentals", lesson: "Introduction to JSX", watchTime: "19min", status: "Completed", date: "2024-01-10" },
  { id: "2", module: "React Fundamentals", lesson: "Components & Props", watchTime: "25min", status: "Completed", date: "2024-01-10" },
  { id: "3", module: "React Fundamentals", lesson: "State Management", watchTime: "12min", status: "In Progress", date: "2024-01-10" },
  { id: "4", module: "Advanced React", lesson: "Hooks Deep Dive", watchTime: "0min", status: "Not Started", date: "2024-01-10" },
  { id: "5", module: "Advanced React", lesson: "Context API", watchTime: "0min", status: "Not Started", date: "2024-01-10" },
  { id: "6", module: "Python Basics", lesson: "Variables & Types", watchTime: "22min", status: "Completed", date: "2024-01-10" },
  { id: "7", module: "Python Basics", lesson: "Control Flow", watchTime: "32min", status: "Completed", date: "2024-01-10" },
];

// Quiz questions data for quiz modal
export const quizQuestionsData: TQuizData[] = [
  {
    id: "1",
    title: "Information About UI/UX Design Degree",
    questions: [
      {
        id: "q1",
        question: "What is the primary goal of user experience (UX) design?",
        options: [
          "Making the interface look beautiful",
          "Ensuring the product is easy and enjoyable to use",
          "Writing clean code",
          "Increasing the number of features",
        ],
        correctAnswer: 1,
      },
      {
        id: "q2",
        question: "Which of the following is a key principle of UI design?",
        options: [
          "Complexity",
          "Consistency",
          "Redundancy",
          "Obscurity",
        ],
        correctAnswer: 1,
      },
      {
        id: "q3",
        question: "What does wireframing help designers with?",
        options: [
          "Writing backend code",
          "Planning the layout and structure of a page",
          "Testing server performance",
          "Creating marketing campaigns",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "2",
    title: "Learn JavaScript and Express to become a Expert",
    questions: [
      {
        id: "q1",
        question: "What is a closure in JavaScript?",
        options: [
          "A way to close the browser window",
          "A function that has access to its outer scope variables",
          "A method to end a loop",
          "A type of error handling",
        ],
        correctAnswer: 1,
      },
      {
        id: "q2",
        question: "What does Express.js primarily help with?",
        options: [
          "Database management",
          "Frontend rendering",
          "Building web server applications",
          "CSS styling",
        ],
        correctAnswer: 2,
      },
      {
        id: "q3",
        question: "Which HTTP method is typically used to create a new resource?",
        options: ["GET", "PUT", "POST", "DELETE"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "3",
    title: "Introduction to Python Programming",
    questions: [
      {
        id: "q1",
        question: "What is Python primarily known for?",
        options: [
          "Complex syntax",
          "Readability and simplicity",
          "Only web development",
          "Hardware programming",
        ],
        correctAnswer: 1,
      },
      {
        id: "q2",
        question: "Which data structure uses key-value pairs in Python?",
        options: ["List", "Tuple", "Dictionary", "Set"],
        correctAnswer: 2,
      },
      {
        id: "q3",
        question: "What keyword is used to define a function in Python?",
        options: ["function", "func", "def", "define"],
        correctAnswer: 2,
      },
    ],
  },
];

// Course Player types
export type TCourseComment = {
  id: string;
  userName: string;
  avatar: string;
  timeAgo: string;
  comment: string;
  replies?: TCourseComment[];
};

export type TCourseAttachment = {
  id: string;
  fileName: string;
  fileSize: string;
  fileUrl: string;
};

// Course player data
export const coursePlayerInfo = {
  title: "Complete Website Responsive Design: from Figma to Webflow to Website Design",
  sections: 8,
  totalLectures: 202,
  totalDuration: "19h 37m",
  studentsWatching: 512,
  lastUpdated: "Oct 26, 2020",
  comments: 154,
};

export const courseSections: TCourseSection[] = [
  {
    id: "s1",
    title: "Getting Started",
    lectureCount: 4,
    totalDuration: "51m",
    completionPercent: 25,
    lectures: [
      { id: "l1", title: "What is Webflow?", duration: "07:31", completed: true, videoUrl: "/videos/course-intro.mp4" },
      { id: "l2", title: "Sign up in Webflow", duration: "07:31", completed: false, videoUrl: "/videos/course-intro.mp4" },
      { id: "l3", title: "Teaser of Webflow", duration: "07:31", completed: false, videoUrl: "/videos/course-intro.mp4" },
      { id: "l4", title: "Figma Introduction", duration: "07:31", completed: false, videoUrl: "/videos/course-intro.mp4" },
    ],
    hasQuiz: true,
  },
  {
    id: "s2",
    title: "Secret of Good Design",
    lectureCount: 52,
    totalDuration: "5m 49m",
    lectures: [
      { id: "l5", title: "Understanding Color Theory", duration: "22:10", completed: false, videoUrl: "/videos/course-intro.mp4" },
      { id: "l6", title: "Typography Basics", duration: "15:30", completed: false, videoUrl: "/videos/course-intro.mp4" },
      { id: "l7", title: "Layout & Composition", duration: "20:45", completed: false, videoUrl: "/videos/course-intro.mp4" },
    ],
  },
  {
    id: "s3",
    title: "Practice Design Like an Artist",
    lectureCount: 43,
    totalDuration: "51m",
    lectures: [
      { id: "l8", title: "Sketching Fundamentals", duration: "25:00", completed: false, videoUrl: "/videos/course-intro.mp4" },
      { id: "l9", title: "Creating Mood Boards", duration: "18:15", completed: false, videoUrl: "/videos/course-intro.mp4" },
      { id: "l10", title: "Design Iteration Process", duration: "21:30", completed: false, videoUrl: "/videos/course-intro.mp4" },
    ],
  },
  {
    id: "s4",
    title: "Web Development (webflow)",
    lectureCount: 137,
    totalDuration: "10h 6m",
    lectures: [
      { id: "l11", title: "Webflow Interface Overview", duration: "16:40", completed: false, videoUrl: "/videos/course-intro.mp4" },
      { id: "l12", title: "Building Your First Page", duration: "19:55", completed: false, videoUrl: "/videos/course-intro.mp4" },
      { id: "l13", title: "Responsive Layouts", duration: "30:00", completed: false, videoUrl: "/videos/course-intro.mp4" },
    ],
  },
  {
    id: "s5",
    title: "Secrets of Making Money Freelancing",
    lectureCount: 21,
    totalDuration: "38m",
    lectures: [
      { id: "l14", title: "Finding Clients", duration: "12:00", completed: false, videoUrl: "/videos/course-intro.mp4" },
      { id: "l15", title: "Pricing Your Work", duration: "14:30", completed: false, videoUrl: "/videos/course-intro.mp4" },
      { id: "l16", title: "Building a Portfolio", duration: "11:30", completed: false, videoUrl: "/videos/course-intro.mp4" },
    ],
  },
  {
    id: "s6",
    title: "Advanced",
    lectureCount: 39,
    totalDuration: "1h 31m",
    lectures: [
      { id: "l17", title: "CMS Collections", duration: "22:00", completed: false, videoUrl: "/videos/course-intro.mp4" },
      { id: "l18", title: "Dynamic Content", duration: "18:45", completed: false, videoUrl: "/videos/course-intro.mp4" },
      { id: "l19", title: "Custom Code Integration", duration: "25:15", completed: false, videoUrl: "/videos/course-intro.mp4" },
    ],
  },
  {
    id: "s7",
    title: "What's Next",
    lectureCount: 7,
    totalDuration: "1h 17m",
    lectures: [
      { id: "l20", title: "Career Paths in Design", duration: "20:00", completed: false, videoUrl: "/videos/course-intro.mp4" },
      { id: "l21", title: "Continuing Education", duration: "15:00", completed: false, videoUrl: "/videos/course-intro.mp4" },
      { id: "l22", title: "Final Thoughts & Resources", duration: "22:00", completed: false, videoUrl: "/videos/course-intro.mp4" },
    ],
  },
];

// Checkout data
export const checkoutCourses: TCheckoutCourse[] = [
  {
    id: 1,
    title: "The Ultimate Drawing Course - Beginner to Advanced",
    image: "/courses/Course Images.png",
    instructor: "Harry Potter",
    rating: 4.8,
    reviews: "451,444",
    price: 37.0,
    originalPrice: 49.0,
  },
  {
    id: 2,
    title: "Digital Marketing Masterclass - 23 Courses in 1",
    image: "/courses/Course Images (1).png",
    instructor: "Nobody",
    rating: 4.6,
    reviews: "320,120",
    price: 24.0,
    originalPrice: 40.0,
  },
];
// Course player lecture description
export const lectureDescription = `We cover everything you need to build your first website. From creating your first page through to uploading your website to the internet. We'll use the world's most popular free web design tool called Visual Studio Code. There are exercises then you can download and then work along with me. At the end of each video, I have a downloadable version of where we are in the process so that you can compare your project with mine. This will enable you to see easily where you might have a problem. We will delve into all the good stuff such as how to create your very own mobile navigation menu from scratch learning some basic JavaScript and jQuery.

If that all sounds a little too fancy - don't worry, this course is aimed at people new to web design and who have never coded before. We'll start right at the beginning and work our way through step by step.`;

// Course player lecture notes
export const lectureNotes = `In ut aliquet ante. Curabitur mollis tincidunt turpis, sed aliquet mauris finibus vel. Praesent eget mi in mi maximus sagittis. Mauris eget ipsum in purus bibendum pellentesque. Sed id arcu in arcu elementum eleifend condimentum quis dolor. Phasellus tempus, urna ut auctor mattis, nisl tortor, tincidunt tortor, eu sagittis augus facilisi at amet sapien. Maecenas tristique aliquet neque, a fermentum augue tempor in. Aliquam torta ante, imperdiet in lacus a, posuere suscipit augue.

Nullam non quam a lectus finibus cursus nec a arcu. Aliquam officius sem cursus sit offictur turpis.
• Morbi sit amet pretium niblo. Donec blandit fermentum lobortis.
• Proin lectis sem in tincidunt tincidunt. Nam vel ex id libid suscipto. Donec lacrilis tincidunt mattis.
• Curabitur placerat vehicula dolor in sagittis.
• Donec ut diam vel lacus placerat vestibulum a id est. Mauris vestibulum mattis quix elt lectari, dictum maximus ipsum pellentesque.
• Sed elementum, libero id lacus aliquet, purus nibh consectetur mauris, aged interdum in lectus vitae sem.

Donec congue aliquet lorem nec congue. Suspendisse eu risus mattis, tincidunt ante sed, fringilla urna. Praesent mattis dictum sapien a iaculis. Id scelerisque magna aliquet. Aliquam eros guis consequat purus. Suspendisse eget sceleresque felis, Integer volutpata urna lacinia puris vehicula condimentum. Donec quis lacra quam. Curabitur quis moleste eros. Nam praesent suspiris versus, Sed uabortmqus lacitias molestum.`;

// Course player attachments
export const courseAttachments: TCourseAttachment[] = [
  {
    id: "1",
    fileName: "Create account on webflow.pdf",
    fileSize: "12.6 MB",
    fileUrl: "#",
  },
];

// Course player comments
export const courseComments: TCourseComment[] = [
  {
    id: "c1",
    userName: "Ronald Richards",
    avatar: "/home/user1.png",
    timeAgo: "1 week ago",
    comment: "Maecenas rhus tortor, tincidunt nec purus eu, gravida suscipit tortor.",
  },
  {
    id: "c2",
    userName: "Cody Fisher",
    avatar: "/home/user1.png",
    timeAgo: "1 week ago",
    comment: "Thank You so much sir, you're a great mentor. 🔥🔥🔥",
  },
  {
    id: "c3",
    userName: "Guy Hawkins",
    avatar: "/home/user1.png",
    timeAgo: "2 weeks ago",
    comment: "Thank you for your helpful video. May I ask what is the application use to demo the animation at [4:24], is it the runnable mobile application?\n\nAs what I know, Figma Mirror app cannot do that. Please help me.\n\nGreat thanks",
    replies: [
      {
        id: "c3r1",
        userName: "Kevin Gilbert",
        avatar: "/home/user1.png",
        timeAgo: "1 week ago",
        comment: "You're welcome! The app shown at 4:24 is a custom prototype built with ProtoPie. It allows more advanced interactions than Figma Mirror.",
      },
    ],
  },
  {
    id: "c4",
    userName: "Esther Howard",
    avatar: "/home/user1.png",
    timeAgo: "2 weeks ago",
    comment: "Quality content 🔥",
  },
  {
    id: "c5",
    userName: "Theresa Webb",
    avatar: "/home/user1.png",
    timeAgo: "3 weeks ago",
    comment: "Now I know that I will spent that 5 minutes of my life with pure pleasure",
  },
  {
    id: "c6",
    userName: "Marvin McKinney",
    avatar: "/home/user1.png",
    timeAgo: "3 weeks ago",
    comment: "Great tutorial! I'm subscribing. I'm just wondering if is this feasible to be materialized in a real project or can be integrated in an actual app code?",
  },
  {
    id: "c7",
    userName: "Darrell Steward",
    avatar: "/home/user1.png",
    timeAgo: "1 month ago",
    comment: "Awesome video. Sometimes, we have got to try and push the possibilities of designs and not be bounded by codes. The fact that the design itself is a push from the norm, it is only expected that to code it would require some level of thinking out of the box. That is what differentiates yourself from others who are just building on top of someone else's code.",
  },
  {
    id: "c8",
    userName: "Floyd Miles",
    avatar: "/home/user1.png",
    timeAgo: "1 month ago",
    comment: "I really hope you create more series of this UI + AE tutorials :)",
  },
  {
    id: "c9",
    userName: "Courtney Henry",
    avatar: "/home/user1.png",
    timeAgo: "1 month ago",
    comment: "Imagine seeing this while being a front end programmer.",
  },
  {
    id: "c10",
    userName: "Brooklyn Simmons",
    avatar: "/home/user1.png",
    timeAgo: "2 months ago",
    comment: "This is one of the best courses I've ever taken online. Highly recommended!",
  },
];
