import React from 'react';
import { useEffect } from 'react';
import { MdVerified } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { destroyCredentials, selectCurrentUser } from '../../features/auth/authSlice';

const VerifySuccessNotification = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector(selectCurrentUser)

    useEffect(() => {
        if(user) navigate('/login')
    }, user)

    const onLogout = () => {
        dispatch(destroyCredentials()) 
        navigate('/login')
    }
    return (
        <div className="card bg-base-100 shadow-xl lg:p-5">
            <div className="card-body">
                <h2 className="card-title">
                    <div>
                        Akun telah berhasil diaktivasi! <MdVerified className='text-success text-3xl inline-block' />
                    </div>
                </h2>
                <hr />
                <p className='mt-4'>Terimakasih telah berpartisipasi dalam kompetisi OKTAN ITB 2023
                </p>
                <div className="card-actions justify-center mt-4">
                    <div onClick={onLogout} className="link link-hover text-info">Back to login page →</div>
                </div>
            </div>
        </div>
    )
}

export default VerifySuccessNotification;