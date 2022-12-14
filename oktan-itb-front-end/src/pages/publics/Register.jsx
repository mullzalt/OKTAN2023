import React from 'react'
import { Link } from 'react-router-dom';
import Logo from '../../assets/img/logo.png';
import RegisterForm from '../../components/auths/RegisterForm';



const Register = () => {
  return (
    <div>
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content w-full">
                <div className='w-full md:w-2/3 lg:w-1/2'>
                    <div className="flex items-center justify-center gap-2">
                        <Link to={"/"} className='btn btn-ghost btn-lg'>
                            <img src={Logo} alt="" className='w-16' />
                            <div className='text-2xl font-bold text-base-content normal-case ml-2'>
                                Oktan ITB 2023
                            </div>
                        </Link>
                    </div>
                    {<RegisterForm/>}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register