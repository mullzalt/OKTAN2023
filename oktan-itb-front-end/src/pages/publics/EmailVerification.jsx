import React from 'react'
import VerifyEmailNotification from '../../components/auths/VerifyEmailNotification'

const EmailVerification = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col">
                <div className='w-full lg:w-3/4'>
                    <div className='min-w-screen'>
                        {<VerifyEmailNotification/>}
                    </div>
                </div>
            </div>
        </div >
  )
}

export default EmailVerification