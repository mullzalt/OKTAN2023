import React from 'react'
import VerifySuccessNotification from '../../components/auths/VerifySuccessNotification'

const EmailVerified = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
    <div className="hero-content flex-col">
        <div className='w-full'>
            <div className='min-w-screen'>
                <VerifySuccessNotification />
            </div>
        </div>
    </div>
</div >
  )
}

export default EmailVerified