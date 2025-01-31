import { useContext, useRef, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { useOnClickOutside } from "../utils/utils";

type Filter = {
  name: string;
  desc: string;
  isEnabled: boolean;
  toggle: () => void;
};

export const FiltersMenu = () => {
  const { isUpdating } = useContext(GlobalContext);
  const [isOpened, setIsOpened] = useState<boolean>(true);
  const [gainsOnly, setGainsOnly] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(menuRef, () => setIsOpened(false));

  const filters: Filter[] = [
    {
      name: "Chase Dem Gains 💪",
      desc: "Only show maps you can gain PP from",
      isEnabled: gainsOnly,
      toggle: () => setGainsOnly(!gainsOnly),
    },
  ];

  return (
    <div
      ref={menuRef}
      className={`flex flex-col items-center font-geist font-medium text-cbody transition ${
        isUpdating ? "text-tx-alt" : "text-tx-light dark:text-tx-dark"
      }`}
    >
      <button onClick={() => setIsOpened(!isOpened)} disabled={isUpdating}>
        Filters
      </button>
      {isOpened && (
        <div className="absolute top-[72px] w-[256px] flex flex-col items-center z-20 rounded-lg shadow-xl bg-card-light dark:bg-card-dark shadow-black/5">
          <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[12px] border-solid border-b-card-light dark:border-b-card-dark border-l-transparent border-r-transparent absolute top-[-12px]"></div>
          {filters.map((filter, index) => (
            <button
              className={`w-full flex flex-col px-4 py-2 text-left transition ${filter.isEnabled ? "bg-active-light bg-opacity-25 dark:bg-active-dark dark:bg-opacity-75" : "hover:bg-card-alt-light dark:hover:bg-card-alt-dark"} ${
                index == 0 && "rounded-t-lg"
              } ${index == filters.length - 1 && "rounded-b-lg"}`}
              onClick={filter.toggle}
            >
              <p className="">{filter.name}</p>
              <p className="text-ctri text-tx-alt">{filter.desc}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
