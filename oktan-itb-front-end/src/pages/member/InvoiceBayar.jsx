import React from 'react';
import { useParams } from 'react-router-dom';
import InvoiceForm from '../../components/member/InvoiceForm';
import Spinner from '../../components/Spinner';
import { useGetBanksQuery } from '../../services/bankAccountService';
import { useGetInvoiceQuery } from '../../services/invoiceService';
import Layout from '../user/Layout';

const InvoiceBayar = () => {



    const { id } = useParams()
    const { data, error, isLoading, isSuccess } = useGetInvoiceQuery(id)
    const { data: bank, isLoading: bankLoading } = useGetBanksQuery('')

    if (isLoading || bankLoading) {
        return <Spinner />
    }
    return (
        <Layout>
            <InvoiceForm invoice={data} banks={bank} />
        </Layout>
    )
}

export default InvoiceBayar;