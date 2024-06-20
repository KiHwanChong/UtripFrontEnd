import ProductDescription from '../ProductDescription';
import ProductReview from '../ProudctReview';

import combineStyle from '@/src/utils/combineStyle';
import useSelectContent from '@/src/hooks/useSelectContent';
import { VideoInformationProps } from '@/src/lib/types';

const contentButtonStyle = {
  base: 'w-334 pt-25 pb-28 h-full text-22',
  selected: 'border-b-black border-b-4 font-bold',
  notSelected: 'border-b-gray-200',
};

interface ChaneContentProps {
  youtubeData: VideoInformationProps | null;
}

const ChangeContent = ({ youtubeData }: ChaneContentProps) => {
  const { content, handleSelectContent } = useSelectContent('product');

  const selectDescriptionContent = content === 'product';
  const selectReviewContent = content === 'review';

  return (
    <>
      <div id="top" className="flex justify-center w-full items-center bg-white">
        <button
          className={combineStyle({
            isSelected: selectDescriptionContent,
            base: contentButtonStyle.base,
            selected: contentButtonStyle.selected,
            notSelected: contentButtonStyle.notSelected,
          })}
          onClick={() => handleSelectContent('product')}
        >
          상품설명
        </button>
        <button
          className={combineStyle({
            isSelected: selectReviewContent,
            base: contentButtonStyle.base,
            selected: contentButtonStyle.selected,
            notSelected: contentButtonStyle.notSelected,
          })}
          onClick={() => handleSelectContent('review')}
        >
          리뷰
        </button>
      </div>
      {selectDescriptionContent && <ProductDescription youtubeData={youtubeData} />}
      {selectReviewContent && <ProductReview />}
    </>
  );
};

export default ChangeContent;
