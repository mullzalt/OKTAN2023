import React from 'react';
import { useLocation } from 'react-router-dom';
import PaymentItem from '../../components/member/PaymentItem';
import Spinner from '../../components/Spinner';
import { useGetMyInvoicesQuery } from '../../services/invoiceService';
import Layout from '../user/Layout';

const Payment = () => {

    const { data, error, isLoading, isSuccess, isError } = useGetMyInvoicesQuery()

    let isEmpty
    let emptyMessage


    const location = useLocation()
    let notification = location.state?.notification ? location.state.notification : null

    if (!data?.length) {
        isEmpty = true
        emptyMessage = (<div className="alert shadow-lg">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>Belum melakukan transaksi</span>
            </div>
        </div>)
    }


    if (isLoading) {
        return <Spinner />
    }

    return (
        <Layout>
            <div>
                <div className={`alert shadow-lg mb-5 ${(notification?.type === "success") ? "alert-success" :
                    (notification?.type === "error") ? "alert-error" :
                        (notification?.type === "warning") ? "alert-warning" : ""
                    }${notification?.message ? "" : 'hidden'}`}>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{notification?.message ? notification.message : null}!</span>
                    </div>
                </div>
            </div>

            {isEmpty ? emptyMessage
                : data ? <PaymentItem invoices={data} />
                    : null}
        </Layout>
    )
}

export default Payment;