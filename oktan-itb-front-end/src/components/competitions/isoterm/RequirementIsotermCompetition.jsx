import React from 'react';
import RequirementImg from '../../../assets/img/requirement.jpg';
import { FaUserGraduate, FaUsers, FaUserTie, FaSchool, FaPaperclip } from 'react-icons/fa';

const RequirementIsotermCompetition = () => {
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
                    <p>Berikut merupakan persyaratan untuk mengikuti lomba Isoterm.
                    </p>
                    <div className="flex mt-4">
                        <ul className="bg-white rounded-lg border border-gray-200 w-full text-gray-900">
                            <li className="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg">
                                <div className="flex items-center gap-2">
                                    <div className="flex-none">
                                        <FaUserGraduate />
                                    </div>
                                    <div className="flex-1">
                                        Mahasiswa aktif seluruh Indonesia pada jenjang Vokasi
                                        atau Strata-1 pada saat kompetisi berlangsung dari semua jurusan/program
                                        studi/departemen kecuali program studi Kimia ITB
                                    </div>
                                </div>
                            </li>
                            <li className="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg">
                                <div className="flex items-center gap-2">
                                    <div className="flex-none">
                                        <FaUsers className='text-lg' />
                                    </div>
                                    <div className="flex-1">
                                        Setiap tim terdiri atas 2-3 peserta dengan satu peserta sebagai ketua tim.
                                        Setiap peserta boleh terdaftar pada maksimal 2 tim, tetapi hanya boleh
                                        menjadi ketua tim pada salah satu tim
                                    </div>
                                </div>
                            </li>
                            <li className="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg">
                                <div className="flex items-center gap-2">
                                    <div className="flex-none">
                                        <FaSchool className='text-lg' />
                                    </div>
                                    <div className="flex-1">
                                        Anggota tim berasal dari perguruan tinggi yang sama dan dibolehkan berasal
                                        dari jurusan yang berbeda
                                    </div>
                                </div>
                            </li>
                            <li className="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg">
                                <div className="flex items-center gap-2">
                                    <div className="flex-none">
                                        <FaPaperclip />
                                    </div>
                                    <div className="flex-1">
                                        Satu tim dapat mengirimkan lebih dari 1 buah karya dengan batasan 2 karya
                                    </div>
                                </div>
                            </li>
                            <li className="px-6 py-2 border-gray-200 w-full rounded-b-lg">
                                <div className="flex items-center gap-2">
                                    <div className="flex-none">
                                        <FaUserTie />
                                    </div>
                                    <div className="flex-1">
                                        Setiap tim harus memiliki dosen pembimbing yang dibuktikan melalui
                                        dokumen keterangan dosen pembimbing
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

export default RequirementIsotermCompetition;