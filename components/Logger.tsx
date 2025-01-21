import React, { useContext, useEffect } from "react";
import { Icons } from "../constants";
import GlobalContext from "../context/GlobalContext";

export type MessageType = "information" | "error" | "success";

export interface LogMessage {
  id: number;
  type: MessageType;
  message: string;
  inProgress?: boolean;
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
    if (!log.inProgress) { // start deletion timer after finished
      const tid = setTimeout(() => {
        removeLog(log.id);
      }, log.time ?? 6000); // default to 6 sec
  
      return () => clearTimeout(tid);
    }
  }, [log.id, log.time, log.inProgress]);

  return (
    <div className={`flex flex-row w-full items-start gap-x-2 px-4 py-3 text-tx-light dark:text-tx-dark bg-card-light dark:bg-card-dark border-2 rounded-lg shadow-2xl shadow-bg-light dark:shadow-bg-dark ${log.inProgress ? "border-active-light dark:border-active-dark" : "border-card-alt-light dark:border-card-alt-dark "}`}>
      <img src={data.icon} color={data.color} width={26} />
      <p className="flex flex-1 flex-wrap">
        {log.message}
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
    <div className="fixed w-full lg:max-w-[500px] max-w-[400px] z-50 right-0 bottom-0 flex flex-col gap-y-2 justify-end py-4 px-4">
      {logs.map((log) => <LogMessage key={log.id} log={log} /> )}
    </div>
  );
};

export default Logger;
