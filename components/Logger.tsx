import React, { useEffect, useState } from "react";
import { Icons } from "../constants";

type MessageType = "information" | "error" | "success";

type MessageDataType = {
  [key in MessageType]: {
    icon: string;
    color: string;
  };
};

export interface LogMessage {
  id: number;
  type: MessageType;
  message: string;
  time?: number
}

const MessageData: MessageDataType = {
  information: {
    icon: Icons.info,
    color: "white",
  },
  error: {
    icon: Icons.error,
    color: "red",
  },
  success: {
    icon: Icons.success,
    color: "green",
  },
};

const LogMessage: React.FC<{log: LogMessage, removeLog: (id: number) => void}> = ({ log, removeLog }) => {
  const data = MessageData[log.type];

  useEffect(() => {
    const tid = setTimeout(() => {
      removeLog(log.id)
    }, log.time ?? 7000) // default to 7 sec

    return () => clearTimeout(tid)
  }, [log.time])

  return (
    <div className="flex flex-row items-start gap-x-2 px-4 py-3 text-tx-light dark:text-tx-dark bg-card-light dark:bg-card-dark border-2 rounded-lg border-card-alt-light dark:border-card-alt-dark shadow-2xl shadow-bg-light dark:shadow-bg-dark">
      <img src={data.icon} color={data.color} width={26} />
      <p className="flex flex-1 flex-wrap">
        {log.message} Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
      <button onClick={() => removeLog(log.id)}>
        <img src={Icons.close} width={26} />
      </button>
    </div>
  );
};

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

const Logger = () => {
  const [logs, setLogs] = useState<LogMessage[]>(ExampleLogs);

  const addLog = (type: MessageType, message: string, time?: number) => {
    let log = { id: Date.now(), type: type, message: message, time: time } as LogMessage
    setLogs([...logs, log]);
  }

  const removeLog = (id: number) => setLogs(logs.filter(l => l.id != id))

  return (
    <div className="-bg-slate-600 fixed lg:max-w-[740px] max-w-[400px] z-50 right-0 bottom-0 flex flex-col gap-y-2 justify-end py-4 px-4">
      {logs.map((log) => (
        <LogMessage log={log} removeLog={removeLog} />
      ))}
    </div>
  );
};

export default Logger;
