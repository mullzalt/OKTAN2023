import React from 'react';
import Logo from '../../assets/img/logo.png';
import { BsPerson, BsAward } from 'react-icons/bs'
import { RiProfileLine } from 'react-icons/ri'
import { MdOutlineDashboard, MdPayment, MdPayments } from "react-icons/md";
import { Link, NavLink } from 'react-router-dom';


const Sidebar = () => {

    return (
        <div className="drawer-side" style={{ scrollBehavior: 'smooth', scrollPaddingTop: '5rem' }}>
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
            <aside className='bg-base-200 w-80'>
                <ul className="menu p-4 overflow-y-auto w-100 text-base-content">
                    <li className='mb-3'>
                        <Link to={"/dashboard"} className='text-xl font-bold text-base-content'>
                            <img src={Logo} alt="" className='w-14' />
                            OKTAN ITB 2023
                        </Link>
                    </li>
                    <li><NavLink to={"/dashboard"} className='text-sm'><MdOutlineDashboard className='text-2xl mr-2' />Dashboard</NavLink></li>

                        <div>
                            <li><div className="text-md font-bold cursor-default ">Kompetisi</div></li>
                            <li><NavLink to={"/competition"} className='text-sm'><BsAward className='text-2xl mr-2' />Daftar Kompetisi</NavLink></li>

                            <li><NavLink to={"/mycompetition"} className='text-sm'><RiProfileLine className='text-2xl mr-2' />Kompetisi Saya</NavLink></li>

                            <li><div className="text-md font-bold cursor-default">Pembayaran</div></li>
                            <li><NavLink to={"/invoices/me"} className='text-sm'><MdPayment className='text-2xl mr-2' />Tagihan Saya</NavLink></li>

                            <li><NavLink to={"/payments/me"} className='text-sm'><MdPayments className='text-2xl mr-2' />Riwayat Pembayaran</NavLink></li>
                        </div>
              
                
                        <div>
                            <li><div className="text-md font-bold cursor-default">Log Pembayaran</div></li>
                            <li><NavLink to={"/moderator/payments"} className='text-sm'><MdPayments className='text-2xl mr-2' />Riwayat Pembayaran Peserta</NavLink></li>
                        </div>
                 



                    {/* <li><div className="text-md font-bold cursor-default">Tables</div></li>
                    <li><NavLink to={"/peserta"} className='text-sm'><BsPerson className='text-2xl mr-2' />Data Peserta</NavLink></li>
                    <li><a className='text-sm'><BsAward className='text-2xl mr-2' />Pilih Lomba</a></li>
                    <li><a className='text-sm'><BsCash className='text-2xl mr-2' />Tagihan</a></li>
                    <li><div className="text-md font-bold cursor-default">Pembayaran</div></li>
                    <li><a className='text-sm'><BsCash className='text-2xl mr-2' />Belum Lunas</a></li>
                    <li><a className='text-sm'><BsCash className='text-2xl mr-2' />Pending</a></li>
                    <li><a className='text-sm'><BsCash className='text-2xl mr-2' />Sudah Lunas</a></li>
                    <li><div className="text-md font-bold cursor-default">References</div></li>
                    <li><NavLink to={"/panitia"} className='text-sm'><BsPerson className='text-2xl mr-2' />Data Panitia</NavLink></li>
                    <li><a className='text-sm'><BsAward className='text-2xl mr-2' />Data Lomba</a></li> */}
                </ul>
            </aside>
        </div>
    )
}

export default Sidebar;