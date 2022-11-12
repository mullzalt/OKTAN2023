import React from 'react'
import { useParams } from 'react-router-dom'
import PaymentDetailModItem from '../../components/moderator/PaymentDetailModItem'
import Spinner from '../../components/Spinner'
import { useGetInvoiceQuery } from '../../services/invoiceService'
import Layout from '../user/Layout'

const PaymentDetailMod = () => {
    const { id } = useParams()
    const { data, error, isLoading, isSuccess } = useGetInvoiceQuery(id)

    if (isLoading) {
        return <Spinner />
    }



    return (
        <Layout>
            <PaymentDetailModItem invoice={data} />
        </Layout>
    )
}

export default PaymentDetailMod