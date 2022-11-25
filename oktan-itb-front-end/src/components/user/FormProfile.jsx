import React from 'react';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../services/auth/authSlice';

const FormProfile = () => {

    const user = useSelector(selectCurrentUser)
    const profile = user.profile

    return (
        <div>
            <h1 className='text-2xl font-semibold text-center lg:text-left'>Profile Anda</h1>
            <div className='pt-5 lg:w-1/2'>
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <label className='font-semibold text-primary text-sm'>Akun</label>
                        <hr />
                        <div className="grid lg:grid-cols-6 lg:gap-4 form-control">
                            <label className="label col-span-2">
                                <span className="label-text">Username</span>
                            </label>
                            <input type="text" placeholder={user.username} className="input input-sm input-bordered col-span-4" readOnly />
                        </div>
                        <div className="grid lg:grid-cols-6 lg:gap-4 form-control">
                            <label className="label col-span-2">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder={user.email} className="input input-sm input-bordered col-span-4" readOnly />
                        </div>
                        {/* <div className="grid lg:grid-cols-6 lg:gap-4 form-control items-center">
                            <label className="label col-span-2">
                                <span className="label-text">Password</span>
                            </label>
                            <a href="" className='link link-hover col-span-4 text-sm'><HiOutlinePencilAlt className='inline-block mr-2 text-lg' />Change password</a>
                        </div> */}
                        <label className='font-semibold text-primary text-sm mt-2'>Profil</label>
                        <hr />
                        <div className="grid lg:grid-cols-6 lg:gap-4 form-control">
                            <label className="label col-span-2">
                                <span className="label-text">Nama Lengkap</span>
                            </label>
                            <input type="text" placeholder={profile.name} className="input input-sm input-bordered col-span-4" readOnly />
                        </div>
                        <div className="grid lg:grid-cols-6 lg:gap-4 form-control">
                            <label className="label col-span-2">
                                <span className="label-text">Asal Sekolah/Institut</span>
                            </label>
                            <input type="text" placeholder={profile.institute} className="input input-sm input-bordered col-span-4" readOnly />
                        </div>
                        <div className="grid lg:grid-cols-6 lg:gap-4 form-control">
                            <label className="label col-span-2">
                                <span className="label-text">No Telp/Hp</span>
                            </label>
                            <input type="text" placeholder={profile.phone} className="input input-sm input-bordered col-span-4" readOnly />
                        </div>
                        {/* <div className="card-actions justify-end">
                            <button className="btn btn-primary btn-disabled">Fitur Belum Ditambahkan</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormProfile;