import { Plan } from '@/src/lib/types';
import PlaceOfData from './PlaceOfData';
import KakaoMap from '../../MyRouteContent/KakaoMap';
import { useEffect, useState } from 'react';

interface LoadMoreModalProps {
  plan: Plan[];
}

const LoadMoreModal = ({ plan }: LoadMoreModalProps) => {
  const [dayData, setDayData] = useState<Plan[]>([]);
  useEffect(() => {
    if (plan.length > 0) {
      setDayData([plan[0]]);
    }
  }, [plan]);

  const handleDayClick = (clickedDay: number) => {
    const selectedPlan = plan.find((p) => p.day === clickedDay);
    setDayData([selectedPlan]);
  };

  return (
    <main className="flex gap-20">
      <section className="overflow-auto w-200">
        {plan.map((planData) => (
          <article key={planData.day} onClick={() => handleDayClick(planData.day)} className="cursor-pointer">
            <div className="rounded-s bg-gray-20 p-10 mb-5">
              <strong>{planData.day}일차</strong>
            </div>
            {planData.place.map((placeData) => (
              <PlaceOfData key={placeData.index} data={placeData} />
            ))}
          </article>
        ))}
      </section>
      <section>
        {/* <div>지도 일자별 경로 표시</div> */}
        <KakaoMap courseData={dayData} className="w-500 h-450" />
        <p className="text-14 text-gray-60 mt-5">※n일차를 누르면 경로를 확인할 수 있습니다.※</p>
      </section>
    </main>
  );
};

export default LoadMoreModal;
