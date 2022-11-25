import React from 'react'
import { useState } from 'react'
import { BsFillPencilFill, BsTrashFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useGetPaymentLogQuery } from '../../services/invoiceService'
import Pagination from '../Pagination'
import Spinner from '../Spinner'

const formatDate = (date) => {
    var myDate = new Date(date);
    return (myDate.getDate() + '/' + (myDate.getMonth() + 1) + '/' + myDate.getFullYear());
}


const currencyFormatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',

    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const buttonArray = (totalPage, eachSide, currPage) => {

}

const statusBadge = (status) => {
    if (status === 'PENDING') return (<div className='badge p-3 badge-warning text-white'>Menunggu Acc</div>)
    if (status === 'PAIDOFF') return (<div className='badge p-3 badge-success text-white '>LUNAS</div>)
    if (status === 'REJECTED') return (<div className='badge p-3 badge-error text-white'>DITOLAK</div>)
    if (status === 'UNPAID') return (<div className='badge p-3 badge-secondary text-white'>Belum Bayar</div>)

    return (<div className='badge p-3'>Terjadi kesalahan...</div>)
}

const PaymentModItem = () => {
    const [queryParams, setQueryParams] = useState({
        where: '',
        status: 'PENDING',
        page: 1,
        size: 10
    })

    const { data, isLoading, isFetching, isError, error } = useGetPaymentLogQuery(queryParams)


    const payments = data?.payments ? data?.payments : null

    const onChange = (e) => {
        e.preventDefault()
        setQueryParams((previusValue) => ({
            ...previusValue,
            where: e.target.value
        }))

    }

    const onStatusChange = (e) => {
        setQueryParams((previusValue) => ({
            ...previusValue,
            status: e.target.value
        }))
    }

    const pageSizeChange = (e) => {
        e.preventDefault()
        const size = e.target.value > 1 ? e.target.value : 1
        setQueryParams((previusValue) => ({
            ...previusValue,
            size: size
        }))

    }


    if (isError) {
        return <div>{error}</div>
    }


    if (isLoading) {
        return <Spinner />
    }

    const paymentsTable = payments ? payments.map((payment, index) => (
        <tr>
            <th>{index + 1}</th>
            <td>{payment.member.name}</td>
            <td>{payment.competition.category} - {payment.competition.title}</td>
            <td>{formatDate(payment.updatedAt)}</td>
            <td>
                {statusBadge(payment.status)}
            </td>
            <td>
                <div className="flex gap-2">
                    {payment.status === "UNPAID" ? null : (<Link to={`/moderator/payments/${payment.id}`} className='btn btn-info btn-sm text-white'>Review</Link>)}
                </div>
            </td>
        </tr>
    )) : null

    return (
        <div>
            <h1 className='text-2xl font-semibold text-center lg:text-left'>Riwayat Pembayaran</h1>
            <div className="flex flex-col lg:flex-row items-center lg:justify-between my-5">
                <div className="form-control">
                    <div className="btn-group gap-2" key={'status'}>
                        <input
                            type="radio"
                            name="status"
                            data-title="MENUNGGU ACC"
                            value='PENDING'
                            onChange={onStatusChange}
                            checked={queryParams.status === 'PENDING'}
                            className="btn btn-outline btn-warning btn-xs" />

                        <input
                            type="radio"
                            name="status"
                            data-title="SUDAH BAYAR"
                            value='PAIDOFF'
                            onChange={onStatusChange}
                            checked={queryParams.status === 'PAIDOFF'}
                            className="btn  btn-xs btn-outline btn-success" />

                        <input type="radio"
                            name="status"
                            data-title="BELUM BAYAR"
                            value='UNPAID'
                            onChange={onStatusChange}
                            checked={queryParams.status === 'UNPAID'}
                            className="btn btn-xs btn-outline btn-secondary" />

                        <input
                            type="radio"
                            name="status"
                            data-title="DITOLAK"
                            value='REJECTED'
                            onChange={onStatusChange}
                            checked={queryParams.status === 'REJECTED'}
                            className="btn btn-xs btn-outline btn-error" />
                    </div>
                </div>
                <div className='mt-4 lg:mt-0'>
                    <div className="form-control">
                        <div className="input-group gap-2">
                            <div className="flex items-center mr-4">
                                Menampilkan
                                <input
                                    onChange={pageSizeChange}
                                    isLoading={isFetching} type="number" placeholder="10" value={queryParams.size} className="input input-sm input-bordered w-14" />
                                dari {data.totalItem} data
                            </div>

                            <div className="form-control">
                                <div className="input-group">
                                    <input name='whereQuery' type="text" placeholder="Search…" className="input input-bordered" onChange={onChange} isLoading={isFetching} />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>




            <div className='pt-5'>
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body p-0">
                        <div className="overflow-x-auto">
                            <table className="table table-compact w-full">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Nama Peserta</th>
                                        <th>Kompetisi</th>
                                        <th>Tgl Bayar</th>
                                        <th>Status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paymentsTable}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">



                <Pagination
                    currentPage={queryParams.page}
                    totalCount={data.totalItem}
                    pageSize={queryParams.size}
                    onPageChange={page => setQueryParams((previusValue) => ({ ...previusValue, page: page }))} />

            </div>
        </div>
    )
}

export default PaymentModItem