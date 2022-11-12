import React from 'react';
import InvoiceItem from '../../components/member/InvoiceItem';
import Spinner from '../../components/Spinner';
import { useGetMyInvoicesQuery } from '../../services/invoiceService';
import Layout from '../user/Layout';

const Invoice = () => {

    const { data, error, isLoading, isSuccess, isError } = useGetMyInvoicesQuery("UNPAID")

    let isEmpty
    let emptyMessage

    if (!data?.length) {
        isEmpty = true
        emptyMessage = (<div className="alert shadow-lg">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>Tidak ada tagihan</span>
            </div>
        </div>)
    }


    if (isLoading) {
        return <Spinner />
    }

    return (
        <Layout>
            {isEmpty ? emptyMessage
                : data ? <InvoiceItem invoices={data} />
                    : null}
        </Layout>
    )
}

export default Invoice;