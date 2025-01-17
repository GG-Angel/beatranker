import { createContext, Dispatch, SetStateAction } from "react";
import { Modifier, PlayerData } from "../api/types";

interface GlobalContextValues {
  data: PlayerData | null;
  modifiers: Modifier[];
  isLoading: boolean;
  isUpdating: boolean;
  setData: Dispatch<SetStateAction<PlayerData | null>>;
  setModifiers: Dispatch<SetStateAction<Modifier[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setIsUpdating: Dispatch<SetStateAction<boolean>>;
}

const GlobalContext = createContext<GlobalContextValues>({} as GlobalContextValues);

export default GlobalContext;