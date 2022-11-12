import React from 'react';
import { useLocation } from 'react-router-dom';
import PaymentModItem from '../../components/moderator/PaymentModItem';
import Layout from '../user/Layout';

const PaymentMod = () => {

    const location = useLocation()
    let notification = location.state?.notification ? location.state.notification : null


    return (
        <Layout>

            <div className={`alert shadow-lg mb-5 ${(notification?.type === "success") ? "alert-success" :
                (notification?.type === "error") ? "alert-error" :
                    (notification?.type === "warning") ? "alert-warning" : ""
                }${notification?.message ? "" : 'hidden'}`}>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{notification?.message ? notification.message : null}!</span>
                </div>
            </div>

            <PaymentModItem />
        </Layout>
    )
}

export default PaymentMod;