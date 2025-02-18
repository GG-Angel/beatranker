import React from "react";
import Icons from "../constants/icons";

export const LoadingSpinner: React.FC<{ style?: string }> = ({ style }) => {
  return (
    <Icons.spinner
      className={style}
      stroke="white"
      width={20}
      height={20}
      aria-label="Loading Spinner"
    />
  );
};
