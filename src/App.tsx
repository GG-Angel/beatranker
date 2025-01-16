import "./App.css";
import { useEffect, useRef, useState } from "react";

import ResponseJSON from "../api/response.json";
import { PlayerData } from "../api/types";
import RecommendationList from "../components/RecommendationList";
import ProfileSearchBox from "../components/ProfileSearchBox";
import ModifiersMenu from "../components/ModifiersMenu";
import { getFlagWidth } from "../api/utils";
import { RefreshButton } from "../components/RefreshButton";

function App() {
  const [data, setData] = useState<PlayerData | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(2);

  useEffect(() => {
    const data = ResponseJSON as PlayerData;
    setData(data);
  }, []);

  useEffect(() => {
    const updateGrid = () => {
      if (gridRef.current) {
        const computedStyle = window.getComputedStyle(gridRef.current);
        const columns = computedStyle.gridTemplateColumns;
        const columnArray = columns.split(" ");

        setColumns(columnArray.length);
      }
    };

    updateGrid();
    window.addEventListener("resize", updateGrid);
    return () => {
      window.removeEventListener("resize", updateGrid);
    };
  }, []);

  return (
    <div
      className={`flex flex-col w-full ${
        data ? "xl:h-full" : "h-full"
      } font-geist font-medium text-cbody bg-bg-light dark:bg-bg-dark text-tx-light dark:text-tx-dark`}
    >
      <header className="sticky top-0 z-50 flex justify-between px-16 py-8 bg-bg-light dark:bg-bg-dark">
        {data && (
          <div className="flex flex-row gap-x-8">
            <button onClick={() => setData(null)}>Home</button>
            <RefreshButton data={data} setData={setData} />
            <ModifiersMenu data={data} setData={setData} />
          </div>
        )}
        <button>Help</button>
      </header>
      <div className="flex flex-col w-full h-full px-16 pb-8 gap-y-8">
        {!data && (
          <div className="flex h-full items-center">
            <div className="flex flex-1 flex-col items-center">
              <h1 className="text-ch2 font-extrabold text-center mb-6">
                BeatRanker
              </h1>
              <div className="w-full max-w-[648px]">
                <ProfileSearchBox
                  updateData={(player_data) => setData(player_data)}
                />
              </div>
            </div>
          </div>
        )}
        {data && (
          <>
            <div className="flex flex-row justify-center items-center gap-x-8">
              <img
                src={data.profile.avatar}
                width={100}
                className="rounded-full border-tx-light dark:border-tx-dark border-8"
              />
              <div>
                <div className="flex flex-row gap-x-2 items-center">
                  <img
                    src={`https://flagcdn.com/${data.profile.country.toLowerCase()}.svg`}
                    width={getFlagWidth(data.profile.country)}
                  />
                  <h2 className="text-csub font-bold">{data?.profile.alias}</h2>
                </div>
                <p>
                  <span className="text-tx-alt">#</span>
                  {data?.profile.rank}
                  <span className="text-tx-alt"> - </span>
                  {data?.profile.pp}
                  <span className="text-tx-alt">pp</span>
                </p>
              </div>
            </div>
            <div
              className="w-full h-full grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-16"
              ref={gridRef}
            >
              <RecommendationList
                recs={data.recs.filter((r) => r.status === "unplayed")}
                header="Not Played"
                columns={columns}
                options={{
                  "PP gained": "weightedPPGain",
                  "Acc estimate": "predictedAccuracy",
                  "Star rating": "starsMod",
                }}
              />
              <RecommendationList
                recs={data.recs.filter((r) => r.status === "played")}
                header="To Improve"
                columns={columns}
                options={{
                  "PP gained": "weightedPPGain",
                  "Unweighted PP": "predictedPP",
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
    </div>
  );
}

export default App;
