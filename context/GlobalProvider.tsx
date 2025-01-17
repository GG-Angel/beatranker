import React, { PropsWithChildren, useState } from 'react'
import { Modifier, PlayerData } from "../api/types"
import GlobalContext from "./GlobalContext"

export const GlobalProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [data, setData] = useState<PlayerData | null>(null);
  const [modifiers, setModifiers] = useState<Modifier[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  
  const value = { data, modifiers, isLoading, isUpdating, setData, setModifiers, setIsLoading, setIsUpdating }

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider;
