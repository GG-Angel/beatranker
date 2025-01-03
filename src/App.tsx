import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import { FixedSizeList, VariableSizeList } from "react-window";

import ResponseJSON from "./assets/documents/response.json";
import { APIResponse, Recommendation, Profile } from "./api/types";
import { renderDecimal, renderTime } from "./api/utils";
import { Icons } from "../constants";
import RecommendationCard from "./components/RecommendationCard";

function App() {
  const [response, setResponse] = useState<APIResponse>(ResponseJSON as APIResponse);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current && headerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
        setContainerHeight(containerRef.current.offsetHeight);
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    // initial measurement
    updateDimensions(); 

    // update on resize
    window.addEventListener('resize', updateDimensions); // Update on resize

    
    return () => {
      // cleanup listener on unmount
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  return (
    <div className="w-full h-full font-geist font-medium text-cbody text-tx-dark bg-bg-dark px-16 py-8 gap-y-2" ref={headerRef}>
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
      <div className="flex flex-row justify-between h-full gap-x-16" ref={containerRef}>
        <div>
          <p className="text-csub font-bold mb-6">Not Played</p>
          {/* <FixedSizeList
            width={containerWidth / 2 - 32}
            height={containerHeight - 112}
            itemSize={112}
            itemCount={response.recs.length}
          >
            {({ index, style }) => (
              <div style={style}>
                <RecommendationCard rec={response.recs[index]} />
              </div>
            )}
          </FixedSizeList>
        </div>
        <div>
          <p className="text-csub font-bold mb-6">To Improve</p>
          <FixedSizeList
            width={containerWidth / 2 - 32}
            height={containerHeight - 112}
            itemSize={112}
            itemCount={response.recs.length}
          >
            {({ index, style }) => (
              <div style={style}>
                <RecommendationCard rec={response.recs[index]} />
              </div>
            )}
          </FixedSizeList> */}
        </div>
      </div>
    </div>
  );
}

export default App;
