import React from 'react'

const Button = ({children, className, ...buttonProps} : any) => {
  const classname = `${className} bg-[#35c0e4] flex justify-center items-center text-white px-4 py-3 rounded text-xl font-bold hover:bg-[#3498db] flex flex-row`

  return (
    <button className={classname} {...buttonProps}>{children}</button>
  )
}

export default Button