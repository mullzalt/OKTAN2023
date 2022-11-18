import React from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Spinner from '../../../components/loadings/Spinner'
import Pagination from '../../../components/Pagination'

import TableContainer, { EmptyMessage, ItemCounters, SearchBar } from '../../../components/tables/TableContainer'
import { useGetCompetitionByIdQuery } from '../../../features'
import { useGetParticipantsQuery } from '../../../features/competitions/participantSlice'


const ParticipantList = () => {
    const { id } = useParams()
    const [queryParams, setQueryParams] = useState({
        where: '',
        status: '',
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

            {
                isLoading
                    ? <Spinner message={'Mengambil data peserta'} />
                    : isError
                        ? <>Something went wrong</>
                        : data.rows.length === 0 ? <EmptyMessage />
                            :
                            <div className='mt-9'>
                                <TableContainer
                                    headers={['Nama Team', 'Asal', 'Ketua', 'pembina', 'file', '']}
                                    rows={data.rows.map((par, index) => {
                                        return {
                                            id: par.id,
                                            items: [
                                                par.team_name,
                                                par.member.institute, par.member.name,
                                                par.mentor_name || <i className='text-gray-400 select-none'>kosong</i>,
                                                <a className='btn btn-s btn-info text-white link-hover' href={par.file_url} target={'_blank'} >Download</a>,
                                                <Link className='btn btn-xs btn-ghost'>Review →</Link>,
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