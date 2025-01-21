import React, { PropsWithChildren, useReducer, useState } from "react";
import { Modifier, PlayerData } from "../api/types";
import GlobalContext from "./GlobalContext";
import { LogMessage, MessageType } from "../components/Logger";

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

const ExampleLogs: LogMessage[] = [
  {
    id: 123,
    type: "information",
    message: "This is a test.",
    time: 3000,
  },
  {
    id: 456,
    type: "success",
    message: "This is some process",
    inProgress: true,
  },
];

export const GlobalProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [data, setData] = useState<PlayerData | null>(null);
  const [modifiers, setModifiers] = useState<Modifier[]>([]);
  const [logs, logDispatch] = useReducer(logReducer, ExampleLogs);
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

  const value = {
    data,
    modifiers,
    logs,
    isLoading,
    isUpdating,
    setData,
    setModifiers,
    setIsLoading,
    setIsUpdating,
    addLog,
    removeLog,
    updateLog
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default GlobalProvider;
