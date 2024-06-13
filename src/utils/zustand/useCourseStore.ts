import { create } from 'zustand';

export interface Place {
  index: number;
  name: string;
  img: string;
  posX: number;
  posY: number;
}

interface Plan {
  day: number;
  place: Place[];
}

interface Course {
  id: number;
  name: string;
  plan: Plan[];
}

export interface CourseData {
  course: Course[];
}

type CourseStore = {
  data: CourseData;
  setData: (by: CourseData) => void;
  addDay: (courseId: number, newDay: Plan) => void;
  movePlace: (courseId: number, fromDay: number, fromIndex: number, toDay: number, toIndex: number) => void;
};

import { mockMyCourse } from '../../components/MyRouteContent/mockMyRoute';

export const useCourseStore = create<CourseStore>((set) => ({
  data: mockMyCourse,
  setData: (data) => set((state) => ({ ...state, data })),
  addDay: (courseId, newDay) =>
    set((state) => {
      const courseIndex = state.data.course.findIndex((course) => course.id === courseId);
      if (courseIndex !== -1) {
        state.data.course[courseIndex].plan.push(newDay);
      }
      return { ...state };
    }),
  movePlace: (courseId, fromDay, fromIndex, toDay, toIndex) =>
    set((state) => {
      const courseIndex = state.data.course.findIndex((course) => course.id === courseId);
      if (courseIndex !== -1) {
        const fromPlanIndex = state.data.course[courseIndex].plan.findIndex((plan) => plan.day === fromDay);
        const toPlanIndex = state.data.course[courseIndex].plan.findIndex((plan) => plan.day === toDay);
        if (fromPlanIndex !== -1 && toPlanIndex !== -1) {
          const fromPlaceIndex = state.data.course[courseIndex].plan[fromPlanIndex].place.findIndex(
            (place) => place.index === fromIndex,
          );
          if (fromPlaceIndex !== -1) {
            const placeToMove = state.data.course[courseIndex].plan[fromPlanIndex].place.splice(fromPlaceIndex, 1)[0];

            // Adjust toIndex if moving within the same plan and fromIndex is greater than toIndex
            const adjustedToIndex = fromDay === toDay && fromIndex > toIndex ? toIndex - 1 : toIndex;
            console.log('toDay: ', toDay);
            console.log('fromIndex: ', fromIndex);
            console.log('toIndex: ', toIndex);
            console.log('fromPlaceIndex: ', fromPlaceIndex);
            console.log('adjustedToIndex: ', adjustedToIndex);
            // Insert the moved place at the correct position in the destination day's list
            state.data.course[courseIndex].plan[toPlanIndex].place.splice(adjustedToIndex, 0, placeToMove);

            // 인덱스 값 오름차순으로 다시 재지정
            let globalIndex = 1;
            for (let j = 0; j < state.data.course[courseIndex].plan.length; j++) {
              for (let i = 0; i < state.data.course[courseIndex].plan[j].place.length; i++) {
                state.data.course[courseIndex].plan[j].place[i].index = globalIndex++;
              }
            }
          }
        }
      }
      return { ...state };
    }),
}));
