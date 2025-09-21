import React from "react"

const IconButton = ({ icon: Icon, label, className = "", onClick, ...props }) => {
  const baseClasses =
    "inline-flex items-center space-x-2 rounded-md px-4 py-2 font-medium border transition-colors"

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} bg-gray-900 text-white  hover:bg-white hover:text-gray-900 hover:border-gray-900 ${className}`}
      {...props}
    >
      {Icon && <Icon className="h-4 w-4" />}
      <span>{label}</span>
    </button>
  )
}

export default IconButton
