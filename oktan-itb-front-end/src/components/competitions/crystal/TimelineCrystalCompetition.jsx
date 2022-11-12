import React from 'react';
import TimelineImg from '../../../assets/img/timeline.jpg';

const TimelineCrystalCompetition = () => {
    return (
        <section className="py-20 px-10 lg:px-40 bg-base-200">
            <h1 className='md:text-center text-3xl font-bold'>Timeline</h1>
            <div className="flex md:justify-center">
                <span className="p-0.5 rounded w-24 bg-primary my-5"></span>
            </div>
            <div className="mt-5">
                <div className="flex flex-wrap items-center">
                    <div className="w-full md:w-5/12 mx-auto">
                        <div className="flex mt-5">
                            <div className="flex flex-col items-center mr-4">
                                <div>
                                    <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="w-px h-full bg-gray-600"></div>
                            </div>
                            <div className="pb-8 ">
                                <p className="mb-2 text-xl font-bold text-gray-700">Pendaftaran</p>
                                <p className="text-gray-700 italic">
                                    <span className='font-bold'>Pendaftaran Gelombang I :</span> <br /> 31 Oktober 2022 - 25 November 2022 <br /><br />
                                    <span className='font-bold'>Pendaftaran Gelombang II :</span> <br />28 November 2022 - 16 Desember 2022 <br /> <br />
                                    <span className='font-bold'>Pendaftaran Gelombang III :</span> <br />19 Desember 2022 - 13 Januari 2023
                                </p>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex flex-col items-center mr-4">
                                <div>
                                    <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="w-px h-full bg-gray-600"></div>
                            </div>
                            <div className="pb-8 ">
                                <p className="mb-2 text-xl font-bold text-gray-700">Babak Penyisihan</p>
                                <p className="text-gray-700 italic">
                                    28 Januari 2023
                                </p>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex flex-col items-center mr-4">
                                <div>
                                    <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="w-px h-full bg-gray-600"></div>
                            </div>
                            <div className="pb-8 ">
                                <p className="mb-2 text-xl font-bold text-gray-700">Babak Perempat Final</p>
                                <p className="text-gray-700 italic">
                                    25 Februari 2023
                                </p>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex flex-col items-center mr-4">
                                <div>
                                    <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="w-px h-full bg-gray-600"></div>
                            </div>
                            <div className="pb-8 ">
                                <p className="mb-2 text-xl font-bold text-gray-700">Babak Semifinal dan Final</p>
                                <p className="text-gray-700 italic">
                                    26 Februari 2023
                                </p>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex flex-col items-center mr-4">
                                <div>
                                    <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-1">
                                <p className="mb-2 text-lg font-bold text-gray-700">Done</p>
                            </div>
                        </div>
                    </div>
                    <div className="md:w-5/12 px-4 justify-center hidden lg:block">
                        <div className="card bg-base-100 shadow-xl">
                            <figure className="p-2">
                                <img src={TimelineImg} alt="Shoes" className="rounded-xl w-full" />
                            </figure>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TimelineCrystalCompetition;