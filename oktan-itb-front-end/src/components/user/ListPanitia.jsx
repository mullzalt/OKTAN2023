import React from 'react';
import { BsFillPencilFill, BsTrashFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

const ListPanitia = () => {
    return (
        <div>
            <div className="flex flex-col lg:flex-row items-center lg:justify-between">
                <div className='flex flex-col lg:flex-row gap-3'>
                    <h1 className='text-2xl font-semibold text-center lg:text-left'>List Panitia</h1>
                    <Link to={"#"} className='btn btn-success btn-sm text-white text-xs'><FaPlus className='mr-2' />Tambah panitia</Link>
                </div>
                <div className='mt-4 lg:mt-0'>
                    <div className="form-control">
                        <div className="input-group">
                            <input type="text" placeholder="Search…" className="input input-md input-bordered" />
                            <button className="btn btn-md btn-primary btn-square">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </button>
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
                                        <th>Nama Panitia</th>
                                        <th>Jabatan</th>
                                        <th>No Hp</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>1</th>
                                        <td>John Doe</td>
                                        <td>Ketua</td>
                                        <td>0895 1234 1234</td>
                                        <td>
                                            <div className="flex gap-2">
                                                <Link to={"#"} className='btn btn-warning btn-sm'><BsFillPencilFill className='text-white' /></Link>
                                                <Link to={"#"} className='btn btn-error btn-sm'><BsTrashFill className='text-white' /></Link>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>2</th>
                                        <td>Jane Doe</td>
                                        <td>Wakil Ketua</td>
                                        <td>0895 1234 1234</td>
                                        <td>
                                            <div className="flex gap-2">
                                                <Link to={"#"} className='btn btn-warning btn-sm'><BsFillPencilFill className='text-white' /></Link>
                                                <Link to={"#"} className='btn btn-error btn-sm'><BsTrashFill className='text-white' /></Link>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>3</th>
                                        <td>Jane Doe</td>
                                        <td>Wakil Ketua</td>
                                        <td>0895 1234 1234</td>
                                        <td>
                                            <div className="flex gap-2">
                                                <Link to={"#"} className='btn btn-warning btn-sm'><BsFillPencilFill className='text-white' /></Link>
                                                <Link to={"#"} className='btn btn-error btn-sm'><BsTrashFill className='text-white' /></Link>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>4</th>
                                        <td>Jane Doe</td>
                                        <td>Wakil Ketua</td>
                                        <td>0895 1234 1234</td>
                                        <td>
                                            <div className="flex gap-2">
                                                <Link to={"#"} className='btn btn-warning btn-sm'><BsFillPencilFill className='text-white' /></Link>
                                                <Link to={"#"} className='btn btn-error btn-sm'><BsTrashFill className='text-white' /></Link>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>5</th>
                                        <td>Jane Doe</td>
                                        <td>Wakil Ketua</td>
                                        <td>0895 1234 1234</td>
                                        <td>
                                            <div className="flex gap-2">
                                                <Link to={"#"} className='btn btn-warning btn-sm'><BsFillPencilFill className='text-white' /></Link>
                                                <Link to={"#"} className='btn btn-error btn-sm'><BsTrashFill className='text-white' /></Link>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>6</th>
                                        <td>Jane Doe</td>
                                        <td>Wakil Ketua</td>
                                        <td>0895 1234 1234</td>
                                        <td>
                                            <div className="flex gap-2">
                                                <Link to={"#"} className='btn btn-warning btn-sm'><BsFillPencilFill className='text-white' /></Link>
                                                <Link to={"#"} className='btn btn-error btn-sm'><BsTrashFill className='text-white' /></Link>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>7</th>
                                        <td>Jane Doe</td>
                                        <td>Wakil Ketua</td>
                                        <td>0895 1234 1234</td>
                                        <td>
                                            <div className="flex gap-2">
                                                <Link to={"#"} className='btn btn-warning btn-sm'><BsFillPencilFill className='text-white' /></Link>
                                                <Link to={"#"} className='btn btn-error btn-sm'><BsTrashFill className='text-white' /></Link>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>8</th>
                                        <td>Jane Doe</td>
                                        <td>Wakil Ketua</td>
                                        <td>0895 1234 1234</td>
                                        <td>
                                            <div className="flex gap-2">
                                                <Link to={"#"} className='btn btn-warning btn-sm'><BsFillPencilFill className='text-white' /></Link>
                                                <Link to={"#"} className='btn btn-error btn-sm'><BsTrashFill className='text-white' /></Link>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>9</th>
                                        <td>Jane Doe</td>
                                        <td>Wakil Ketua</td>
                                        <td>0895 1234 1234</td>
                                        <td>
                                            <div className="flex gap-2">
                                                <Link to={"#"} className='btn btn-warning btn-sm'><BsFillPencilFill className='text-white' /></Link>
                                                <Link to={"#"} className='btn btn-error btn-sm'><BsTrashFill className='text-white' /></Link>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>10</th>
                                        <td>Jane Doe</td>
                                        <td>Wakil Ketua</td>
                                        <td>0895 1234 1234</td>
                                        <td>
                                            <div className="flex gap-2">
                                                <Link to={"#"} className='btn btn-warning btn-sm'><BsFillPencilFill className='text-white' /></Link>
                                                <Link to={"#"} className='btn btn-error btn-sm'><BsTrashFill className='text-white' /></Link>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <th></th>
                                    <th>Nama Panitia</th>
                                    <th>Jabatan</th>
                                    <th>No Hp</th>
                                    <th>Action</th>
                                </tfoot>
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

export default ListPanitia;