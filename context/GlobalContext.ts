import { createContext, Dispatch, SetStateAction } from "react";
import { PlayerData } from "../api/types";

interface GlobalContextValues {
  data: PlayerData | null;
  isLoading: boolean;
  isUpdating: boolean;
  setData: Dispatch<SetStateAction<PlayerData | null>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setIsUpdating: Dispatch<SetStateAction<boolean>>;
}

const GlobalContext = createContext<GlobalContextValues>({} as GlobalContextValues);

export default GlobalContext;