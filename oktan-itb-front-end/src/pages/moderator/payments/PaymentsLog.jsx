import React from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import Spinner from '../../../components/loadings/Spinner'
import Pagination from '../../../components/Pagination'
import TableContainer, { EmptyMessage, FilterRadio, ItemCounters, SearchBar } from '../../../components/tables/TableContainer'
import { useGetInvoicesLogQuery } from '../../../features/competitions/invoiceSlice'


const statusOptions = [
    { title: 'LUNAS', type: 'success', value: 'PAIDOFF' },
    { title: 'PENDING', type: 'warning', value: 'PENDING' },
    { title: 'DITOLAK', type: 'error', value: 'REJECTED' },
    { title: 'BELUM BAYAR', type: '', value: 'UNPAID' },
    { title: 'ALL', type: 'info', value: '' },
]


const AdministrationBadge = ({ status }) => {
    const label = {
        PAIDOFF: 'LUNAS',
        PENDING: 'PENDING',
        REJECTED: 'DITOLAK',
        UNPAID: 'BELUM BAYAR',
    }

    const className = {
        PAIDOFF: 'badge badge-success p-4 text-white',
        PENDING: 'badge badge-warning p-4',
        REJECTED: 'badge badge-error p-4 text-white',
        UNPAID: 'badge p-4 text-white',
    }
    return (
        <div className={className[status]}>{label[status]}</div>
    )
}



const PaymentsLog = () => {
    const [queryParams, setQueryParams] = useState({
        where: '',
        status: 'PENDING',
        page: 1,
        size: 10
    })




    const {
        data,
        isLoading,
        isError,
        isFetching }
        = useGetInvoicesLogQuery({ ...queryParams }, { refetchOnFocus: true, refetchOnMountOrArgChange: true })


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
                    ? <Spinner message={'Mengambil data pembayaran'} />
                    : isError
                        ? <>Something went wrong</>
                        : data.rows.length === 0 ? <EmptyMessage />
                            :
                            <div className='mt-9'>
                                <TableContainer
                                    headers={['Nama Akun', 'No hp', 'Kompetisi', 'Status', 'Invoice']}
                                    rows={data.rows.map((inv, index) => {
                                        return {
                                            id: inv.id,
                                            items: [
                                                inv.member.name,
                                                inv.member.phone,
                                                <Link className='link link-hover' to={'/moderator/competitions/' + inv.competition.id + '/members'}>
                                                    {inv.competition.category} - {inv.competition.title}
                                                </Link>,
                                                <AdministrationBadge status={inv.status} />,
                                                <Link className='btn btn-info text-white' to={inv.id}>
                                                    REVIEW
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

export default PaymentsLog