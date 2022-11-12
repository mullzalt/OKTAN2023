import React from 'react';
import { useParams } from 'react-router-dom';
import PaymentDetailItem from '../../components/member/PaymentDetailItem';
import Spinner from '../../components/Spinner';
import { useGetInvoiceQuery } from '../../services/invoiceService';
import Layout from '../user/Layout';


const PaymentDetail = () => {

    const { id } = useParams()
    const { data, error, isLoading, isSuccess } = useGetInvoiceQuery(id)

    if (isLoading) {
        return <Spinner />
    }


    return (
        <Layout>
            <PaymentDetailItem invoice={data} />
        </Layout>
    )
}

export default PaymentDetail;