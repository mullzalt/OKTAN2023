import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import FormUploadCompetition from '../../components/competitions/FormUploadSubmission';
import InfoIsotermUpload from '../../components/competitions/InfoIsotermUpload';
import { CompetitionParticipantSubmission } from '../../components/competitions/moderator/CompetitionParticipantDetailCard';
import TeamProfileDetail from '../../components/competitions/TeamProfileDetail';

import Spinner from '../../components/Spinner';
import { selectCurrentUser } from '../../services/auth/authSlice';
import { useGetCompetitionByIdQuery, useGetMyPaperQuery, useGetMyStatusQuery } from '../../services/competitionService';
import Layout from './Layout';

const SubmissionUpload = () => {
    const { id } = useParams()
    const navigate = useNavigate()


    const { data: myData, error: myError, isLoading } = useGetMyStatusQuery(id)


    const user = useSelector(selectCurrentUser)

    const { data: competition, isLoading: isCompLoading } = useGetCompetitionByIdQuery(id)
    const { data: paper, isLoading: isPapLoading, isError: papError } = useGetMyPaperQuery(id)

    useEffect(() => {
        if (!myData) navigate(`/competition/${id}`)
    }, [myData, navigate])

    if (isLoading || isCompLoading || isPapLoading) {
        return <Spinner />
    }


    let alreadySubmitted = paper?.file_url ? true : papError ? false : false

    return (
        <Layout>
            <h1 className='text-2xl font-semibold text-center lg:text-left'>{competition.category}</h1>
            <h2 className='text-lg text-center lg:text-left'>{competition.title}</h2>
            <div className="flex flex-wrap">
                <InfoIsotermUpload />
                {alreadySubmitted ? null : <FormUploadCompetition key={id} myData={myData} userData={user} competiton={competition} />}
                {alreadySubmitted ? <CompetitionParticipantSubmission paper={paper} /> : null}
            </div>
        </Layout>
    )
}

export default SubmissionUpload;