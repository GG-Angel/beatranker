import React from 'react'
import { Icons } from '../constants'

type MesasgeType = "information" | "error" | "success"

type MessageDataType = {
  [key in MesasgeType]: {
    icon: string
    color: string
  }
}

const MessageData: MessageDataType = {
  information: {
    icon: Icons.info,
    color: "white"
  },
  error: {
    icon: Icons.error,
    color: "red"
  },
  success: {
    icon: Icons.success,
    color: "green"
  }
}



const LogMessage: React.FC<{ type: MesasgeType, message: string }> = ({ type, message }) => {
  const data = MessageData[type];
  return (
    <div className="flex flex-row items-start gap-x-2 px-4 py-3 text-tx-light dark:text-tx-dark bg-card-light dark:bg-card-dark border-2 rounded-lg border-card-alt-light dark:border-card-alt-dark">
      <img src={data.icon} color={data.color} width={26} />
      <p className="flex flex-1 flex-wrap">
        {message} Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
      <button onClick={() => {}}>
        <img src={Icons.close} width={26} />
      </button>
    </div>
  )
}

export default LogMessage;
