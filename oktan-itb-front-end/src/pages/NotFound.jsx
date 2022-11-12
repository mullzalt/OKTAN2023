import React, { useEffect } from 'react';
import Logo from '../assets/img/logo.png';
import CardLogin from '../components/CardLogin';
import { Link, useNavigate } from 'react-router-dom';


const NotFound = () => {

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content w-full">
                    <div className='w-full md:w-1/2 lg:w-1/3'>
                        <div className="flex items-center justify-center gap-6">
                              <h1 className='text-9xl font-black'>404</h1>
                        </div>
                        <div className="flex items-center justify-center gap-6 mt-2">
                              <span className='text-2xl font-semibold'>Halaman tidak ditemukan</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <Link to={"/login"} replace={true} className='btn btn-ghost btn-lg link'>
                                
                                <div className='text-2xl font-bold text-base-content normal-case ml-2'>
                                    Kembali ke halaman utama
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound;