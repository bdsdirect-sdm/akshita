import React from 'react'
import {useNavigate} from "react-router-dom"

const CancelButton = ({children, className, ...buttonProps} : any) => {
  const classname = `${className} btn border-1 border-green-600 text-green-600 font-semibold py-2 px-4 rounded-md hover:bg-green-600 hover:text-white transition duration-300`
  const navigate = useNavigate();

  return (
    <button type='button' className={classname} {...buttonProps} onClick={() => navigate(-1)}>{children}</button>
  )
}

export default CancelButton