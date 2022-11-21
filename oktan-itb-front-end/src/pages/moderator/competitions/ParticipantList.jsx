import React from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Spinner from '../../../components/loadings/Spinner'
import Pagination from '../../../components/Pagination'

import TableContainer, { EmptyMessage, FilterRadio, ItemCounters, SearchBar } from '../../../components/tables/TableContainer'
import { useGetCompetitionByIdQuery } from '../../../features'
import { useGetParticipantsQuery } from '../../../features/competitions/participantSlice'

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

const AdministrationBadge = ({ isAllowed }) => {
    const label = isAllowed ? 'OK' : 'BELUM BAYAR'

    const className = isAllowed ? 'badge badge-success p-2 text-sm text-white' : 'badge badge-warning p-4 text-sm'

    return (
        <div className={className}>{label}</div>
    )
}

const statusOptions = [
    { title: 'VERIFIED', type: 'success', value: 'ACTIVE' },
    { title: 'VERIFY', type: 'warning', value: 'ENROLLED' },
    { title: 'BELUM UPLOAD', type: '', value: 'PENDING' },
]


const ParticipantList = () => {
    const { id } = useParams()
    const [queryParams, setQueryParams] = useState({
        where: '',
        status: 'ENROLLED',
        paid: '',
        page: 1,
        size: 10
    })

    const { data: competition, isLoading: compLoading } = useGetCompetitionByIdQuery({ id: id })

    const { data, isLoading, isError, isFetching } = useGetParticipantsQuery({ competitionId: id, params: queryParams }, { refetchOnFocus: true, refetchOnMountOrArgChange: true })

    if (compLoading) {
        return <Spinner />
    }

    return (
        <>
            <div className='m-4 mb-10'>
                <h1 className='font-bold text-2xl'>{competition?.title}</h1>
                <h1 className='text-l'>{competition?.category}</h1>
            </div>

            <SearchBar
                value={queryParams.where}
                onChange={search => {
                    search.preventDefault()
                    setQueryParams((prev) => ({
                        ...prev,
                        where: search.target.value,
                        page: 1
                    })
                    )
                }} />

            <FilterRadio
                onChange={e => setQueryParams(prev => ({
                    ...prev,
                    status: e.target.value
                }))}
                selected={queryParams.status}
                options={statusOptions}
                name={'status'}
            />

            {
                isLoading
                    ? <Spinner message={'Mengambil data peserta'} />
                    : isError
                        ? <>Something went wrong</>
                        : data.rows.length === 0 ? <EmptyMessage />
                            :
                            <div className='mt-9'>
                                <TableContainer
                                    headers={['Nama Team', 'Asal', 'Ketua', 'pembina', 'administrasi', 'status', 'file', '']}
                                    rows={data.rows.map((par, index) => {
                                        return {
                                            id: par.id,
                                            items: [
                                                par.team_name,
                                                par.member.institute, par.member.name,
                                                par.mentor_name || <i className='text-gray-400 select-none'>kosong</i>,
                                                <AdministrationBadge isAllowed={par.allowedToJoin} />,
                                                <StatusBadge status={par.status} />,
                                                <a className='btn btn-s btn-info text-white link-hover' href={par.file_url} target={'_blank'} >Download</a>,
                                                <Link to={par.member.id} className='btn btn-xs btn-ghost'>Review →</Link>,
                                            ]
                                        }
                                    })} />
                                <ItemCounters className='flex justify-center mt-2'
                                    totalItem={data.totalItem}
                                    pageSize={data.size}
                                    currentPage={data.currentPage}
                                />
                                <div className='flex justify-center'>

                                    <Pagination
                                        onPageChange={page =>
                                            setQueryParams((previusValue) =>
                                                ({ ...previusValue, page: page })
                                            )}
                                        totalCount={data.totalItem}
                                        currentPage={data.currentPage}
                                        pageSize={data.size}
                                    />

                                </div>
                            </div>
            }

        </>
    )
}

export default ParticipantList