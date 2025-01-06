import React, { useEffect, useRef, useState } from "react";
import { Recommendation } from "../api/types";
import SortDropdown from "./SortDropdown";
import SortDirection from "./SortDirection";
import { FixedSizeList } from "react-window";
import RecommendationCard from "./RecommendationCard";

const RecommendationList: React.FC<{
  recs: Recommendation[];
  header: string;
  options: Record<string, keyof Recommendation>;
}> = ({ recs, header, options }) => {
  const [sortBy, setSortBy] = useState(Object.keys(options)[0]);
  const [sortAscending, setSortAscending] = useState(false);

  return (
    <div>
      <div className="flex flex-row justify-between align-top mb-6">
        <p className="text-csub font-bold">{header}</p>
        <div className="flex flex-row gap-x-2">
          <SortDropdown 
            options={Object.keys(options)}
            selected={sortBy}
            updateSelection={(option) => setSortBy(option)}
          />
          <SortDirection 
            ascending={sortAscending}
            updateDirection={() => setSortAscending(!sortAscending)}
          />
        </div>
      </div>
      <div>
        <FixedSizeList 
          width={800}
          height={548}
          itemCount={recs.length}
          itemSize={112}
          overscanCount={3}
        >
          {({ index, style }) => (
            <div style={style}>
              <RecommendationCard rec={recs[index]} />
            </div>
          )}
        </FixedSizeList>
      </div>
    </div>
  );
};

export default RecommendationList;
