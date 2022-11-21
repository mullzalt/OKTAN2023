import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../../../components/loadings/Spinner'
import Pagination from '../../../components/Pagination'
import { StatusBadge } from '../../../components/submissons/SubmissionsItems'
import TableContainer, { EmptyMessage, FilterRadio, ItemCounters, SearchBar } from '../../../components/tables/TableContainer'
import { useGetPapersQuery } from '../../../features/competitions/submissionSlice'


const statusOptions = [
    { title: 'NOT REVIEWED', type: 'secondary', value: 'SENT' },
    { title: 'REUPLOAD', type: '', value: 'PENDING' },
    { title: 'REVIEWED', type: 'info', value: 'REVIEWED' },
]


const PaperLists = () => {


    const [queryParams, setQueryParams] = useState({
        where: '',
        status: 'SENT',
        page: 1,
        size: 10
    })
    const {
        data,
        isLoading,
        isError } = useGetPapersQuery({ ...queryParams })

    return (
        <div>
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
                                    headers={['Judul', 'Tema', 'Tim', 'Nama User', 'Kompetisi', 'status', 'helper']}
                                    rows={data.rows.map((pap, index) => {
                                        return {
                                            id: pap.id,
                                            items: [
                                                pap.title,
                                                pap.theme,
                                                pap.participant.team_name,
                                                pap.participant.member.name,
                                                <span>{pap.participant.competition.category} - {pap.participant.competition.title}</span>,
                                                <StatusBadge status={pap.status} />,
                                                <Link className='link link-info'
                                                    to={pap.participant.competition.id + '/members/' + pap.participant.member.id}>
                                                    Detail
                                                </Link>,
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

        </div>
    )
}

export default PaperLists