import React, { useContext, useEffect, useState } from "react";
import { Icons } from "../constants";
import GlobalContext from "../context/GlobalContext";

export type MessageType = "information" | "error" | "success";

export interface LogMessage {
  id: number;
  type: MessageType;
  message: string;
  time?: number;
}

type MessageDataType = {
  [key in MessageType]: {
    icon: string;
    color: string;
  };
};

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

const LogMessage: React.FC<{ log: LogMessage }> = ({ log }) => {
  const { removeLog } = useContext(GlobalContext);
  const data = MessageData[log.type];

  useEffect(() => {
    const tid = setTimeout(() => {
      removeLog(log.id);
    }, log.time ?? 7000); // default to 7 sec

    return () => clearTimeout(tid);
  }, [log.time]);

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

const Logger = () => {
  const { logs } = useContext(GlobalContext);

  return (
    <div className="-bg-slate-600 fixed lg:max-w-[740px] max-w-[400px] z-50 right-0 bottom-0 flex flex-col gap-y-2 justify-end py-4 px-4">
      {logs.map((log) => <LogMessage log={log} /> )}
    </div>
  );
};

export default Logger;
