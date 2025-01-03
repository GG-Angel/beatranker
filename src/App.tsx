import "./App.css";
import React, { useEffect, useRef, useState } from "react";

import ResponseJSON from "./assets/documents/response.json";
import { APIResponse } from "./api/types";
import { Icons } from "../constants";

function App() {
  const [response, setResponse] = useState<APIResponse>(ResponseJSON as APIResponse);

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
      <div className="flex flex-row justify-between h-full gap-x-16">
        <div>
          <p className="text-csub font-bold mb-6">Not Played</p>
        </div>
      </div>
    </div>
  );
}

export default App;
