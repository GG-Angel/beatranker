import { createContext, Dispatch, SetStateAction } from "react";
import { Modifier, PlayerData } from "../api/types";
import { LogMessage, MessageType } from "../components/Logger";
import { logAction } from "./GlobalProvider";

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
  addLog: (type: MessageType, message: string, time?: number) => void;
  removeLog: (id: number) => void;
}

const GlobalContext = createContext<GlobalContextValues>({} as GlobalContextValues);

export default GlobalContext;