import React from 'react';
import { FaMedal, FaTrophy, FaMoneyBillWave } from 'react-icons/fa';

const PrizeCrystalCompetition = () => {
    return (
        <section className="pb-20 pt-10 px-10 bg-base-100 lg:px-40">
            <h1 className='text-left md:text-center text-3xl font-bold'>Prize Pool</h1>
            <div className="flex md:justify-center">
                <span className="p-0.5 rounded w-24 bg-primary my-5"></span>
            </div>
            <div className="flex justify-center">
                <p className='w-full text-left md:w-1/2 md:text-center'>Berikut merupakan hadiah dari kejuaraan Crystal Competition.</p>
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-4 mt-5">
                <div href='#' className="card md:w-1/2 lg:w-1/3 bg-base-100 shadow-xl my-4 transition ease-in-out delay-150 hover:scale-105 duration-300">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Juara 1</h2>
                        <p className='text-gray-500'>Medali + Piala bergilir + Uang pembinaan Rp. 9.000.000
                        </p>
                        <div className="card-actions my-3">
                            <div className="flex gap-3">
                                <div className='rounded-full shadow md p-4'><FaMedal className='text-2xl text-primary' /></div>
                                <div className='rounded-full shadow md p-4'><FaTrophy className='text-2xl text-primary' /></div>
                                <div className='rounded-full shadow md p-4'><FaMoneyBillWave className='text-2xl text-primary' /></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div href='#' className="card md:w-1/2 lg:w-1/3 bg-base-100 shadow-xl my-4 transition ease-in-out delay-150 hover:scale-105 duration-300">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Juara 2</h2>
                        <p className='text-gray-500'>Medali + Piala bergilir + Uang pembinaan Rp. 6.000.000
                        </p>
                        <div className="card-actions my-3">
                            <div className="flex gap-3">
                                <div className='rounded-full shadow md p-4'><FaMedal className='text-2xl text-primary' /></div>
                                <div className='rounded-full shadow md p-4'><FaTrophy className='text-2xl text-primary' /></div>
                                <div className='rounded-full shadow md p-4'><FaMoneyBillWave className='text-2xl text-primary' /></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div href='#' className="card md:w-1/2 lg:w-1/3 bg-base-100 shadow-xl my-4 transition ease-in-out delay-150 hover:scale-105 duration-300">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Juara 3</h2>
                        <p className='text-gray-500'>Medali + Piala bergilir + Uang pembinaan Rp. 3.000.000
                        </p>
                        <div className="card-actions my-3">
                            <div className="flex gap-3">
                                <div className='rounded-full shadow md p-4'><FaMedal className='text-2xl text-primary' /></div>
                                <div className='rounded-full shadow md p-4'><FaTrophy className='text-2xl text-primary' /></div>
                                <div className='rounded-full shadow md p-4'><FaMoneyBillWave className='text-2xl text-primary' /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-4 mt-5">
                <div href='#' className="card md:w-1/2 lg:w-1/3 bg-base-100 shadow-xl my-4 transition ease-in-out delay-150 hover:scale-105 duration-300">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Juara Harapan 1</h2>
                        <p className='text-gray-500'>Medali + Uang pembinaan Rp. 1.500.000
                        </p>
                        <div className="card-actions my-3">
                            <div className="flex gap-3">
                                <div className='rounded-full shadow md p-4'><FaMedal className='text-2xl text-primary' /></div>
                                <div className='rounded-full shadow md p-4'><FaMoneyBillWave className='text-2xl text-primary' /></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div href='#' className="card md:w-1/2 lg:w-1/3 bg-base-100 shadow-xl my-4 transition ease-in-out delay-150 hover:scale-105 duration-300">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Juara Harapan 2</h2>
                        <p className='text-gray-500'>Medali + Uang pembinaan Rp. 1.000.000
                        </p>
                        <div className="card-actions my-3">
                            <div className="flex gap-3">
                                <div className='rounded-full shadow md p-4'><FaMedal className='text-2xl text-primary' /></div>
                                <div className='rounded-full shadow md p-4'><FaMoneyBillWave className='text-2xl text-primary' /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PrizeCrystalCompetition;