import React from 'react'

const CancelButton = ({children, className, ...buttonProps} : any) => {
  const classname = `${className} btn border-1 border-green-600 text-green-600 font-semibold py-2 px-4 rounded-md hover:bg-green-600 hover:text-white transition duration-300`

  return (
    <button className={classname} {...buttonProps}>{children}</button>
  )
}

export default CancelButton