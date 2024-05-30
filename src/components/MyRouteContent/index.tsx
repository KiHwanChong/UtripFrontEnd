import KakaoMap from './KakaoMap';
import PlaceList from './PlaceList';
import { PlusIcon } from '@heroicons/react/24/outline';
import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd';
import { ChangeEvent, useState } from 'react';
import { MockDataItem } from '@/src/lib/types';
import { mock } from '@/src/components/mainContent/mock';
import { useFilteredData } from '@/src/hooks/useFilteredData';
import NoSearchData from '../mainContent/CardSection/NoSearchData';
import ListCard from '../common/ListCard';
import { Draggable } from '@hello-pangea/dnd';

const MyRouteContent = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [sectionVisible, setSectionVisible] = useState<boolean>(false);
  const GRID_ROW = Math.ceil(mock.data.length / 4);
  const filteredData: MockDataItem[] = useFilteredData({ data: mock.data }, searchValue);
  const handleSearchInputChange = (e: ChangeEvent) => {
    setSearchValue((e.target as HTMLInputElement).value);
    if (!sectionVisible) {
      setSectionVisible(true);
    }
  };

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === 'myPlace' && source.droppableId === 'placeList') {
      console.log(`${draggableId}`);
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <main className="flex gap-30 m-30">
        <div className="bg-white pt-32 pl-37 pr-55 pb-107 flex flex-col gap-10 rounded-20 shadow-main">
          <KakaoMap />
          <div className="flex justify-end">
            <div>
              <PlaceList />

              {/* 버튼에 모달 핸들러 등록 */}
              <button className="w-441 h-60 bg-blue text-white rounded-s flex justify-center items-center">
                <PlusIcon className="w-20" />
                일정 추가하기
              </button>
            </div>
          </div>
        </div>

        <div className="relative flex flex-col">
          <input
            value={searchValue}
            className="text-center border-2 rounded-15 w-700 py-10 px-30 mb-30 "
            placeholder="어느 곳으로 여행 가고싶으신가요?"
            onChange={handleSearchInputChange}
          />
          <Droppable droppableId="myPlace">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {filteredData.length !== 0 ? (
                  <div className={`grid grid-cols-3 grid-rows-${GRID_ROW} gap-15`}>
                    {filteredData.map((datas, index) => (
                      <Draggable key={index} draggableId={`${datas.title}-${index}`} index={index}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <ListCard data={datas} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                ) : (
                  <NoSearchData />
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </main>
    </DragDropContext>
  );
};

export default MyRouteContent;
