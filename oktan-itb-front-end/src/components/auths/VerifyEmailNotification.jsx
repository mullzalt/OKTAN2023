import React, { useEffect, useState } from 'react';
import { MdInfo, MdDangerous, MdCheckCircle } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useResendEmailMutation } from '../../features/auth/authApiSlice';
import { destroyCredentials, selectCurrentProfile, selectCurrentUser } from '../../features/auth/authSlice';
import { useCountDown } from '../hooks/countDown';
import Spinner from '../Spinner';

const VerifyEmailNotification = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector(selectCurrentUser)
    const profile = useSelector(selectCurrentProfile)

    const [timeLeft, setTimeLeft] = useState(profile === undefined? 300 : 30)
    const [resendStatus, setResendMessage] = useState('initial')
    const [days, hours, minutes, seconds] = useCountDown(timeLeft)


    const [resend, {isSuccess, isLoading, isError}] = useResendEmailMutation()

    useEffect(() => {
        if(!user) navigate('/login', {replace: true})
        if(user?.verified) navigate('/login', {replace: true})


        if(isSuccess) setResendMessage('success')
        if(isError) setResendMessage('failed')

        if (!timeLeft) return;
        const resendInterval = setInterval(() => {
            setTimeLeft(timeLeft - 1)
        }, 1000)

        return () => {
            clearInterval(resendInterval)
        }

    }, [user, timeLeft, setTimeLeft, isSuccess, isError])
    
    const onLogout = () => {
        dispatch(destroyCredentials()) 
        navigate('/login', {replace: true})
    }

    const resendLink = async() => {
        await resend(user.id)
        setTimeLeft(300)
    }

    
    if (isLoading) {
        return <Spinner />
    }

  return (
    <div className="card bg-base-100 shadow-xl lg:p-5">
            <div className="card-body">
                <h2 className="card-title">
                    {!(profile === undefined) ? "Harap aktivasi akun anda terlebih dahulu!" : 'Akun telah didaftarkan!'}
                </h2>
                <hr />
                <div className='mt-4'>Harap aktivasi akun Anda melalui link yang telah kami kirimkan kepada email "<span className='font-semibold'>{ user?.email}</span>".
                </div>
                <div className="alert shadow-lg mt-4">
                    <div className='flex-col md:flex-row'>
                        {(resendStatus === 'initial') ? 
                        (<MdInfo className='text-info text-5xl mr-2' />): 
                        (resendStatus === 'success') ? 
                        (<MdCheckCircle className='text-success text-5xl mr-2' />):
                        (resendStatus === 'failed') ? 
                        (<MdDangerous className='text-danger text-5xl mr-2' />) : null}
                        
                        {(resendStatus === 'initial') ? 
                        (<p>Jika Anda tidak menemukan email yang kami kirimkan, harap periksa <span className='font-semibold'>inbox spam</span>  di email Anda.</p>): 
                        (resendStatus === 'success') ? 
                        (<p>Email berhasil dikirimkan ke email <span className='font-semibold text-yellow'>{ user?.email}</span> ! Jika anda masih tidak menemukan email anda harap periksa <span className='font-semibold'>inbox spam</span>  di email Anda.</p>):
                        (resendStatus === 'failed') ? 
                        (<p>Email gagal dikirimkan ke email <span className='font-semibold text-yellow'>{ user?.email}</span>... coba kirim lagi setelah beberapa saat. <span className='font-semibold'>inbox spam</span>  di email Anda.</p>) : null}
                            
                        
                    </div>
                </div>
                <div className="card-actions justify-center mt-4">
                <button onClick={resendLink} className={`btn btn-primary ${timeLeft ? ('btn-disabled') : null}`}>
                    {timeLeft ? `(${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')})` 
                    : 'Resend Link'}
                </button>
                </div>

                <div className="card-actions justify-center mt-4">
                    <div className="link link-hover text-info" onClick={onLogout}>Back to login page →</div>
                </div>
            </div>
        </div>
  )
}

export default VerifyEmailNotification