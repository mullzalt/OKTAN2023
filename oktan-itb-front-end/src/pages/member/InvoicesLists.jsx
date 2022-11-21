import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { InvoiceCard, InvoiceStatusBadge } from '../../components/invoices/InvoicesItem'
import Spinner from '../../components/loadings/Spinner'
import TableContainer, { EmptyMessage } from '../../components/tables/TableContainer'
import { selectCurrentProfile } from '../../features/auth/authSlice'
import { useGetMyInvoicesQuery } from '../../features/competitions/invoiceSlice'




const InvoicesLists = () => {

    const profile = useSelector(selectCurrentProfile)

    const { data, isLoading, isError, isFetching, refetch } = useGetMyInvoicesQuery({ memberId: profile.id })

    if (isLoading) {
        return <Spinner message={'memuat tagihan...'} />
    }

    return (
        <div>
            {
                data.length > 0 ?
                    data.map(inv => {
                        return (
                            <InvoiceCard key={inv.id} id={inv.id} header={<InvoiceStatusBadge status={inv.status} />} >
                                {inv.status === 'UNPAID' ?
                                    (<>
                                        <Link className='btn btn-info text-white' to={inv.id}>Invoice Tagihan</Link>
                                        <Link className='btn btn-success text-white' to={inv.id + '/pay'}>Bayar</Link>
                                    </>)
                                    :
                                    (<>
                                        <Link className='btn btn-info text-white' to={inv.id}>Invoice Pembayaran</Link>
                                        <Link className='btn btn-success text-white' to={inv.id + '/pay'}>Riwayat Bayar</Link>
                                    </>)
                                }

                            </InvoiceCard>)
                    })
                    : <EmptyMessage message={'Belum melakukan transaksi'} />
            }


        </div>
    )
}

export default InvoicesLists