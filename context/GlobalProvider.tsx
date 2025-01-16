import React, { createContext, PropsWithChildren, useState } from 'react'
import { PlayerData } from "../api/types"

const GlobalContext = createContext({});

export const GlobalProvider: React.FC<PropsWithChildren> = ({ children }) => {
  
  
  return (
    <>
      {/* <GlobalContext.Provider>
        {children}
      </GlobalContext.Provider> */}
    </>
  )
}
