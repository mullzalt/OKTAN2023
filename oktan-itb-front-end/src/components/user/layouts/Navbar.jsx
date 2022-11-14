import React, { useEffect } from 'react';
import { useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { BsCaretDownFill, BsFillPersonFill, BsPower, BsFillPaletteFill, BsPalette2 } from 'react-icons/bs';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../../features/auth/authApiSlice';

import { destroyCredentials, selectCurrentUser } from '../../../features/auth/authSlice'
import Spinner from '../../Spinner';


const Navbar = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [logout, { isError, isLoading, isSuccess }] = useLogoutMutation()

    const user = useSelector(selectCurrentUser)


    useEffect(() => {
        if (isSuccess) {
            dispatch(destroyCredentials())
            navigate('/login', { replace: true })
        }
    }, [isSuccess, user])

    const logoutHandler = async (e) => {
        e.preventDefault()
        try {
            logout()
        } catch (error) {
            console.log(error)
        }
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className="navbar bg-base-100 shadow-md py-5 sticky top-0 z-30 bg-opacity-90">
            <div className="flex-none block lg:hidden">
                <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </label>
            </div>
            <div className="flex-1 justify-end gap-2">
                {/* <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost">
                        <BsFillPaletteFill className='lg:mr-1 text-xl' /><span className='hidden lg:block'>Theme</span> <BsCaretDownFill className='ml-1' />
                    </label>
                    <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                        <li className={"outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2 mb-3" + (props.theme === 'light' ? ' outline' : '')}><button data-theme="light" className='bg-base-100 text-base-content w-full cursor-pointer font-sans' onClick={() => props.setTheme('light')}><BsPalette2 />Light</button></li>
                        <li className={"outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2 mb-3" + (props.theme === 'cupcake' ? ' outline' : '')}><button data-theme="cupcake" className='bg-base-100 text-base-content w-full cursor-pointer font-sans' onClick={() => props.setTheme('cupcake')}><BsPalette2 />Cupcake</button></li>
                        <li className={"outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2 mb-3" + (props.theme === 'bumblebee' ? ' outline' : '')}><button data-theme="bumblebee" className='bg-base-100 text-base-content w-full cursor-pointer font-sans' onClick={() => props.setTheme('bumblebee')}><BsPalette2 />Bumblebee</button></li>
                        <li className={"outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2 mb-3" + (props.theme === 'emerald' ? ' outline' : '')}><button data-theme="emerald" className='bg-base-100 text-base-content w-full cursor-pointer font-sans' onClick={() => props.setTheme('emerald')}><BsPalette2 />Emerald</button></li>
                        <li className={"outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2 mb-3" + (props.theme === 'corporate' ? ' outline' : '')}><button data-theme="corporate" className='bg-base-100 text-base-content w-full cursor-pointer font-sans' onClick={() => props.setTheme('corporate')}><BsPalette2 />Corporate</button></li>
                        <li className={"outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2 mb-3" + (props.theme === 'garden' ? ' outline' : '')}><button data-theme="garden" className='bg-base-100 text-base-content w-full cursor-pointer font-sans' onClick={() => props.setTheme('garden')}><BsPalette2 />Garden</button></li>
                        <li className={"outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2 mb-3" + (props.theme === 'winter' ? ' outline' : '')}><button data-theme="winter" className='bg-base-100 text-base-content w-full cursor-pointer font-sans' onClick={() => props.setTheme('winter')}><BsPalette2 />Winter</button></li>
                    </ul>
                </div> */}
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost">
                        {user?.username ? user.username : null}
                        <BsCaretDownFill className='ml-1' />
                    </label>
                    <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                        <li><NavLink to={"/profile"}><BsFillPersonFill />Profile</NavLink></li>
                        <hr />
                        <li><button onClick={logoutHandler}><BsPower />Logout</button></li>
                    </ul>
                </div>
            </div>
        </div >
    )
}

export default Navbar;