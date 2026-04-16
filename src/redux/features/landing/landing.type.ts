export type ApiResponse<T> = {
	success: boolean;
	status: number;
	message: string;
	data: T;
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

export type CourseDetailsData = LandingCourse & {
	description: string;
	reviews_count: number;
	outcomes: LandingCourseOutcome[];
	requirements: LandingCourseRequirement[];
	sections: LandingCourseSection[];
	related_courses: LandingRelatedCourse[];
};

export type CourseDetailsResponse = ApiResponse<CourseDetailsData>;
