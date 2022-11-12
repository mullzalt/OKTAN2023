import React from 'react'
import { Link } from 'react-router-dom'

import Logo from '../../assets/img/logo.png'
import LoginForm from '../../components/auths/LoginForm'

const Login = () => {
  
  return (
    <div>
    <div className="hero min-h-screen bg-base-200">
        <div className="hero-content w-full">
            <div className='w-full md:w-1/2 lg:w-1/3'>
                <div className="flex items-center justify-center gap-2">
                    <Link to={"/"} className='btn btn-ghost btn-lg'>
                        <img src={Logo} alt="" className='w-16' />
                        <div className='text-2xl font-bold text-base-content normal-case ml-2'>
                            Oktan ITB 2023
                        </div>
                    </Link>
                </div>
                {<LoginForm/>}
            </div>
        </div>
    </div>
</div>
  )
}

export default Login