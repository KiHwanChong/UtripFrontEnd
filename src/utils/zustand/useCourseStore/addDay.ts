// import { CourseStore } from "./useCourseStore";

export const addDay = (state, courseId, newDay) => {
  const courseIndex = state.data.course.findIndex((course) => course.id === courseId);
  if (courseIndex !== -1) {
    state.data.course[courseIndex].plan.push(newDay);
  }
  return { ...state };
};
