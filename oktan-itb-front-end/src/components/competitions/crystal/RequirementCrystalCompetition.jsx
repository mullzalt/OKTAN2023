import React from 'react';
import RequirementImg from '../../../assets/img/requirement.jpg';
import { FaUser, FaUsers, FaMedal, FaSignature } from 'react-icons/fa';

const RequirementCrystalCompetition = () => {
    return (
        <section className="pb-20 pt-10 px-10 bg-base-100 lg:px-40">
            <div className="flex items-center">
                <div className='hidden lg:block lg:w-1/2 flex justify-center'>
                    <div className="card w-3/4 bg-base-100 shadow-xl">
                        <figure className="p-2">
                            <img src={RequirementImg} alt="Shoes" className="rounded-xl w-full" />
                        </figure>
                    </div>
                </div>
                <div className='w-full lg:w-1/2'>
                    <h1 className='text-3xl font-bold'>Requirements</h1>
                    <div className="flex">
                        <span className="p-0.5 rounded w-24 bg-primary my-5"></span>
                    </div>
                    <p>Berikut merupakan persyaratan untuk mengikuti lomba Crystal.
                    </p>
                    <div className="flex mt-4">
                        <ul className="bg-white rounded-lg border border-gray-200 w-full text-gray-900">
                            <li className="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg">
                                <div className="flex items-center gap-2">
                                    <div className="flex-none">
                                        <FaUser />
                                    </div>
                                    <div className="flex-1">
                                        SMA/K sederajat yang berstatus aktif dan memiliki kartu pelajar
                                    </div>
                                </div>
                            </li>
                            <li className="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg">
                                <div className="flex items-center gap-2">
                                    <div className="flex-none">
                                        <FaUsers className='text-lg' />
                                    </div>
                                    <div className="flex-1">
                                        Satu tim terdiri dari 1 atau 2 orang dari sekolah yang sama
                                    </div>
                                </div>
                            </li>
                            <li className="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg">
                                <div className="flex items-center gap-2">
                                    <div className="flex-none">
                                        <FaMedal />
                                    </div>
                                    <div className="flex-1">
                                        Belum pernah mendapatkan medali (emas, perak, dan perunggu) dalam
                                        ajang kompetisi kimia nasional dan internasional, serta belum pernah menjadi juara pertama OKTAN ITB tahun sebelumnya
                                    </div>
                                </div>
                            </li>
                            <li className="px-6 py-2 border-gray-200 w-full rounded-b-lg">
                                <div className="flex items-center gap-2">
                                    <div className="flex-none">
                                        <FaSignature />
                                    </div>
                                    <div className="flex-1">
                                        Menandatangani surat pernyataan jujur atau tidak mencontek
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RequirementCrystalCompetition;