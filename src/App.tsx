import "./App.css";
import React, { useState } from "react";

import predictionsJson from "./assets/documents/predictions.json";
import { Predictions, Prediction } from "./api/types";
import { renderDecimal, renderTime } from "./api/utils";
import { Icons } from "../constants";

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

const PredictionCard: React.FC<{ prediction: Prediction }> = ({
  prediction,
}) => {
  console.log(prediction.currentMods)
  return (
    <div className="flex flex-row w-full bg-card-dark rounded-r-lg">
      <div
        className={`w-2 h-full ${DifficultyBGColor[prediction.difficultyName]}`}
      ></div>
      <img
        className="object-cover"
        src={prediction.cover}
        alt="Map Cover"
        width={100}
        loading="lazy"
      />
      <div className="flex flex-1 flex-row items-center justify-between font-geist font-medium text-cbody text-tx-dark px-4 py-3 gap-x-8">
        <div className="flex-1 w-0">
          <p className="truncate w-full">
            {prediction.name} - {prediction.author}
          </p>
          <p className="truncate w-full">{prediction.mapper}</p>
          <p className="truncate w-full">
            <span className={DifficultyTextColor[prediction.difficultyName]} title="Map Type">
              {prediction.type}{" "}
            </span>
            {prediction.status == "played" && (
              <>
                {renderDecimal(prediction.currentAccuracy * 100)}
                <span className="text-tx-alt">% </span>
                {prediction.currentMods && (
                  <>
                    <span className="text-tx-alt">(</span>
                    <span>{prediction.currentMods}</span>
                    <span className="text-tx-alt">) </span>
                  </>
                )}
                <span className="text-ctri text-tx-alt">
                  {prediction.timeAgo} - #{prediction.rank}
                </span>
              </>
            )}
          </p>
        </div>
        <div className="flex flex-row gap-x-8">
          <div className="text-center">
            <p>Potential</p>
            <p>
              {renderDecimal(prediction.predictedAccuracy * 100)}
              <span className="text-tx-alt">%</span>
              {prediction.predictedMods && (
                <>
                  <span className="text-tx-alt"> (</span>
                  {prediction.predictedMods}
                  <span className="text-tx-alt">)</span>
                </>
              )}
            </p>
            <p>
              {renderDecimal(prediction.predictedPP)}
              <span className="text-tx-alt">pp </span>
              <span className="text-green" title="Total (Weighted) PP Added to Your Rank">
                (+{renderDecimal(prediction.weightedPPGain)})
              </span>
            </p>
          </div>
          <div>
            <div className="flex flex-row items-center justify-end gap-x-[2px]">
              <p>{renderDecimal(prediction.starsMod)}</p>
              <img src={Icons.star} />
            </div>
            <div className="flex flex-row items-center justify-end gap-x-[2px]">
              <p>{renderTime(prediction.duration)}</p>
              <img src={Icons.timer} />
            </div>
            <div className="flex flex-row items-center justify-end h-[26px] gap-x-1">
              <a
                href={`https://beatleader.xyz/leaderboard/global/${prediction.leaderboardId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Icons.leaderboard} />
              </a>
              <a
                href={`https://beatsaver.com/maps/${prediction.songId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Icons.beatsaver} />
              </a>
              <a
                href={`https://beatsaver.com/maps/${prediction.songId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Icons.download} />
              </a>
              <a>
                <img src={Icons.more} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [predictions, setPredictions] = useState(
    predictionsJson as Predictions
  );

  return (
    <div className="w-full h-full font-geist font-medium text-cbody text-tx-dark bg-bg-dark px-16 py-8 gap-y-2">
      <div className="flex flex-row justify-between mb-8">
        <div className="flex flex-row gap-x-8">
          <div className="flex flex-row gap-x-4">
            <img src={Icons.home} />
            <img src={Icons.refresh} />
          </div>
          <div className="flex flex-row gap-x-4">
            <p>Sort By</p>
            <p>Modifiers</p>
          </div>
        </div>
        <p>How does this work?</p>
      </div>
      <div className="flex flex-row gap-x-16">
        <PredictionCard prediction={predictions[1678]} />
        <PredictionCard prediction={predictions[3]} />
      </div>
    </div>
  );
}

export default App;
