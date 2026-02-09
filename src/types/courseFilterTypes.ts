export type CourseFilterFormData = {
    search: string;
    category: string;
    rating: string;
    courseLevel: string;
    priceMin: string;
    priceMax: string;
    priceType: string;
    duration: string;
    sortBy: string;
};

export const defaultFilterValues: CourseFilterFormData = {
    search: '',
    category: '',
    rating: '',
    courseLevel: '',
    priceMin: '',
    priceMax: '',
    priceType: '',
    duration: '',
    sortBy: 'trending',
};
