import React from 'react';
import CrystalLogoImg from '../../assets/img/logo-crystal.png';
import IsotermLogoImg from '../../assets/img/logo-isoterm.png';
import { FaUserGraduate, FaUser, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CompetitionHome = () => {
    return (
        <section className="py-20 px-10 bg-base-100">
            <h1 className='text-center text-3xl font-bold'>Competitions</h1>
            <div className="flex justify-center">
                <span className="p-0.5 rounded w-24 bg-primary my-5"></span>
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-4 mt-5">
                <Link to={"/competition/crystal"} className="card lg:w-1/4 bg-base-100 shadow-xl my-4 transition ease-in-out delay-150 hover:scale-105 duration-300">
                    <figure><img src={CrystalLogoImg} alt="Crystal Competition ITB" className='w-full' /></figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Crystal Competition</h2>
                        <div className="card-actions my-3">
                            <div className="badge badge-outline"><FaUser className='mr-2' />SMA/K</div>
                            <div className="badge badge-outline"><FaUsers className='mr-2' />1 - 2</div>
                        </div>
                    </div>
                </Link>
                <Link to={"/competition/isoterm"} className="card lg:w-1/4 bg-base-100 shadow-xl my-4 transition ease-in-out delay-150 hover:scale-105 duration-300">
                    <figure><img src={IsotermLogoImg} alt="Isoterm Competition ITB" className='w-full' /></figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Isoterm Competition</h2>
                        <div className="card-actions my-3">
                            <div className="badge badge-outline"><FaUserGraduate className='mr-2' /> D1-D4/S1</div>
                            <div className="badge badge-outline"><FaUsers className='mr-2' />2 - 3</div>
                        </div>
                    </div>
                </Link>
            </div>
        </section>
    )
}

export default CompetitionHome;