import React from 'react';
import downloadFile from '../../../services/downloadServices';


const competitionParticipantIdentitiy = ({ paper }) => {
    return (
        <div className='pt-5 w-full lg:w-1/2 px-4'>
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">

                    <label className='font-semibold text-primary text-sm'>Profil Tim</label>
                    <hr className='my-1' />
                    <div className="lg:grid lg:grid-cols-6">
                        <div className='lg:col-span-2 font-semibold'>Nama Tim</div>
                        <div className='lg:col-span-4'>Lorem ipsum dolor sit amet.</div>
                    </div>
                    <div className="lg:grid lg:grid-cols-6">
                        <div className='lg:col-span-2 font-semibold'>Ketua</div>
                        <div className='lg:col-span-4'>Lorem ipsum dolor sit amet.</div>
                    </div>
                    <div className="lg:grid lg:grid-cols-6">
                        <div className='lg:col-span-2 font-semibold'>Anggota 1</div>
                        <div className='lg:col-span-4'>Lorem ipsum dolor sit amet.</div>
                    </div>

                    <div className="card-actions justify-center mt-5">
                        <button className="btn btn-primary">Download Kartu</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


const CompetitionParticipantSubmission = ({ paper }) => {

    const onDownload = async (e) => {
        e.preventDefault()
        const path = paper?.file_url

        if (!path) return

        await downloadFile(path, paper.submission.attachment)
    }

    return (
        <div className='pt-5 w-full lg:w-1/2 px-4'>

            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <label className='font-semibold text-primary text-sm'>Detail Abstrak</label>
                    <hr className='my-1' />

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Judul Abstrak</span>
                        </label>
                        <input
                            name='title'
                            type="text"
                            value={paper.submission.title}
                            className="input input-bordered" readOnly />
                    </div>


                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Sub Tema</span>
                        </label>
                        <input
                            name='sub_tema'
                            type="text"
                            value={paper.submission.theme}
                            className="input input-bordered" readOnly />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Nama Dosen/Pembimbing</span>
                        </label>
                        <input
                            name='mentor'
                            type="text"
                            value={paper.submission.mentor}
                            className="input input-bordered" readOnly />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Nomor Induk Dosen/Pembimbing</span>
                        </label>
                        <input
                            name='mentor_id_number'
                            type="text"
                            value={paper.submission.mentor_id_number}
                            className="input input-bordered" readOnly />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Nama File Sesuai Format</span>
                        </label>
                        <input
                            name='mentor_id_number'
                            type="text"
                            value={paper.submission.attachment}
                            className="input input-bordered" readOnly />
                    </div>
                    <div className="card-actions justify-center mt-5">
                        <button onClick={onDownload} className="btn btn-primary">Download Abstrak</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export {
    competitionParticipantIdentitiy,
    CompetitionParticipantSubmission
} 