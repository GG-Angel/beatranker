import React, { useContext } from "react";
import { Colors, Icons } from "../constants";
import GlobalContext from "../context/GlobalContext";

const SortDirection: React.FC<{
  ascending: boolean;
  updateDirection: () => void;
}> = ({ ascending, updateDirection }) => {
  const { isDark } = useContext(GlobalContext);
  return (
    <button
      className="flex items-center justify-center w-[35.2px] h-[35.2px] rounded-lg border-b-2 transition bg-card-light dark:bg-card-dark border-card-alt-light dark:border-card-alt-dark hover:border-active-light dark:hover:border-active-dark"
      onClick={updateDirection}
      aria-label="Toggle Sort Direction"
    >
      <Icons.arrow 
        fill={isDark ? Colors.tx.dark : Colors.tx.light}
        className={`transform transition-transform duration-200 ${
          ascending ? "rotate-0" : "rotate-180"
        }`}
      />
    </button>
  );
};

export default SortDirection;
