import CourseItem from './CourseItem';
import myCoursePageRequestInstance from '@/src/api/myPageRequest';
import { CourseData } from '@/src/lib/types';
import { useEffect, useState } from 'react';
import Button from '../common/button';
import Link from 'next/link';
import { useCoursePageRerenderStore } from '@/src/utils/zustand/useRerenderStore';
import { getCookie } from '@/src/utils/cookie';

const MyCourseContent = () => {
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const { coursePageRerender } = useCoursePageRerenderStore();
  const hasToken = getCookie('userId');
  console.log(courseData);

  useEffect(() => {
    const fetchMyCourseList = async () => {
      try {
        const course = await myCoursePageRequestInstance.getCourseList(hasToken);
        setCourseData(course);
      } catch (error) {
        console.error('Error fetching course list:', error);
      }
    };
    fetchMyCourseList();
  }, [coursePageRerender]);
  return (
    <>
      <div className="flex flex-col justify-center items-center pb-40">
        <h3 className="text-24 font-bold py-60">저장된 코스 목록</h3>
        <section className="list-none w-1280">
          {courseData && courseData.course.length > 0 ? (
            courseData.course.map((data, index) => (
              <CourseItem key={index} id={data.id} name={data.name} plan={data.plan} />
            ))
          ) : (
            <div className="flex flex-col items-center gap-10">
              <strong className="text-20">저장된 코스 목록이 존재하지 않습니다.</strong>
              <Button className="w-150 h-40 font-bold hover:bg-blue-500">
                <Link href="/course/new">지금 코스짜기</Link>
              </Button>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default MyCourseContent;
