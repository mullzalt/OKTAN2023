import React from 'react';
import CompetitionImg from '../../assets/img/competition.jpg';

const FormCompetitionDetail = () => {
    return (
        <div>
            <h1 className='text-2xl font-semibold text-center lg:text-left'>Competition Detail</h1>
            <div className="flex flex-wrap">
                <div className='pt-5 lg:w-2/4 px-4'>
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <div className='card-title'>Isoterm</div>
                            <div className="grid grid-cols-6">
                                <div className='col-span-2'>Waktu Mulai</div>
                                <div className='col-span-4'>Tes</div>
                            </div>
                            <div className="grid grid-cols-6">
                                <div className='col-span-2'>Waktu Mulai</div>
                                <div className='col-span-4'>Tes</div>
                            </div>
                            <div className="grid grid-cols-6">
                                <div className='col-span-2'>Waktu Mulai</div>
                                <div className='col-span-4'>Tes</div>
                            </div>
                            <p></p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Daftar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='pt-5 lg:w-1/4 px-4 hidden lg:block'>
                    <div className="card bg-base-100 shadow-xl">
                        <figure className="p-2">
                            <img src={CompetitionImg} alt="Crystal Competition ITB" className="rounded-xl w-full" />
                        </figure>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormCompetitionDetail;