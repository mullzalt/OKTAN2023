import React from 'react'
import { BiPlusMedical, BiTrash } from 'react-icons/bi'

const FormEnrollItem = () => {
    return (
        <>
            <div className="grid lg:grid-cols-12 lg:gap-3">
                <div className='lg:col-span-8 order-last lg:order-none'>
                    <div className="form-control py-2">
                        <div className="md:grid md:grid-cols-12">
                            <label className="label md:col-span-2">Nama Tim</label>
                            <input type="text" placeholder="Nama Tim" className="input input-bordered md:col-span-10 w-full" />
                        </div>
                    </div>
                    <div className="form-control py-2">
                        <div className="md:grid md:grid-cols-12">
                            <label className="label md:col-span-2">Ketua</label>
                            <input type="text" placeholder="Ketua" className="input input-bordered md:col-span-10 w-full" readOnly />
                        </div>
                    </div>
                    <div className="relative flex py-5 items-center">
                        <div className="flex-grow border-t border-gray-400"></div>
                        <span className="flex-shrink mx-4 text-gray-400">Anggota Tim</span>
                        <div className="flex-grow border-t border-gray-400"></div>
                        <button
                            type='button'
                            className="btn btn-success btn-square flex-shrink mx-4">
                            <BiPlusMedical className='text-xl text-white' />
                        </button>
                    </div>
                    <div className="form-control py-2">
                        <div className="grid gap-2 grid-cols-8 md:grid md:grid-cols-12 md:gap-2">
                            <label className="label col-span-2 md:col-span-2">Anggota 1</label>
                            <div className="col-span-5 md:col-span-9">
                                <input type="text" placeholder="Nama Anggota" className="input input-bordered w-full" />
                            </div>
                            <button
                                type='button'
                                className='btn btn-error md:col-span-1'>
                                <BiTrash className='text-xl text-white' />
                            </button>
                        </div>
                    </div>
                    <div className="form-control py-2">
                        <div className="md:grid md:grid-cols-12">
                            <label className="label md:col-span-2">Upload File</label>
                            <input type="file" class="file-input md:col-span-10 w-full" />
                        </div>
                    </div>
                    <div className="form-control py-2 mt-6">
                        <div className="grid grid-cols-12 gap-4">
                            <button className='btn btn-info text-white col-span-4'>Save</button>
                            <button className='btn btn-error text-white col-span-4'>Cancel</button>
                            <input type="submit" class="btn btn-primary px-10 col-span-4" value={'Kirim'} />
                        </div>
                    </div>
                </div>
                <div className='lg:col-span-4'>
                    Ketentuan
                    <div className="form-control py-2">
                        <textarea className="textarea" placeholder="Ketentuan"></textarea>
                    </div>
                    <div className="form-control py-2">
                        <textarea className="textarea" placeholder="Pesan dari panitia"></textarea>
                    </div>
                    <div className="form-control ">
                        <div className="btn-group flex justify-center gap-2" key={'status'}>
                            <input
                                type="radio"
                                name="status"
                                data-title="APPROVE"
                                value='PAIDOFF'
                                className="btn btn-lg btn-outline btn-success col-span-1" />

                            <input
                                type="radio"
                                name="status"
                                data-title="TOLAK"
                                value='REJECTED'
                                className="btn btn-lg btn-outline btn-error col-span-1" />
                        </div>

                        <div className="form-control py-2 mt-6">
                            <div className="grid grid-cols-4 gap-4">
                                <input type="submit" class="btn btn-primary px-10 col-span-4" value={'Kirim'} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FormEnrollItem