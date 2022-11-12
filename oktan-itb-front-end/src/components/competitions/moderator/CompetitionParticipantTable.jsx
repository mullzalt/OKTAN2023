import React from 'react';
import { BiCategoryAlt, BiTime } from 'react-icons/bi';
import { FaMoneyBillWave, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CompetitionImg from '../../../assets/img/competition.jpg';

const CompetitionParticipantTable = () => {

    const formatDate = (date) => {
        var myDate = new Date(date);
        return (myDate.getDate() + '/' + (myDate.getMonth() + 1) + '/' + myDate.getFullYear());
    }

    return (
        <div>
            <div className="flex flex-wrap">
                <div className='pt-5 lg:w-3/4'>
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <div className='card-title text-2xl'>ISOTERM</div>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate officia laborum, aperiam asperiores modi cumque! Ab iure aliquid quos ducimus, libero odio harum fuga, iste itaque eaque excepturi repudiandae eos!</p>
                            <div className="grid grid-rows-2 md:grid-cols-6 md:grid-rows-none">
                                <div className='col-span-2'><BiCategoryAlt className='inline-block mr-2' />Sub Tema</div>
                                <div className='col-span-4 ml-6 md:ml-0 badge badge-outline'>Lorem ipsum dolor sit amet.</div>
                            </div>
                            <div className="grid grid-rows-2 md:grid-cols-6 md:grid-rows-none">
                                <div className='col-span-2'><BiTime className='inline-block mr-2' />Mulai</div>
                                <div className='col-span-4 ml-6 md:ml-0'>{formatDate('2022-12-12')}</div>
                            </div>
                            <div className="grid grid-rows-2 md:grid-cols-6 md:grid-rows-none">
                                <div className='col-span-2'><BiTime className='inline-block mr-2' />Selesai</div>
                                <div className='col-span-4 ml-6 md:ml-0'>{formatDate('2022-12-12')}</div>
                            </div>

                            <div className="grid grid-rows-2 md:grid-cols-6 md:grid-rows-none">
                                <div className='col-span-2'><BiTime className='inline-block mr-2' />Batas Pendaftaran</div>
                                <div className='col-span-4 ml-6 md:ml-0'>{formatDate('2022-12-12')}</div>
                            </div>

                            <div className="grid grid-rows-2 md:grid-cols-6 md:grid-rows-none">
                                <div className='col-span-2'><FaUsers className='inline-block mr-2' /> Jumlah Partisipan</div>
                                <div className='col-span-4 ml-6 md:ml-0'>1-3</div>
                            </div>
                            <div className="grid grid-rows-2 md:grid-cols-6 md:grid-rows-none">
                                <div className='col-span-2'><FaMoneyBillWave className='inline-block mr-2' /> Biaya Pendaftaran</div>
                                <div className='col-span-4 ml-6 md:ml-0'>FREE</div>
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



            <h1 className='text-2xl font-semibold text-center lg:text-left mt-16'>List Participant</h1>
            <div className="flex flex-col lg:flex-row items-center lg:justify-between">
                <h1 className='badge badge-outline font-semibold text-center lg:text-left'>Total Data : 1000000</h1>
                <div className='mt-4 lg:mt-0'>
                    <div className="flex gap-2">
                        <div className="form-control">
                            <div className="input-group">
                                <input type="text" placeholder="Search…" className="input input-md input-bordered" />
                                <button className="btn btn-md btn-primary btn-square">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                </button>
                            </div>
                        </div>
                        <div className="form-control">
                            <select className="select select-bordered">
                                <option disabled selected>Limit</option>
                                <option>10</option>
                                <option>50</option>
                                <option>100</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className='pt-5'>
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body p-0">
                        <div className="overflow-x-auto">
                            <table className="table table-compact w-full">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Nama Partisipan</th>
                                        <th>Nama Tim</th>
                                        <th>File</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>1</th>
                                        <td>Lorem ipsum dolor sit amet.</td>
                                        <td>Lorem ipsum dolor sit amet.</td>
                                        <td><button className='btn btn-primary btn-sm'>Download</button></td>
                                        <td>
                                            <Link to={"/moderator/competition/1/1"} className='btn btn-sm btn-info text-white'>Detail</Link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="btn-group mt-5">
                    <button className="btn btn-primary">«</button>
                    <button className="btn btn-primary">Page 22</button>
                    <button className="btn btn-primary">»</button>
                </div>
            </div>
        </div>
    )
}

export default CompetitionParticipantTable;