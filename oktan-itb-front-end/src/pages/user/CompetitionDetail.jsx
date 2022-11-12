import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import CompetitionDetailItem from '../../components/competitions/competitionDetailItem';
import Spinner from '../../components/Spinner';
import FormCompetitionDetail from '../../components/user/FormCompetitionDetail';
import { useGetCompetitionByIdQuery } from '../../services/competitionService';
import Layout from './Layout';
import CompetitionImg from '../../assets/img/competition.jpg';
import CrystalLogoImg from '../../assets/img/logo-crystal.png';
import IsotermLogoImg from '../../assets/img/logo-isoterm.png';

const CompetitionDetail = () => {

    const location = useLocation()
    let notification = location.state?.notification ? location.state.notification : null

    let { id } = useParams()
    const { data, error, isLoading, isError } = useGetCompetitionByIdQuery(id)

    let image = data?.cover_image ? data.cover_image :
        (data?.category === 'ISOTERM') ? IsotermLogoImg :
            (data?.category === 'CRYSTAL') ? CrystalLogoImg : CompetitionImg

    if (isLoading) {
        return <Spinner />
    }
    const errMessage = error ? 'Upps, please try to reload your page' : 'This is a test'



    return (
        <Layout>
            <div className={`alert shadow-lg mb-5 ${(notification?.type === "success") ? "alert-success" :
                (notification?.type === "error") ? "alert-error" :
                    (notification?.type === "warning") ? "alert-warning" : ""
                }${notification?.message ? "" : 'hidden'}`}>
                <div>
                    <span>{notification?.message ? notification.message : null}!</span>
                </div>
            </div>


            {isError ? <div className="alert shadow-lg">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>{errMessage}</span>
                </div>
            </div> : null}
            {data ? <CompetitionDetailItem competition={data} image={image} /> : error}
        </Layout>
    )
}

export default CompetitionDetail;