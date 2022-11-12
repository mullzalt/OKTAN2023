import React from 'react';
import { AiOutlineForm } from 'react-icons/ai';
import { FaUser, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CompetitionImg from '../../assets/img/competition.jpg';
import CrystalLogoImg from '../../assets/img/logo-crystal.png';
import IsotermLogoImg from '../../assets/img/logo-isoterm.png';


function CompetitionItem({ competition }) {

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        var myDate = new Date(date);
        // return (myDate.getDate() + '/' + (myDate.getMonth() + 1) + '/' + myDate.getFullYear());
        return myDate.toLocaleDateString('id-ID', options)
    }

    const isRegisterClosed = (Due) => {
        const due = new Date(Due)
        const now = new Date(Date.now())

        if ((due - now) < 0) return true

        return false
    }

    competition = competition ? competition : null
    return (
        <div className="my-4 px-1 w-full sm:w-1/2 lg:w-1/3 lg:px-4">
            <Link to={`/competition/${competition.id}`} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className='card-actions justify-center'>

                        <div className="card-title">
                            {competition ? (`${competition.category}`) : ("Title")}
                        </div>

                    </div>
                    <figure><img src={
                        (competition.category === 'ISOTERM') ? IsotermLogoImg :
                            (competition.category === 'CRYSTAL') ? CrystalLogoImg :
                                CompetitionImg} alt="Shoes" className='w-full' />
                    </figure>

                    <div className="text-md">
                        <b>{competition ? (`${competition.title}`) : ("Title")}</b>
                    </div>
                    <hr />
                    <div className='mt-2'>
                        <div>
                            <span className='badge p-3'>
                                <FaUsers className='text-bold  mr-2 inline-block' />
                                <b>{competition.min_participant} - {competition.max_participant} orang</b>
                            </span>
                        </div>
                    </div>
                    <div className='mt-2'>
                        <div>
                            <span className=''>
                                <AiOutlineForm className='text-bold  mr-2 inline-block' />
                                PENDAFTARAN
                            </span>
                            {isRegisterClosed(competition.register_due) ?
                                (<div className='mt-2 text-sm badge badge-error p-3'>
                                    PENDAFTARAN SUDAH DITUTUP
                                </div>) :
                                (<div className='mt-2 text-sm'>
                                    {formatDate(competition.register_start)} <b>s/d</b> {formatDate(competition.register_due)}
                                </div>)
                            }
                        </div>
                    </div>


                </div>
            </Link>
        </div>
    )
}

export default CompetitionItem