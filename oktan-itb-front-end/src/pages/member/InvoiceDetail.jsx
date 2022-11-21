import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InvoicesItem from '../../components/invoices/InvoicesItem';
import Spinner from '../../components/loadings/Spinner';
import { useGetInvoiceByIdQuery } from '../../features/competitions/invoiceSlice';



const InvoiceDetail = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { data, error, isLoading, isSuccess } = useGetInvoiceByIdQuery({ invoiceId: id })

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div>
            <div className='overflow-x-auto'>
                <InvoicesItem invoice={data}>
                    <button
                        className='btn btn-warning'
                        onClick={() => navigate(-1)}
                    >
                        Kembali
                    </button>
                </InvoicesItem>


            </div>
        </div>
    )
}

export default InvoiceDetail;