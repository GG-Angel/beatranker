import React, { useContext, useEffect } from "react";
import { Colors, Icons } from "../constants";
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
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    color: string;
  };
};

const LogMessage: React.FC<{ log: LogMessage }> = ({ log }) => {
  const { isDark, removeLog } = useContext(GlobalContext);

  const LogMessageIcon = (type: MessageType) => {
    const IconComponent: MessageDataType = {
      information: {
        icon: Icons.info,
        color: isDark ? Colors.tx.dark : Colors.tx.light,
      },
      success: {
        icon: Icons.success,
        color: isDark ? Colors.green.dark : Colors.green.light,
      },
      error: {
        icon: Icons.error,
        color: isDark ? Colors.red.dark : Colors.red.light,
      },
    };

    const Selected = IconComponent[type];
    return <Selected.icon fill={Selected.color} width={26} />;
  };

  useEffect(() => {
    if (!log.inProgress) {
      // start deletion timer after finished
      const tid = setTimeout(() => {
        removeLog(log.id);
      }, log.time ?? 6000); // default to 6 sec

      return () => clearTimeout(tid);
    }
  }, [log.id, log.time, log.inProgress]);

  return (
    <div
      className={`flex flex-row w-full items-start gap-x-2 px-4 py-3 text-tx-light dark:text-tx-dark bg-card-light dark:bg-card-dark border-2 rounded-lg shadow-xl fade-in transition ${
        log.inProgress
          ? "border-active-light dark:border-active-dark shadow-active-light/30 dark:shadow-active-dark/30"
          : "border-card-alt-light dark:border-card-alt-dark shadow-black/5"
      }`}
    >
      {LogMessageIcon(log.type)}
      <p className="flex flex-1 flex-wrap">{log.message}</p>
      <button
        className="hover:opacity-60 bg-transparent transition-opacity"
        onClick={() => removeLog(log.id)}
      >
        <Icons.close
          fill={isDark ? Colors.tx.dark : Colors.tx.light}
          width={26}
        />
      </button>
    </div>
  );
};

const Logger = () => {
  const { logs } = useContext(GlobalContext);

  return (
    <div className="fixed w-full lg:max-w-[500px] max-w-[400px] z-40 right-0 bottom-0 flex flex-col gap-y-2 justify-end py-4 px-4">
      {logs.map((log) => (
        <LogMessage key={log.id} log={log} />
      ))}
    </div>
  );
};

export default Logger;
