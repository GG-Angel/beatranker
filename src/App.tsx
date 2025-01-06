import "./App.css";
import React, { useEffect, useRef, useState } from "react";

import ResponseJSON from "./assets/documents/response.json";
import { APIResponse, Recommendation } from "./api/types";
import ProfileSearchBox from "./components/ProfileSearchBox";
import { FixedSizeList } from "react-window";
import RecommendationCard from "./components/RecommendationCard";
import SortDropdown from "./components/SortDropdown";
import SortDirection from "./components/SortDirection";
import RecommendationList from "./components/RecommendationList";

function App() {
  const [isLoadingPlayer, setIsLoadingPlayer] = useState<boolean>(false);

  const [data, setData] = useState<APIResponse | null>(null);

  const [improveRecs, setImproveRecs] = useState<Recommendation[] | null>(null);
  const [improveSort, setImproveSort] = useState("PP gained");
  const [improveAscending, setImproveAscending] = useState(false);

  const [unplayedRecs, setUnplayedRecs] = useState<Recommendation[] | null>(
    null
  );
  const [unplayedSort, setUnplayedSort] = useState("PP gained");
  const [unplayedAscending, setUnplayedAscending] = useState(false);

  function sortRecommendations(
    recs: Recommendation[],
    feature: string,
    ascending: boolean
  ) {
    const conversion: Record<string, keyof Recommendation> = {
      "PP gained": "weightedPPGain",
      "PP estimate": "predictedPP",
      "Acc estimate": "predictedAccuracy",
      "Current acc": "currentAccuracy",
      "Current rank": "rank",
      "Star rating": "starsMod",
      "Date set": "timePost",
    };
    const convertedFeature = conversion[feature];

    return recs.sort((a, b) => {
      const aValue = a[convertedFeature] ?? 0;
      const bValue = b[convertedFeature] ?? 0;

      if (typeof aValue !== "number" || typeof bValue !== "number") {
        throw new Error(
          `Invalid feature "${convertedFeature}" for sorting: values must be numbers.`
        );
      }

      return ascending ? aValue - bValue : bValue - aValue;
    });
  }

  useEffect(() => {
    const data = ResponseJSON as APIResponse;
    setData(data);
  }, []);

  useEffect(() => {
    if (data) {
      const improve = data.recs.filter((r) => r.status === "played");
      const unplayed = data.recs.filter((r) => r.status === "unplayed");

      setImproveRecs(improve);
      setUnplayedRecs(unplayed);
    }
  }, [data]);

  useEffect(() => {
    if (unplayedRecs) {
      const sortUnplayed = sortRecommendations(
        unplayedRecs,
        unplayedSort,
        unplayedAscending
      );
      setUnplayedRecs(sortUnplayed);
    }
  }, [unplayedSort, unplayedAscending]);

  useEffect(() => {
    if (improveRecs) {
      const sortImprove = sortRecommendations(
        improveRecs,
        improveSort,
        improveAscending
      );
      setUnplayedRecs(sortImprove);
    }
  }, [unplayedSort, unplayedAscending]);

  const handleSubmitId = (player_id: string) => {
    setIsLoadingPlayer(true);
    setData(ResponseJSON as APIResponse);
    setIsLoadingPlayer(false);
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
        const computedStyle = window.getComputedStyle(gridRef.current);
        const columnCount = computedStyle.gridTemplateColumns.split(" ").length;
        setColumns(columnCount);
      }
    };

    const updateSize = () => {
      if (containerRef.current && windowRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
        setWindowHeight(windowRef.current.offsetHeight);
      }
    };

    updateColumns();
    updateSize();

    window.addEventListener("resize", updateColumns);
    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateColumns);
      window.removeEventListener("resize", updateSize);
    };
  }, []);

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
      <div
        className="w-full h-full px-16 py-8 font-geist font-medium text-cbody bg-bg-light dark:bg-bg-dark text-tx-light dark:text-tx-dark"
        ref={windowRef}
      >
        {data === null && (
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
        )}
        { (data && improveRecs && unplayedRecs) && (
          <div className="flex flex-col h-full gap-y-8">
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
            <div
              className="w-full xl:h-full grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-16"
              ref={gridRef}
            >
              <RecommendationList
                recs={improveRecs!}
                header="Not Played"
                options={{
                  "PP gained": "weightedPPGain",
                  "PP estimate": "predictedPP",
                  "Acc estimate": "predictedAccuracy",
                  "Star rating": "starsMod",
                }}
              />
              <RecommendationList
                recs={unplayedRecs!}
                header="To Improve"
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
              {/* <div>
                <div className="flex flex-row justify-between align-top">
                  <p className="text-csub font-bold mb-6">To Improve</p>
                  <div className="flex flex-row gap-x-2">
                    <SortDropdown
                      options={[
                        "PP gained",
                        "PP estimate",
                        "Acc estimate",
                        "Current acc",
                        "Current rank",
                        "Star rating",
                        "Date set",
                      ]}
                      selected={improveSort}
                      updateSelection={(option) => setImproveSort(option)}
                    />
                    <SortDirection
                      ascending={improveAscending}
                      updateDirection={() =>
                        setImproveAscending(!improveAscending)
                      }
                    />
                  </div>
                </div>
                <FixedSizeList
                  width={containerWidth}
                  height={columns > 1 ? windowHeight - 248.4 : 548}
                  itemCount={improveRecs?.length || 0}
                  itemSize={112}
                  overscanCount={3}
                >
                  {({ index, style }) => (
                    <div style={style}>
                      <RecommendationCard rec={improveRecs![index]} />
                    </div>
                  )}
                </FixedSizeList>
              </div> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
