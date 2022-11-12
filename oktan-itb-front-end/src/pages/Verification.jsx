import React, { useEffect } from 'react';
import CardVerification from '../components/CardVerification';

const Verification = () => {

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col">
                <div className='w-full lg:w-3/4'>
                    <div className='min-w-screen'>
                        <CardVerification />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Verification;