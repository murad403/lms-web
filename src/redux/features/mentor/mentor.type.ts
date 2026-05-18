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
