import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../config';
import downloadFile from '../../services/downloadServices';

const TeamProfileDetail = ({ myData, userData, fileUrl }) => {
    const { id } = useParams

    const teamMembers = myData.team_members


    const teamName = (index, value) => (
        <div className="lg:grid lg:grid-cols-6">
            <div className='lg:col-span-2 font-semibold'>Anggota {index + 1}</div>
            <div className='lg:col-span-4'>{value}</div>
        </div>
    )



    const onDownload = async (e) => {
        const path = fileUrl.url

        await downloadFile(path, fileUrl.name)
    }

    return (
        <div className='pt-5 w-full lg:w-1/2 px-4'>
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">

                    <label className='font-semibold text-primary text-sm'>Profil Tim</label>
                    <hr className='my-1' />
                    <div className="lg:grid lg:grid-cols-6">
                        <div className='lg:col-span-2 font-semibold'>Nama Tim</div>
                        <div className='lg:col-span-4'>{myData.team_name}</div>
                    </div>
                    <div className="lg:grid lg:grid-cols-6">
                        <div className='lg:col-span-2 font-semibold'>Ketua</div>
                        <div className='lg:col-span-4'>{userData.profile.name}</div>
                    </div>

                    {teamMembers.map((v, i) => {
                        return (teamName(i, v.name))
                    })}


                    <div className="card-actions justify-center mt-5">
                        <button onClick={onDownload} className="btn btn-primary">Download Kartu Anda</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeamProfileDetail;