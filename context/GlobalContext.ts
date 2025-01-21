import { createContext, Dispatch, SetStateAction } from "react";
import { Modifier, PlayerData } from "../api/types";
import { LogMessage, MessageType } from "../components/Logger";

interface GlobalContextValues {
  data: PlayerData | null;
  modifiers: Modifier[];
  logs: LogMessage[];
  isLoading: boolean;
  isUpdating: boolean;
  setData: Dispatch<SetStateAction<PlayerData | null>>;
  setModifiers: Dispatch<SetStateAction<Modifier[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setIsUpdating: Dispatch<SetStateAction<boolean>>;
  addLog: (type: MessageType, message: string, inProgress?: boolean, time?: number) => number;
  removeLog: (id: number) => void;
  updateLog: (id: number, type?: MessageType, message?: string, inProgress?: boolean, time?: number) => void
}

const GlobalContext = createContext<GlobalContextValues>({} as GlobalContextValues);

export default GlobalContext;