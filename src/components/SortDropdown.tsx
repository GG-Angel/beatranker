import React, { useState } from "react";
import { Icons } from "../../constants";

const SortDropdown: React.FC<{
  options: string[];
  selected: string;
  updateSelection: (selection: string) => void;
}> = ({ options, selected, updateSelection }) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleSelect = (option: string) => {
    updateSelection(option);
    setIsOpened(false);
  };

  return (
    <div
      className="w-[180px] font-geist font-medium text-tx-light dark:text-tx-dark"
    >
      <button
        className={`w-full flex flex-row justify-between items-center px-4 py-1 space-x-3 rounded-t-lg bg-card-light dark:bg-card-dark border-b-2 hover:border-active-light dark:hover:border-active-dark ${
          isOpened
            ? "border-active-light dark:border-active-dark"
            : "border-card-alt-light dark:border-card-alt-dark rounded-b-lg"
        }`}
        onClick={() => setIsOpened(!isOpened)}
      >
        <p>{selected}</p>
        <img
          src={Icons.dropdown}
          className={`transform transition-transform duration-200 ${
            isOpened ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      {isOpened && (
        <div className="absolute w-[180px] z-10 bg-card-light dark:bg-card-dark rounded-b-lg shadow-lg shadow-bg-light dark:shadow-bg-dark">
          {options
            .filter((o) => o !== selected)
            .map((option, index) => (
              <button
                className={`w-full px-4 py-1 bg-transparent hover:bg-card-alt-light dark:hover:bg-card-alt-dark active:bg-active-light dark:active:bg-active-dark text-left ${
                  index === options.length - 2 && "rounded-b-lg"
                }`}
                onClick={() => handleSelect(option)}
                key={index}
              >
                {option}
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
