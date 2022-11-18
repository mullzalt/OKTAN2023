import React from 'react'
import { Link } from 'react-router-dom'
import { useGetCompetitionByIdQuery } from '../../../features'
import Pulse from '../../loadings/Pulse'

import CrystalLogoImg from '../../../assets/img/logo-crystal.png';
import IsotermLogoImg from '../../../assets/img/logo-isoterm.png';
import CompetitionCardItems from '../../competitions/CompetitionCard';
import { useFormatDate } from '../../hooks/useFormatDate';
import useCurrencyFormat from '../../hooks/useCurrencyFormat';

import { AiOutlineForm, AiOutlineClockCircle } from 'react-icons/ai';
import { FaUser, FaUsers } from 'react-icons/fa';



const Card = (competition) => {
  const registerStart = useFormatDate(competition.register_start)
  const registerEnd = useFormatDate(competition.register_due)
  const eventStart = useFormatDate(competition.start_date)
  const eventEnd = useFormatDate(competition.end_date)
  const price = useCurrencyFormat(competition.entry_fee)
  const fees = competition.payment_method === 'FREE'
    ? 'GRATIS'
    : price

  return (

    <div className="card card-side bg-base-100 shadow-xl">
      <div className="card-body grid grid-cols-6">
        <img className='hidden md:block col-span-1' src={
          competition.category === 'ISOTERM'
            ? IsotermLogoImg
            : competition.category === 'CRYSTAL'
              ? CrystalLogoImg : null
        } alt="Movie" />
        <div className='col-span-6 md:col-span-5'>
          <h2 className="card-title font-bold mb-3">{competition.title}</h2>
          <div className="grid grid-cols-12">
            <div className='col-span-12 md:col-span-3 font-bold text-lg'>
              Kategori
            </div>
            <div className='col-span-12 md:col-span-9'>
              {competition.category}
            </div>
          </div>
          <div className="grid grid-cols-12">
            <div className='col-span-12 md:col-span-3 font-bold text-lg'>
              Jumlah Pendaftar
            </div>
            <div className='col-span-12 md:col-span-9'>
              {competition?.member ? competition.member.length : 0} orang
            </div>
          </div>
          <div className="grid grid-cols-12">
            <div className='col-span-12 md:col-span-3 font-bold text-lg'>
              Pendaftaran
            </div>
            <div className='col-span-12 md:col-span-9'>
              {registerStart} - {registerEnd}
            </div>
          </div>
          <div className="grid grid-cols-12">
            <div className='col-span-12 md:col-span-3 font-bold text-lg'>
              Acara
            </div>
            <div className='col-span-12 md:col-span-9'>
              {eventStart} - {eventEnd}
            </div>
          </div>
          <div className="grid grid-cols-12">
            <div className='col-span-12 md:col-span-3 font-bold text-lg'>
              Harga
            </div>
            <div className='col-span-12 md:col-span-9'>
              {fees}
            </div>
          </div>
          <div className="card-actions justify-end">
            <Link to={competition.id + '/edit'} className="btn btn-info text-white">Detail</Link>
            <Link to={competition.id + '/members'} className="btn btn-primary">Daftar Peserta</Link>
          </div>
        </div>
      </div>
    </div>
  )
}



const ModeratorCompetitionItem = ({ id }) => {
  const { data, error, isLoading } = useGetCompetitionByIdQuery({ id: id })
  return (
    <React.Fragment>
      <div className='col-span-4'>
        {isLoading
          ? <Pulse />
          : error
            ? (<>Something went wrong</>)
            : Card(data)
        }
      </div>
    </React.Fragment>
  )
}

export default ModeratorCompetitionItem