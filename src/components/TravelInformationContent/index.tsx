import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import SearchBar from './SearchBar';
import ProductInformation from './ProductInformation';
import ChangeContent from './ChangeContent';

import TravelInformationMeta from '../common/meta/TravelInformationMeta';

import { VideoInformationProps } from '@/src/lib/types';
import instance from '@/src/api/axios';

const TravelInformation = () => {
  const [youtubeData, setYoutubeData] = useState<VideoInformationProps | null>(null);
  const [youtubeDataLoading, setYoutubeDataLoading] = useState(true);

  const route = useRouter();
  const videoId = route.query.id as string;

  useEffect(() => {
    if (videoId !== undefined) {
      const getVideoInformation = async () => {
        try {
          const response = await instance.get(`/video/${videoId}`);
          const result = response.data.data;
          setYoutubeData(result);
        } catch (error) {
          console.error(error);
        } finally {
          setYoutubeDataLoading(false);
        }
      };
      getVideoInformation();
    }
  }, [videoId]);

  return (
    <main className="flex flex-col justify-center items-center ">
      <TravelInformationMeta youtubeData={youtubeData} />
      <SearchBar />
      <ProductInformation youtubeData={youtubeData} loading={youtubeDataLoading} />
      <ChangeContent youtubeData={youtubeData} />
    </main>
  );
};

export default TravelInformation;
