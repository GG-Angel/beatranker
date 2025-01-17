import React from "react";
import { Icons } from "../constants";

const SortDirection: React.FC<{
  ascending: boolean;
  updateDirection: () => void;
}> = ({ ascending, updateDirection }) => {
  return (
    <button
      className="flex items-center justify-center w-[35.2px] h-[35.2px] rounded-lg border-b-2 bg-card-light dark:bg-card-dark border-card-alt-light dark:border-card-alt-dark hover:border-active-light dark:hover:border-active-dark"
      onClick={updateDirection}
    >
      <img
        src={Icons.arrow}
        className={`transform transition-transform duration-200 ${
          ascending ? "rotate-0" : "rotate-180"
        }`}
      />
    </button>
  );
};

export default SortDirection;
