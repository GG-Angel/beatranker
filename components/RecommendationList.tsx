import React, { useEffect, useState } from "react";
import { Recommendation } from "../api/types";
import SortDropdown from "./SortDropdown";
import SortDirection from "./SortDirection";
import { FixedSizeList } from "react-window";
import RecommendationCard from "./RecommendationCard";

const RecommendationList: React.FC<{
  recs: Recommendation[];
  options: Record<string, keyof Recommendation>;
  header: string;
  columns: number;
}> = ({ recs, options, header, columns }) => {
  const [localRecs, setLocalRecs] = useState<Recommendation[]>(recs);
  const [sortBy, setSortBy] = useState<string>(Object.keys(options)[0]);
  const [sortAscending, setSortAscending] = useState<boolean>(false);

  useEffect(() => {
    const sortRecommendations = (recs: Recommendation[]) => {
      const feature = options[sortBy];
      return [...recs].sort((a, b) => {
        const aVal = (a[feature] as number) ?? 0;
        const bVal = (b[feature] as number) ?? 0;
        return sortAscending ? aVal - bVal : bVal - aVal;
      });
    };

    setLocalRecs(sortRecommendations(recs));
  }, [recs, sortBy, sortAscending]);

  return (
    <div>
      <div className="flex flex-row justify-between items-start mb-6">
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
      <FixedSizeList
        width="100%"
        height={columns > 1 ? window.innerHeight - 320 : 560}
        itemCount={localRecs.length}
        itemSize={112}
        overscanCount={3}
      >
        {({ index, style }) => (
          <div style={style}>
            <RecommendationCard rec={localRecs[index]} />
          </div>
        )}
      </FixedSizeList>
    </div>
  );
};

export default RecommendationList;
