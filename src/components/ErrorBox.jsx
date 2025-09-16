import React from 'react'

export const ErrorBox = ({ children }) => {
    return (
        <div className="text-red-600 text-center mt-4 my-4 py-1 border rounded-md border-red-700 bg-white">{children}</div>
    )
}
