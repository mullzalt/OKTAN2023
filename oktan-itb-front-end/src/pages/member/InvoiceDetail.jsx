import React from 'react';
import { useParams } from 'react-router-dom';
import InvoiceDetailItem from '../../components/member/InvoiceDetailItem';
import Spinner from '../../components/Spinner';
import { useGetInvoiceQuery } from '../../services/invoiceService';
import Layout from '../user/Layout';

const InvoiceDetail = () => {

    const { id } = useParams()
    const { data, error, isLoading, isSuccess } = useGetInvoiceQuery(id)

    if (isLoading) {
        return <Spinner />
    }

    return (
        <Layout>
            {data ? <InvoiceDetailItem invoice={data} /> : null}
        </Layout>
    )
}

export default InvoiceDetail;