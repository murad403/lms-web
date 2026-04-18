export type ApiResponse<T> = {
	success: boolean;
	status: number;
	message: string;
	data: T;
};

export type PaginatedApiResponse<T> = {
	success: boolean;
	status: number;
	message: string;
	total: number;
	page: number;
	page_size: number;
	total_pages: number;
	next: string | null;
	previous: string | null;
	data: T[];
};

export type LandingInstructor = {
	id: string;
	name: string;
	email: string;
	phone: string;
	get_biography: string | null;
	avatar: string | null;
};

export type LandingCourseAdvanceInfo = {
	id: number;
	thumbnail: string | null;
	trailer_video: string | null;
	description: string;
};

export type LandingCourse = {
	id: number;
	title: string;
	subtitle: string;
	Category: string;
	topic: string;
	language: string;
	level: string;
	price: string;
	rating: number;
	duration: string;
	discount_price: string;
	coupon_code: string;
	expiry_type: string;
	status: string;
	modules: number;
	lectures: number;
	quizes: number;
	instructor: LandingInstructor;
	advance_info: LandingCourseAdvanceInfo;
	is_wishlisted: boolean;
	reviews_count?: number;
	description?: string;
	outcomes?: LandingCourseOutcome[];
	requirements?: LandingCourseRequirement[];
	sections?: LandingCourseSection[];
	related_courses?: LandingRelatedCourse[];
};

export type HomeCoursesData = {
	trending_courses: LandingCourse[];
	featured_courses: LandingCourse[];
	most_requested_courses: LandingCourse[];
	instructors: LandingInstructorProfile[];
};

export type HomeCoursesResponse = ApiResponse<HomeCoursesData>;

export type LandingInstructorProfile = {
	id: string;
	Instructor_name: string;
	title: string | null;
	biography: string | null;
	avatar: string | null;
};

export type LandingCourseOutcome = {
	id: number;
	text: string;
	order: number;
};

export type LandingCourseRequirement = {
	id: number;
	text: string;
	order: number;
};

export type LandingCourseLecture = {
	id: number;
	name: string;
	order: number;
	description: string;
	video_file: string | null;
	LectureAttachment: string | null;
	LectureNoteFile: string | null;
};

export type LandingCourseSection = {
	id: number;
	name: string;
	order: number;
	lectures: LandingCourseLecture[];
};

export type LandingRelatedCourse = {
	id: number;
	title: string;
};

export type LandingCategory = {
	id: number;
	name: string;
	slug: string;
	description: string;
	created_at: string;
	updated_at: string;
};

export type CoursesQueryParams = {
	page?: number;
	page_size?: number;
	search?: string;
	category?: string;
	rating?: string;
	level?: string;
	min_price?: string;
	max_price?: string;
	price_type?: string;
	duration?: string;
	ordering?: string;
};

export type CourseDetailsData = LandingCourse & {
	description: string;
	reviews_count: number;
	outcomes: LandingCourseOutcome[];
	requirements: LandingCourseRequirement[];
	sections: LandingCourseSection[];
	related_courses: LandingRelatedCourse[];
};

export type CourseDetailsResponse = ApiResponse<CourseDetailsData>;
export type CoursesResponse = PaginatedApiResponse<LandingCourse>;
export type CategoriesResponse = ApiResponse<LandingCategory[]>;
