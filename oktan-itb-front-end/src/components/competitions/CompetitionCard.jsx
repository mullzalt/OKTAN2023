import React from 'react'
import { Link } from 'react-router-dom';

import { AiOutlineForm, AiOutlineClockCircle } from 'react-icons/ai';
import { FaUser, FaUsers } from 'react-icons/fa';

import CrystalLogoImg from '../../assets/img/logo-crystal.png';
import IsotermLogoImg from '../../assets/img/logo-isoterm.png';
import { useFormatDate } from '../hooks/useFormatDate';
import useCurrencyFormat from '../hooks/useCurrencyFormat';
import { useCountDown } from '../hooks/countDown';
import { useState } from 'react';
import { useEffect } from 'react';
import { useGetCompetitionByIdQuery } from '../../features';
import Pulse from '../loadings/Pulse';
import { useSelector } from 'react-redux';
import { useGetPapersByParIdQuery } from '../../features/competitions/submissionSlice';
import { useGetParticipantByIdQuery } from '../../features/competitions/participantSlice';
import { selectCurrentProfile } from '../../features/auth/authSlice';
import Spinner from '../loadings/Spinner';



const Card = ({ competition, messages }) => {
    const registerStart = useFormatDate(competition.register_start)
    const registerEnd = useFormatDate(competition.register_due)
    const price = useCurrencyFormat(competition.entry_fee)
    const fees = competition.payment_method === 'FREE'
        ? 'GRATIS'
        : price

    const closeBadge = () => {
        return (
            <span className='badge badge-warning p-2 ml-4'>DITUTUP</span>
        )
    }

    const isRegisterOpen = () => {
        const rO = new Date(competition.register_start)
        const rC = new Date(competition.register_due)
        const dateNow = new Date()

        if (dateNow < rO || dateNow > rC) {
            return false
        }

        return true
    }

    const errorMessage = () => {
        let warnMsg = []

        messages.map(msg => {
            if (msg.type !== 'NEW' || msg.type !== 'ACCEPTED') {
                warnMsg.push({ message: msg.message })
            }
        })

        return warnMsg
    }

    return (
        <div className='my-4 w-full px-1 sm:w-1/2 lg:w-1/3 lg:px-4'>
            <Link to={`/competitions/${competition.id}`} className="card bg-base-100 shadow-xl">
                <figure><img className='object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg'
                    src={
                        (competition?.category === 'ISOTERM') ? IsotermLogoImg :
                            (competition?.category === 'CRYSTAL') ? CrystalLogoImg : CrystalLogoImg} />
                </figure>
                <div className="card-body">

                    <div >
                        <span className='mr-2 font-bold text-2xl'>{competition ? (`${competition.category}`) : ("Title")}</span>
                        <span className="text-l mr-2">{competition ? (`${competition.title}`) : ("Title ")}</span>

                        {errorMessage.length > 0
                            ? <span className="text-l text-white font-bold badge badge-error">
                                {errorMessage.length}
                            </span>
                            : null}


                    </div>
                    <hr />



                    <div className='mt-2 card-actions justify-between gap-3'>
                        <div className='text-center'>
                            <span className='font-bold text-lg'>Pendaftaran</span>

                        </div>
                        <div className='text-center'>
                            <AiOutlineClockCircle className='inline-block text-lg' />
                        </div>
                    </div>

                    <div className='grid grid-cols-3'>
                        <div className='font-semibold col-span-1'>Mulai</div>
                        <div className='text-sm col-span-1'>
                            {registerStart}
                        </div>
                    </div>

                    <div className='grid grid-cols-3'>
                        <div className='font-semibold col-span-1'>Ditutup</div>
                        <div className='text-sm col-span-1'>
                            {registerEnd}
                        </div>
                    </div>


                    <div className='mt-4 card-actions justify-center'>
                        <span className='badge p-3 badge-outline '>
                            <FaUsers className='text-semibold  mr-2 inline-block' />
                            <p>{competition.min_participant}-{competition.max_participant} orang</p>
                        </span>
                        <span className='badge badge-outline p-3'>
                            <FaUser className='  mr-2 inline-block' />
                            {competition.category === "ISOTERM"
                                ? 'D1-D4/S1'
                                : competition.category === "CRYSTAL"
                                    ? 'SMA/SMK' : 'BEBAS'}
                        </span>
                    </div>

                    <div className='justify-center card-actions mt-2'>
                        <hr className='w-full' />
                    </div>

                    <div className=' card-actions justify-end'>

                        <span className='ml-2 text-xl font-semibold text-orange-500'>
                            {!isRegisterOpen() ? closeBadge() : fees}
                        </span>
                    </div>

                </div>
            </Link>
        </div>
    )
}


const CompetitionCardItems = ({ id }) => {


    const profile = useSelector(selectCurrentProfile)

    const {
        data,
        isLoading,
        error,
    } = useGetParticipantByIdQuery({ competitionId: id, memberId: profile.id })

    if (error) {
        return <Spinner message={'Terjadi kesalahan silahkan muat ulang...'} />
    }

    if (isLoading) {
        return <Pulse />
    }


    return (
        <React.Fragment>
            <Card competition={data.competition} messages={data.messages} />
        </React.Fragment>
    )
}

export default CompetitionCardItems