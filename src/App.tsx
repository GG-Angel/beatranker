import "./App.css";
import React, { useEffect, useRef, useState } from "react";

import ResponseJSON from "./assets/documents/response.json";
import { APIResponse } from "./api/types";
import ProfileSearchBox from "./components/ProfileSearchBox";
import { FixedSizeList } from "react-window";
import RecommendationCard from "./components/RecommendationCard";

function App() {
  const [response, setResponse] = useState<APIResponse | null>(
    ResponseJSON as APIResponse
  );
  const [isLoadingPlayer, setIsLoadingPlayer] = useState<boolean>(false);

  const handleSubmitId = (player_id: string) => {
    setIsLoadingPlayer(true);
    console.log(player_id);
    setResponse(ResponseJSON as APIResponse);
  };

  const gridRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    const updateColumns = () => {
      if (gridRef.current) {
        const computedStyle = window.getComputedStyle(gridRef.current)
        const columnCount = computedStyle.gridTemplateColumns.split(' ').length;
        setColumns(columnCount)
      }
    }
    
    const updateSize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
        setContainerHeight(containerRef.current.offsetHeight)
      }
    };

    updateColumns();
    updateSize();

    window.addEventListener('resize', updateColumns);
    window.addEventListener('resize', updateSize);
    return () => {
      window.removeEventListener('resize', updateColumns)
      window.removeEventListener('resize', updateSize)
    };
  }, []);

  return (
    <>
      <header className="flex justify-between px-16 py-8 sticky top-0 font-geist font-medium text-cbody bg-bg-light dark:bg-bg-dark text-tx-light dark:text-tx-dark">
        <div className="flex flex-row gap-x-8">
          {response && (
            <>
              <p>Home</p>
              <p>Refresh {columns} {containerHeight} {containerWidth}</p>
            </>
          )}
          <p>Help</p>
        </div>
        {response && (
          <div className="flex flex-row gap-x-8">
            <p>Sort By</p>
            <p>Modifiers</p>
          </div>
        )}
      </header>
      <div className="w-full h-full px-16 py-8 font-geist font-medium text-cbody bg-bg-light dark:bg-bg-dark text-tx-light dark:text-tx-dark">
        {response === null ? (
          <div className="flex h-full items-center">
            <div className="flex flex-1 flex-col items-center">
              <h1 className="text-ch2 font-extrabold text-center mb-6">
                where's my peepee?? 🤪
              </h1>
              <div className="w-full max-w-[648px]">
                <ProfileSearchBox
                  handleSubmit={handleSubmitId}
                  isLoading={isLoadingPlayer}
                />
                {isLoadingPlayer && (
                  <p className="text-left mt-2">Predicting scores...</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="flex flex-col h-full gap-y-8">
          <div className="w-full flex flex-row justify-center items-center gap-x-6">
            <img
              className={`rounded-full border-tx-light dark:border-tx-dark border-8`}
              src={response?.profile.avatar}
              width={100}
            />
            <div>
              <h2 className="text-csub font-bold">{response?.profile.alias}</h2>
              <p>
                <span className="text-tx-alt">#</span>
                {response?.profile.rank}
                <span className="text-tx-alt"> - </span>
                {response?.profile.pp}
                <span className="text-tx-alt">pp</span>
              </p>
            </div>
          </div>
          <div className="w-full xl:h-full grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-16 border-slate-700 border-2" ref={gridRef}>
            <div className="bg-blue-500 h-full">
              <p className="text-csub font-bold mb-6">Not Played</p>
              <div ref={containerRef}>
                <FixedSizeList
                  width={containerWidth}
                  height={columns > 1 ? containerHeight : 548}
                  itemCount={response?.recs.length!}
                  itemSize={112}
                >
                  {({ index, style }) => (
                    <div style={style}>
                      <RecommendationCard rec={response?.recs[index]!} />
                    </div>
                  )}
                </FixedSizeList>
              </div>
            </div>
            <div className="bg-red-500">
              <p className="text-csub font-bold mb-6">To Improve</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
