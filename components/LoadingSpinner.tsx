import React from 'react'
import { ClipLoader } from 'react-spinners'

export const LoadingSpinner: React.FC<{ style?: string }> = ({ style }) => {
  return (
    <ClipLoader
      className={style}
      color="#FFFFFF"
      cssOverride={{
        display: "block",
        margin: "0 auto",
      }}
      size={20}
      aria-label="Loading Spinner"
    />
  )
}
