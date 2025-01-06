import "./App.css";
import React, { useEffect, useRef, useState } from "react";

import ResponseJSON from "./assets/documents/response.json";
import { APIResponse } from "./api/types";
import ProfileSearchBox from "./components/ProfileSearchBox";
import RecommendationList from "./components/RecommendationList";

function App() {
  const [isLoadingPlayer, setIsLoadingPlayer] = useState<boolean>(false);
  const [data, setData] = useState<APIResponse | null>(null);
  
  const gridRef = useRef<HTMLDivElement>(null)
  const [columns, setColumns] = useState(1)
  const [gridHeight, setGridHeight] = useState(500)

  useEffect(() => {
    const data = ResponseJSON as APIResponse;
    setData(data);
  }, []);

  useEffect(() => {
    const updateGrid = () => {
      if (gridRef.current) {
        const computedStyle = window.getComputedStyle(gridRef.current);
        const columns = computedStyle.gridTemplateColumns;
        const columnArray = columns.split(' ');

        setColumns(columnArray.length);
        
      }

      setGridHeight(window.innerHeight - 253.6)
    };

    const resizeObserver = new ResizeObserver(updateGrid);
    if (gridRef.current) {
      resizeObserver.observe(gridRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [])

  const handleSubmitId = (player_id: string) => {
    setIsLoadingPlayer(true);
    setData(ResponseJSON as APIResponse);
    setIsLoadingPlayer(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 flex justify-between px-16 py-8 font-geist font-medium text-cbody bg-bg-light dark:bg-bg-dark text-tx-light dark:text-tx-dark">
        <div className="flex flex-row gap-x-8">
          {data && (
            <>
              <button
                className="bg-transparent border-none focus:outline-none p-0 hover:underline"
                onClick={() => setData(null)}
              >
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
      <div className="w-full xl:h-full px-16 pb-8 font-geist font-medium text-cbody bg-bg-light dark:bg-bg-dark text-tx-light dark:text-tx-dark">
        {!data ? (
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
          <div>
            <div className="w-full flex flex-row justify-center items-center gap-x-6">
              <img
                className={`rounded-full border-tx-light dark:border-tx-dark border-8`}
                src={data.profile.avatar}
                width={100}
              />
              <div>
                <h2 className="text-csub font-bold">{data.profile.alias}</h2>
                <p>
                  <span className="text-tx-alt">#</span>
                  {data.profile.rank}
                  <span className="text-tx-alt"> - </span>
                  {data.profile.pp}
                  <span className="text-tx-alt">pp</span>
                </p>
              </div>
            </div>
            <div className="w-full xl:h-[calc(100vh-253.59px)] grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-16 mt-8" ref={gridRef}>
              <RecommendationList
                recs={data.recs.filter(r => r.status === "unplayed")}
                header="Not Played"
                columns={columns}
                containerHeight={gridHeight}
                options={{
                  "PP gained": "weightedPPGain",
                  "Acc estimate": "predictedAccuracy",
                  "Star rating": "starsMod",
                }}
              />
              <RecommendationList
                recs={data.recs.filter(r => r.status === "played")}
                header="To Improve"
                columns={columns}
                containerHeight={gridHeight}
                options={{
                  "PP gained": "weightedPPGain",
                  "PP estimate": "predictedPP",
                  "Acc estimate": "predictedAccuracy",
                  "Current acc": "currentAccuracy",
                  "Current rank": "rank",
                  "Star rating": "starsMod",
                  "Date set": "timePost",
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
