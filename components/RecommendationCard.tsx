import { Icons } from "../constants";
import { Recommendation } from "../api/types";
import { renderCommas, renderDecimal, renderTime } from "../api/utils";
import { downloadMap } from "../api/beatsaver";
import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

const DifficultyBGColor: { [key: string]: string } = {
  ExpertPlus: "bg-diff-expertplus",
  Expert: "bg-diff-expert",
  Hard: "bg-diff-hard",
  Normal: "bg-diff-normal",
  Easy: "bg-diff-easy",
};

const DifficultyTextColor: { [key: string]: string } = {
  ExpertPlus: "text-diff-expertplus",
  Expert: "text-diff-expert",
  Hard: "text-diff-hard",
  Normal: "text-diff-normal",
  Easy: "text-diff-easy",
};

const RecommendationCard: React.FC<{ rec: Recommendation }> = ({ rec }) => {
  const { isDark } = useContext(GlobalContext);

  return (
    <div className="flex flex-row w-full bg-card-light dark:bg-card-dark rounded-r-lg">
      <div
        className={`w-2 h-[101.2px] ${DifficultyBGColor[rec.difficultyName]}`}
      ></div>
      <img
        className="object-cover bg-slate-700"
        src={rec.cover}
        width={100}
        loading="lazy"
      />
      <div className="flex flex-1 flex-row items-center justify-between font-geist font-medium text-cbody text-tx-light dark:text-tx-dark px-4 py-3 gap-x-8">
        <div className="flex-1 w-0">
          <p className="truncate w-full">
            {rec.name} - {rec.author}
          </p>
          <p className="truncate w-full">{rec.mapper}</p>
          <p className="truncate w-full">
            <span
              className={DifficultyTextColor[rec.difficultyName]}
              title="Map Type"
            >
              {rec.type}{" "}
            </span>
            {rec.status == "played" && (
              <>
                {renderDecimal(rec.currentAccuracy * 100)}
                <span className="text-tx-alt">% </span>
                {rec.currentMods && (
                  <>
                    <span className="text-tx-alt">(</span>
                    <span>{renderCommas(rec.currentMods)}</span>
                    <span className="text-tx-alt">) </span>
                  </>
                )}
                <span className="text-ctri text-tx-alt">
                  {rec.timeAgo} - #{rec.rank}
                </span>
              </>
            )}
          </p>
        </div>
        <div className="flex flex-row gap-x-8">
          <div className="min-w-[164px] text-center">
            <p>Potential</p>
            <p>
              {renderDecimal(rec.predictedAccuracy * 100)}
              <span className="text-tx-alt">%</span>
              {rec.predictedMods && (
                <>
                  <span className="text-tx-alt"> (</span>
                  {renderCommas(rec.predictedMods)}
                  <span className="text-tx-alt">)</span>
                </>
              )}
            </p>
            <p>
              {renderDecimal(rec.predictedPP)}
              <span className="text-tx-alt">pp </span>
              {rec.weightedPPGain > 0 ? (
                <span
                  className="text-green-light dark:text-green-dark"
                  title="Total (Weighted) PP Added to Your Rank"
                >
                  (+{renderDecimal(rec.weightedPPGain)})
                </span>
              ) : (
                <span
                  className="text-tx-alt"
                  title="Total (Weighted) PP Added to Your Rank"
                >
                  (0.00)
                </span>
              )}
            </p>
          </div>
          <div>
            <div className="flex flex-row items-center justify-end gap-x-[2px]">
              <p>{renderDecimal(rec.starsMod)}</p>
              <img src={Icons.star} />
            </div>
            <div className="flex flex-row items-center justify-end gap-x-[2px]">
              <p>{renderTime(rec.duration)}</p>
              <img src={Icons.timer} />
            </div>
            <div className="flex flex-row items-center justify-end h-[26px] gap-x-1">
              <a
                href={`https://beatleader.xyz/leaderboard/global/${rec.leaderboardId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Icons.leaderboard} />
              </a>
              <a
                href={`https://beatsaver.com/maps/${rec.songId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Icons.beatsaver} />
              </a>
              <a className="cursor-pointer" onClick={() => downloadMap(rec.songId)}>
                <img src={Icons.download} />
              </a>
              <a>
                {/* <img src={Icons.more} /> */}
                <Icons.NewIcon fill={isDark ? "white" : "green"} width={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;
