import React, { PropsWithChildren, useReducer, useState } from "react";
import { Modifier, PlayerData } from "../api/types";
import GlobalContext from "./GlobalContext";
import { LogMessage, MessageType } from "../components/Logger";

export type logAction =
  | {
      type: "ADD_LOG";
      payload: { type: MessageType; message: string; time?: number };
    }
  | { type: "REMOVE_LOG"; payload: { id: number } };

function logReducer(state: LogMessage[], action: logAction) {
  switch (action.type) {
    case "ADD_LOG": {
      const newLog: LogMessage = {
        id: Date.now(),
        type: action.payload.type,
        message: action.payload.message,
        time: action.payload.time
      }
      return [...state, newLog]
    }

    case "REMOVE_LOG": {
      return state.filter(log => log.id !== action.payload.id)
    }
  }
}

const ExampleLogs: LogMessage[] = [
  {
    id: 123,
    type: "information",
    message: "This is a test.",
    time: 3000
  },
  {
    id: 456,
    type: "success",
    message: "This is a success.",
  },
];

export const GlobalProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [data, setData] = useState<PlayerData | null>(null);
  const [modifiers, setModifiers] = useState<Modifier[]>([]);
  const [logs, logDispatch] = useReducer(logReducer, ExampleLogs);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const addLog = (type: MessageType, message: string, time?: number) => {
    logDispatch({ type: 'ADD_LOG', payload: { type, message, time } });
  };

  const removeLog = (id: number) => {
    logDispatch({ type: 'REMOVE_LOG', payload: { id } });
  };

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
    removeLog
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default GlobalProvider;
