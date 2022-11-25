import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CompetitionImg from '../../assets/img/competition.jpg';



const Welcome = () => {
    return (
        <div>
            <h1 className='text-2xl font-semibold text-center lg:text-left'>Available Competition</h1>
            <div className="pt-5 flex flex-wrap">
                <div className="my-4 px-1 w-full sm:w-1/2 lg:w-1/3 lg:px-4">
                    <Link to={"/competition/1"} className="card bg-base-100 shadow-xl">
                        <figure><img src={CompetitionImg} alt="Shoes" className='w-full' /></figure>
                        <div className="card-body">
                            <h2 className="card-title">
                                Isoterm
                            </h2>
                            <p>Lorem ipsum dolor sit amet.</p>
                            <div className="badge p-3 badge-warning my-1">Dimulai tanggal 23 Januari 2023</div>
                            <div className="badge p-3 badge-error my-1">Belum Bayar</div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Welcome;