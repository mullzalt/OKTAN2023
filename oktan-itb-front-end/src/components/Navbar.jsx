import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../assets/img/logo.png'
import useScrollPosition from './hooks/useScrollPosition';

const Navbar = () => {
    const classNames = (...classes) => {
        return classes.filter(Boolean).join(' ');
    }

    const scrollPosition = useScrollPosition();

    return (
        <div className={classNames(scrollPosition > 0 ? 'shadow-md bg-white' : 'text-base-100', "navbar py-5 fixed top-0 inset-x-0 z-50 bg-opacity-90 transition duration-150")}>
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-base-content lg:text-base-100">
                        <li tabIndex={0}>
                            <a className="justify-between">
                                Competition
                                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>
                            </a>
                            <ul className="p-2 bg-base-100 text-base-content">
                                <li><NavLink to={"/competition/crystal"}>Crystal Competition</NavLink></li>
                                <li><NavLink to={"/competition/isoterm"}>Isoterm Competition</NavLink></li>
                            </ul>
                        </li>
                        <li><a>Atomic</a></li>
                        <li><a>Webinar</a></li>
                        <li><a>About</a></li>
                        <li><a>FAQ</a></li>
                    </ul>
                </div>
                <NavLink to={"/"} className="btn btn-ghost normal-case text-md font-bold lg:btn-lg">
                    <img src={Logo} alt="" className='w-14' />
                    <span className='ml-2'>OKTAN ITB 2023</span>
                </NavLink>
            </div>
            <div className="navbar-end gap-5">
                <div className="hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        <li tabIndex={0}>
                            <a>
                                Competition
                                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
                            </a>
                            <ul className="p-2 bg-base-100 text-base-content">
                                <li><NavLink to={"/competition/crystal"}>Crystal Competition</NavLink></li>
                                <li><NavLink to={"/competition/isoterm"}>Isoterm Competition</NavLink></li>
                            </ul>
                        </li>
                        <li><a>Atomic</a></li>
                        <li><a>Webinar</a></li>
                        <li><a>About</a></li>
                        <li><a>FAQ</a></li>
                    </ul>
                </div>
                <NavLink to={"/login"} className="btn btn-success text-white btn-sm lg:btn-md">Sign In</NavLink>
            </div>
        </div >
    )
}

export default Navbar;