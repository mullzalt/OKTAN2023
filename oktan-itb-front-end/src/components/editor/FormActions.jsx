import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'



const FormButton = ({ onClick, type, className, children, isLoading, isError }) => {
    const buttonType = type || 'button'

    return (

        <>
            <button
                className={className}
                type={buttonType}
                onClick={onClick}
                disabled={isLoading || isError}
            >
                {isLoading ?
                    <AiOutlineLoading3Quarters className='animate-spin text-white text-2xl' />
                    : children
                }



            </button>
        </>
    )
}

export { FormButton }