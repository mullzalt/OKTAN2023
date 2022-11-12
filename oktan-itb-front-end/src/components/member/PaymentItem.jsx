import React from 'react';
import { Link } from 'react-router-dom';

const PaymentItem = ({ invoices }) => {

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

    const isExpired = (date, due) => {
        let compare = (date > due) ? true : false

        return compare
    }

    const statusBadge = (status) => {
        if (status === 'PENDING') return (<div className='badge p-3 badge-warning '>Sedang diprosess...</div>)
        if (status === 'PAIDOFF') return (<div className='badge p-3 badge-success text-white '>LUNAS</div>)
        if (status === 'REJECTED') return (<div className='badge p-3 badge-error text-white'>DITOLAK</div>)

        return (<div className='badge p-3'>Terjadi kesalahan...</div>)
    }

    const invoiceRow = invoices.map((invoice, index) => (
        <tr key={index}>
            <th>{index + 1}</th>
            <td>{formatDate(invoice.createdAt)}</td>
            <td>{invoice.competition.category} - {invoice.competition.title}</td>
            <td>{currencyFormatter.format(invoice.total_ammount)}</td>
            <td>{statusBadge(invoice.status)}</td>
            <td>
                <Link to={`/payments/me/${invoice.id}`} className='btn btn-info btn-sm text-white'>Detail</Link>
            </td>
        </tr>
    ))


    return (
        <div>
            <div className="flex flex-col lg:flex-row items-center lg:justify-between">
                <h1 className='text-2xl font-semibold text-center lg:text-left'>Riwayat Pembayaran</h1>

            </div>
            <div className='pt-5'>
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body p-0">
                        <div className="overflow-x-auto">
                            <table className="table table-compact w-full">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Tanggal</th>
                                        <th>Kompetisi</th>
                                        <th>Tagihan</th>
                                        <th>Status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoiceRow}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PaymentItem;