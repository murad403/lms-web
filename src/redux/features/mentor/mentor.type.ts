export type MentorCourseContract = {
    id: number;
    organization_id: number;
    course_category: string;
    organization_name: string;
    course_id: number;
    course_title: string;
    course_price: string;
    revenue_share: number;
    expiry_date: string;
    status: string;
    course_thumbnail: string | null;
    created_at: string;
};

export type MentorCoursesResponse = {
    success: boolean;
    status: number;
    message: string;
    total: number;
    page: number;
    page_size: number;
    total_pages: number;
    next: string | null;
    previous: string | null;
    data: MentorCourseContract[];
};

export type MentorLiveClassSession = {
    id: number;
    title: string;
    instructor: string;
    instructor_name: string;
    course: number;
    course_title: string;
    topic: string;
    scheduled_date: string;
    scheduled_time: string;
    is_present: boolean;
    platform: string;
    class_link: string;
    is_recorded: boolean;
    created_at: string;
};

export type MentorLiveClassesData = {
    total_live_classes: number;
    upcoming_live_classes_count: number;
    past_live_classes_count: number;
    total_enrolled_students: number;
    upcoming_live_classes: MentorLiveClassSession[];
    past_live_classes: MentorLiveClassSession[];
};

export type MentorLiveClassesResponse = {
    success: boolean;
    status: number;
    message: string;
    data: MentorLiveClassesData;
};

