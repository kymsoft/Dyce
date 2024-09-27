import React from 'react'
import { ClipLoader } from 'react-spinners'

const Loader = () => {
  return (
    <div className="flex items-center w-full justify-center h-[85vh]">
        <ClipLoader />
    </div>
  )
}

export default Loader