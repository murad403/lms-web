import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
export { useOwnerCourseDetailsQuery, useMyCoursesQuery, useCourseAccreditationQuery, useCertificateListQuery } from "./features/instructor/instructor.api";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
