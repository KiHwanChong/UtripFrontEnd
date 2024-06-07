import React from 'react';
import CarouselCard from './CarouselCard';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
// import 'swiper/css/pagination';
import { mock } from '@/src/components/mainContent/mock';
import CarouselMain from './CarouselMain';
const CarouselSection = () => {
  const hotCards = mock.data.slice(0, 5);
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      rewind={true}
      navigation={true}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      pagination={{ clickable: true }}
      spaceBetween={10}
      slidesPerView="auto"
    >
      <SwiperSlide>
        <CarouselMain />
      </SwiperSlide>
      {hotCards.map((datas, index) => (
        <SwiperSlide key={`carousel${index}`}>
          <CarouselCard data={datas} key={index} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CarouselSection;
