import "./App.css";
import { useContext, useEffect, useRef, useState } from "react";

import ResponseJSON from "../api/response.json";
import { PlayerData } from "../api/types";
import RecommendationList from "../components/RecommendationList";
import ProfileSearchBox from "../components/ProfileSearchBox";
import ModifiersMenu from "../components/ModifiersMenu";
import { RefreshButton } from "../components/RefreshButton";
import GlobalContext from "../context/GlobalContext";
import PlayerCard from "../components/PlayerCard";
import Logger from "../components/Logger";

function App() {
  const { data, setData } = useContext(GlobalContext);

  useEffect(() => {
    const data = ResponseJSON as PlayerData;
    setData(data);
  }, []);

  const [columns, setColumns] = useState(2);
  const gridRef = useRef<HTMLDivElement>(null);

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
            <RefreshButton />
            <ModifiersMenu />
          </div>
        )}
        <div className="flex flex-row flex-1 gap-x-8 justify-end">
          <button>Help</button>
          {/* <ThemeToggle /> */}
        </div>
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
            <PlayerCard />
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
      <Logger />
    </div>
  );
}

export default App;
