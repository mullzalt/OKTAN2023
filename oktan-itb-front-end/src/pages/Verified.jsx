import React from 'react'
import CardVerified from '../components/CardVerified'

const Verified = () => {
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col">
                <div className='w-full'>
                    <div className='min-w-screen'>
                        <CardVerified />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Verified