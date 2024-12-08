import React from 'react'
import clsx from 'clsx'

const Button = ({ icon, className, label, type, onClick = () => 
{} }) => {

  return  (
    <button type = {type || "button"} className={clsx("rounded-full px-3 py-2 outline-none hover:shadow-inner transition duration-300 hover:scale-105", className)}>
      <span>{label}</span>
      {icon && icon}
    </button>
  )
}

export default Button