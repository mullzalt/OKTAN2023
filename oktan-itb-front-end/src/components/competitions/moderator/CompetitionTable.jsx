import React from 'react';
import { Link } from 'react-router-dom';

const CompetitionTable = () => {
    return (
        <div>
            <h1 className='text-2xl font-semibold text-center lg:text-left'>List Competition</h1>
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
                                        <th>Nama Kompetisi</th>
                                        <th>Kategori</th>
                                        <th>Judul</th>
                                        <th>Batas Pendaftaran</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>1</th>
                                        <td>Lorem ipsum dolor sit amet.</td>
                                        <td>Lorem ipsum dolor sit amet.</td>
                                        <td>Lorem ipsum dolor sit amet.</td>
                                        <td>Lorem ipsum dolor sit amet.</td>
                                        <td>
                                            <Link to={"/moderator/competition/1"} className='btn btn-sm btn-info text-white'>Detail</Link> 
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

export default CompetitionTable;