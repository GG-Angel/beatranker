import React, { useRef, useState } from "react";
import { Colors, Icons } from "../constants";
import { useOnClickOutside } from "../utils/utils";

const SortDropdown: React.FC<{
  options: string[];
  selected: string;
  updateSelection: (selection: string) => void;
}> = ({ options, selected, updateSelection }) => {
  const [isOpened, setIsOpened] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(dropdownRef, () => setIsOpened(false));

  const handleSelect = (option: string) => {
    updateSelection(option);
    setIsOpened(false);
  };

  return (
    <div
      ref={dropdownRef}
      className="w-[180px] font-geist font-medium text-tx-light dark:text-tx-dark"
    >
      <button
        className={`w-full flex flex-row justify-between items-center px-4 py-1 space-x-3 rounded-t-lg transition bg-card-light dark:bg-card-dark border-b-2 hover:border-active-light dark:hover:border-active-dark ${
          isOpened
            ? "border-active-light dark:border-active-dark"
            : "border-card-alt-light dark:border-card-alt-dark rounded-b-lg"
        }`}
        onClick={() => setIsOpened(!isOpened)}
      >
        <p>{selected}</p>
        <Icons.dropdown
          fill={Colors.tx.alt}
          className={`transform transition-transform duration-200 ${
            isOpened ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      {isOpened && (
        <div className="absolute w-[180px] z-10 bg-card-light dark:bg-card-dark rounded-b-lg shadow-lg shadow-black/5">
          {options
            .filter((o) => o !== selected)
            .map((option, index) => (
              <button
                className={`w-full px-4 py-1 transition hover:bg-card-alt-light dark:hover:bg-card-alt-dark text-left ${
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
