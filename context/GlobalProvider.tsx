import React, { PropsWithChildren, useEffect, useReducer, useState } from "react";
import { Modifier, PlayerData, Recommendation } from "../api/types";
import GlobalContext from "./GlobalContext";
import { LogMessage, MessageType } from "../components/Logger";
import { FilterState } from "../components/FiltersMenu";

export type logAction =
  | {
      type: "ADD_LOG";
      payload: {
        id: number;
        type: MessageType;
        message: string;
        inProgress?: boolean;
        time?: number;
      };
    }
  | {
      type: "REMOVE_LOG";
      payload: { id: number };
    }
  | {
      type: "UPDATE_LOG";
      payload: {
        id: number;
        type?: MessageType;
        message?: string;
        inProgress?: boolean;
        time?: number;
      };
    };

function logReducer(state: LogMessage[], action: logAction) {
  switch (action.type) {
    case "ADD_LOG": {
      return [...state, { ...action.payload }]
    }

    case "REMOVE_LOG": {
      return state.filter((log) => log.id !== action.payload.id);
    }

    case "UPDATE_LOG": {
      return state.map((log) => log.id === action.payload.id ? { ...log, ...action.payload } : log)
    }
  }
}

export const GlobalProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [data, setData] = useState<PlayerData | null>(null);
  const [originalRecs, setOriginalRecs] = useState<Recommendation[] | null>(null);
  const [modifiers, setModifiers] = useState<Modifier[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    gainsOnly: false,
    starRange: [-Infinity, Infinity],
  });
  const [logs, logDispatch] = useReducer(logReducer, []);
  const [isDark, setIsDark] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const addLog = (type: MessageType, message: string, inProgress?: boolean, time?: number): number => {
    const id = Date.now();
    logDispatch({ type: "ADD_LOG", payload: { id, type, message, inProgress, time } });
    return id;
  };

  const removeLog = (id: number): void => {
    logDispatch({ type: "REMOVE_LOG", payload: { id } });
  };

  const updateLog = (id: number, type?: MessageType, message?: string, inProgress?: boolean, time?: number): void => {
    logDispatch({ type: "UPDATE_LOG", payload: { id, type, message, inProgress, time } })
  }

  useEffect(() => {
    const detectTheme = () => {
      const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setIsDark(darkModeMediaQuery.matches);
    };
    detectTheme();
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeMediaQuery.addEventListener('change', () => detectTheme());
    return () => {
      darkModeMediaQuery.removeEventListener('change', () => detectTheme());
    };
  }, []);

  const value = {
    data,
    originalRecs,
    modifiers,
    filters,
    logs,
    isLoading,
    isUpdating,
    isDark,
    setData,
    setOriginalRecs,
    setModifiers,
    setFilters,
    setIsLoading,
    setIsUpdating,
    setIsDark,
    addLog,
    removeLog,
    updateLog
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default GlobalProvider;
