import "./App.css";
import { useContext, useEffect, useRef, useState } from "react";
import RecommendationList from "../components/RecommendationList";
import ProfileSearchBox from "../components/ProfileSearchBox";
import ModifiersMenu from "../components/ModifiersMenu";
import { RefreshButton } from "../components/RefreshButton";
import GlobalContext from "../context/GlobalContext";
import PlayerCard from "../components/PlayerCard";
import Logger from "../components/Logger";
import HelpView from "../components/HelpView";
import { FiltersMenu } from "../components/FiltersMenu";
import HomeButton from "../components/HomeButton";
import PlotMenu from "../components/PlotMenu";
import { Images } from "../constants";

function App() {
  const { data, isDark } = useContext(GlobalContext);

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
    <div className="flex flex-col items-center w-full h-screen">
      <div
        className={`flex flex-col w-full max-w-[2160px] ${
          data ? "xl:h-full" : "h-full"
        } font-geist font-medium text-cbody bg-bg-light dark:bg-bg-dark text-tx-light dark:text-tx-dark`}
      >
        <header className="sticky top-0 z-50 flex justify-between px-16 py-8 bg-bg-light dark:bg-bg-dark">
          {data && (
            <div className="flex flex-row gap-x-8">
              <HomeButton />
              <PlotMenu />
              <RefreshButton />
              <FiltersMenu />
              <ModifiersMenu />
            </div>
          )}
          <div className="flex flex-row flex-1 gap-x-8 justify-end">
            <HelpView />
          </div>
        </header>
        <div className="flex flex-col w-full h-full px-16 pb-8 gap-y-8">
          {!data ? (
            <div className="flex h-full items-center">
              <div className="flex flex-1 flex-col items-center">
                <div className="flex flex-row gap-x-4 items-center mb-6 fade-in-slide-up">
                  <img
                    className={`${!isDark && "brightness-0"}`}
                    src={isDark ? Images.beatranker : Images.beatrankerOutline}
                    width={39}
                    height={39}
                    alt="BeatRanker Logo"
                  />  
                  <h1 className="text-ch2 font-extrabold">BeatRanker</h1>
                </div>
                <div className="w-full max-w-[648px] fade-in-slide-down">
                  <ProfileSearchBox />
                </div>
              </div>
            </div>
          ) : (
            <>
              <PlayerCard />
              <div
                className="w-full h-full grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-16"
                ref={gridRef}
              >
                <RecommendationList
                  recs={data.recs.filter(
                    (r) => r.status === "unplayed" && !r.isFiltered
                  )}
                  header="Not Played"
                  columns={columns}
                  options={{
                    "PP gained": "weightedPPGain",
                    "Acc estimate": "predictedAccuracy",
                    "Star rating": "starsMod",
                  }}
                />
                <RecommendationList
                  recs={data.recs.filter(
                    (r) => r.status === "played" && !r.isFiltered
                  )}
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
    </div>
  );
}

export default App;
