import React from 'react'

const Button = ({children} : any) => {
  return (
    <button className="bg-teal-400 text-white px-4 py-3 rounded text-lg">{children}</button>
  )
}

export default Button