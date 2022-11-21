import React from 'react'
import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Spinner from '../../../components/loadings/Spinner'
import { useGetMemberByIdQuery } from '../../../features/users/memberSlice'
import NotFound from '../../NotFound'


const StatusBadge = ({ status }) => {
    const badge = {
        status: '',
        className: 'badge'
    }

    if (status === 'ACTIVE') {
        badge.status = 'VERIFIED'
        badge.className = 'badge badge-success p-4 text-white'
    }
    if (status === 'ENROLLED') {
        badge.status = 'PLEASE REVIEW'
        badge.className = 'badge badge-warning p-4'
    }
    if (status === 'PENDING') {
        badge.status = 'REJECTED'
        badge.className = 'badge badge-error p-4 text-white'
    }


    return (
        <span className={badge.className}>{badge.status}</span>
    )
}


const MemberCard = ({ header, children, data }) => {
    return (
        <div className='card shadow-2xl'>
            <div className='card-title bg-info p-4 rounded text-white flex justify-between'>
                <span className='uppercase'>{data.user.username}</span>
                {header}
            </div>

            <div className="card-body py-4">
                <div className="grid grid-cols-12">
                    <span className=" col-span-6 font-bold">Akun</span>
                </div>
                <div className="grid grid-cols-12">
                    <span className=" col-span-6 md:col-span-3">{'Username'}</span>
                    <span className=" col-span-6 md:col-span-3 font-bold">{data.user.username}</span>
                </div>
                <div className="grid grid-cols-12">
                    <span className=" col-span-6 md:col-span-3">{'Email'}</span>
                    <span className=" col-span-6 md:col-span-3 font-bold">{data.user.email}</span>
                </div>
            </div>


            <div className="card-body py-4">
                <div className="grid grid-cols-12">
                    <span className=" col-span-6 font-bold">Profil</span>
                </div>
                <div className="grid grid-cols-12">
                    <span className=" col-span-6 md:col-span-3">{'Nama'}</span>
                    <span className=" col-span-6 md:col-span-3 font-bold">{data.name}</span>
                </div>
                <div className="grid grid-cols-12">
                    <span className=" col-span-6 md:col-span-3">{'Instansi'}</span>
                    <span className=" col-span-6 md:col-span-3 font-bold">{data.institute}</span>
                </div>
                <div className="grid grid-cols-12">
                    <span className=" col-span-6 md:col-span-3">{'No Hp'}</span>
                    <span className=" col-span-6 md:col-span-3 font-bold">{data.phone}</span>
                </div>
            </div>

            <div className="card-body py-4">
                <div className="grid grid-cols-12">
                    <span className=" col-span-6 font-bold">Kompetisi yang Diikuti</span>
                </div>
                {data.competition.map((comp, index) => {
                    return (
                        <div className="grid grid-cols-12">
                            <span className=" col-span-1 md:col-span-1">{index + 1}</span>
                            <Link to={'/moderator/competitions/' + comp.id + '/members'}
                                className="link link-hover col-span-11 md:col-span-4 font-semibold">
                                {comp.category} {comp.title}
                            </Link>
                            <span className=" col-span-6 md:col-span-3 font-bold">{comp.participant.team_name}</span>
                            <span className=" col-span-6 md:col-span-1 font-bold">{<StatusBadge status={comp.participant.status} />}</span>
                        </div>
                    )
                })}
            </div>



            <div className="card-actions justify-end p-4">
                {children}
            </div>

        </div>
    )
}



const MemberDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const {
        data,
        isLoading,
        isError,
        isFetching,
        error,
        refetch } = useGetMemberByIdQuery({ id: id })


    useEffect(() => {


    }, [error, isError])

    if (isLoading) {
        return <Spinner />
    }


    return (
        <div>
            {error?.status === 404 ?
                <NotFound />
                : <MemberCard data={data}>
                    <button className='btn btn-warning'
                        onClick={() => { navigate(-1) }}
                    >BACK</button>
                </MemberCard>
            }



        </div>
    )
}

export default MemberDetail