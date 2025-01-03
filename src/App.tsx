import "./App.css";
import React, { useEffect, useRef, useState } from "react";

import ResponseJSON from "./assets/documents/response.json";
import { APIResponse } from "./api/types";
import { Icons } from "../constants";
import ProfileSearchBox from "./components/ProfileSearchBox";
import RecommendationCard from "./components/RecommendationCard";

function App() {
  const [response, setResponse] = useState<APIResponse>(
    ResponseJSON as APIResponse
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmitId = (player_id: string) => {
    setIsLoading(true);
    console.log(player_id);
  };

  return (
    <>
      <header className="flex justify-between px-16 py-8 font-geist font-medium text-cbody bg-bg-light dark:bg-bg-dark text-tx-light dark:text-tx-dark">
        <div className="flex flex-row gap-x-8">
          <p>Home</p>
          <p>Refresh</p>
          <p>Help</p>
        </div>
        <div className="flex flex-row gap-x-8">
          <p>Sort By</p>
          <p>Modifiers</p>
        </div>
      </header>
      <div className="w-full h-full px-16 py-8 flex items-center font-geist font-medium text-cbody bg-bg-light dark:bg-bg-dark text-tx-light dark:text-tx-dark">
        <div className="flex flex-1 flex-col items-center">
          <h1 className="text-ch2 font-extrabold text-center mb-6">where's my peepee?? 🤪</h1>
          <div className="w-full max-w-[648px]">
            <ProfileSearchBox handleSubmit={handleSubmitId} isLoading={isLoading} />
            { isLoading && <p className="text-left mt-2">Predicting scores...</p> }
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
