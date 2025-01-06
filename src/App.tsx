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
      <div className="w-full px-16 py-8 font-geist font-medium text-cbody bg-bg-light dark:bg-bg-dark text-tx-light dark:text-tx-dark">
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
          <>
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
            <div className="w-full xl:h-full grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-16 mt-8">
              <RecommendationList
                recs={data.recs.filter(r => r.status === "unplayed")}
                header="Not Played"
                options={{
                  "PP gained": "weightedPPGain",
                  "Acc estimate": "predictedAccuracy",
                  "Star rating": "starsMod",
                }}
              />
              <RecommendationList
                recs={data.recs.filter(r => r.status === "played")}
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
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
