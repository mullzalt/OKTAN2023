import React from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../services/auth/authSlice'

import WelcomeImg from '../../assets/img/welcome-admin.jpg';
import { Link } from 'react-router-dom'

export const DashboardModerator = () => {
    const user = useSelector(selectCurrentUser)



    return (
        <div className="flex justify-center pt-8">
            <div className="card lg:w-1/2 bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                    <img src={WelcomeImg} alt="Shoes" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">Hallo, {user.profile.name || user.username}! selamat datang di website panitia OKTAN ITB 2023</h2>
                    <div className="card-actions">
                        <Link to={'/moderator/payments'} className="btn btn-primary mt-2">Kelola Pendaftaran Peserta Sekarang →</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
