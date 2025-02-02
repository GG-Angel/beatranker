import { createContext, Dispatch, SetStateAction } from "react";
import { Modifier, PlayerData, Recommendation } from "../api/types";
import { LogMessage, MessageType } from "../components/Logger";
import { FilterState } from "../components/FiltersMenu";

interface GlobalContextValues {
  data: PlayerData | null;
  originalRecs: Recommendation[] | null;
  modifiers: Modifier[];
  filters: FilterState;
  logs: LogMessage[];
  isLoading: boolean;
  isUpdating: boolean;
  isDark: boolean;
  setData: Dispatch<SetStateAction<PlayerData | null>>;
  setOriginalRecs: Dispatch<SetStateAction<Recommendation[] | null>>;
  setModifiers: Dispatch<SetStateAction<Modifier[]>>;
  setFilters: Dispatch<SetStateAction<FilterState>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setIsUpdating: Dispatch<SetStateAction<boolean>>;
  setIsDark: Dispatch<SetStateAction<boolean>>;
  addLog: (type: MessageType, message: string, inProgress?: boolean, time?: number) => number;
  removeLog: (id: number) => void;
  updateLog: (id: number, type?: MessageType, message?: string, inProgress?: boolean, time?: number) => void
}

const GlobalContext = createContext<GlobalContextValues>({} as GlobalContextValues);

export default GlobalContext;