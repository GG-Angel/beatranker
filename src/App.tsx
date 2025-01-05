import "./App.css";
import React, { useEffect, useRef, useState } from "react";

import ResponseJSON from "./assets/documents/response.json";
import { APIResponse } from "./api/types";
import ProfileSearchBox from "./components/ProfileSearchBox";
import { FixedSizeList } from "react-window";
import RecommendationCard from "./components/RecommendationCard";
import SortDropdown from "./components/SortDropdown";
import SortDirection from "./components/SortDirection";

function App() {
  const [data, setData] = useState<APIResponse | null>(
    ResponseJSON as APIResponse
  );
  const [isLoadingPlayer, setIsLoadingPlayer] = useState<boolean>(false);

  const handleSubmitId = (player_id: string) => {
    setIsLoadingPlayer(true);
    console.log(player_id);
    setData(ResponseJSON as APIResponse);
  };

  const gridRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  

  useEffect(() => {
    const updateColumns = () => {
      if (gridRef.current) {
        const computedStyle = window.getComputedStyle(gridRef.current)
        const columnCount = computedStyle.gridTemplateColumns.split(' ').length;
        setColumns(columnCount)
      }
    }
    
    const updateSize = () => {
      if (containerRef.current && windowRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
        setWindowHeight(windowRef.current.offsetHeight)
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
      <header className="w-full fixed z-50 flex justify-between px-16 py-8 font-geist font-medium text-cbody bg-bg-light dark:bg-bg-dark text-tx-light dark:text-tx-dark">
        <div className="flex flex-row gap-x-8">
          {data && (
            <>
              <button className="bg-transparent border-none focus:outline-none p-0 hover:underline" onClick={() => setData(null)}>
                <p>Home</p>
              </button>
              <button className="bg-transparent border-none focus:outline-none p-0 hover:underline">
                <p>Refresh</p>
              </button>
            </>
          )}
          <p>Help</p>
        </div>
        {data && (
          <div className="flex flex-row gap-x-8">
            <p>Modifiers</p>
          </div>
        )}
      </header>
      <div className={`${columns > 1 && "h-full"} w-full mt-[89.6px] px-16 py-8 font-geist font-medium text-cbody bg-bg-light dark:bg-bg-dark text-tx-light dark:text-tx-dark`} ref={windowRef}>
        {data === null ? (
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
              src={data?.profile.avatar}
              width={100}
            />
            <div>
              <h2 className="text-csub font-bold">{data?.profile.alias}</h2>
              <p>
                <span className="text-tx-alt">#</span>
                {data?.profile.rank}
                <span className="text-tx-alt"> - </span>
                {data?.profile.pp}
                <span className="text-tx-alt">pp</span>
              </p>
            </div>
          </div>
          <div className="w-full xl:h-full grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-16" ref={gridRef}>
            <div ref={containerRef}>
              <div className="flex flex-row justify-between align-top">
                <p className="text-csub font-bold mb-6">Not Played</p>
                <div className="flex flex-row gap-x-2">
                  <SortDropdown options={["PP gained", "Unweighted pp", "Current acc.", "Current rank", "Stars", "Date set"]} selected="PP gained" updateSelection={(option) => {}} />
                  <SortDirection direction="desc" updateDirection={() => {}} />
                </div> 
              </div>
              <FixedSizeList
                width={containerWidth}
                height={columns > 1 ? (windowHeight - 248.4) : 548}
                itemCount={data?.recs.length!}
                itemSize={112}
                overscanCount={3}
              >
                {({ index, style }) => (
                  <div style={style}>
                    <RecommendationCard rec={data?.recs[index]!} />
                  </div>
                )}
              </FixedSizeList>
            </div>
            <div>
              <p className="text-csub font-bold mb-6">To Improve</p>
              <FixedSizeList
                width={containerWidth}
                height={columns > 1 ? (windowHeight - 248.4) : 548}
                itemCount={data?.recs.length!}
                itemSize={112}
                overscanCount={3}
              >
                {({ index, style }) => (
                  <div style={style}>
                    <RecommendationCard rec={data?.recs[index]!} />
                  </div>
                )}
              </FixedSizeList>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
