import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import FormUploadCompetition from '../../components/competitions/FormUploadSubmission';
import { CompetitionParticipantSubmission } from '../../components/competitions/moderator/CompetitionParticipantDetailCard';
import TeamProfileDetail from '../../components/competitions/TeamProfileDetail';
import Spinner from '../../components/Spinner';
import { selectCurrentUser } from '../../services/auth/authSlice';
import { useGetCompetitionByIdQuery, useGetMyPaperQuery, useGetMyStatusQuery, useGetParticipantCardQuery } from '../../services/competitionService';
import Layout from './Layout';

const EnrollProfile = () => {
    const { id } = useParams()
    const navigate = useNavigate()


    const { data: myData, error: myError, isLoading } = useGetMyStatusQuery(id)
    const { data: competition, isLoading: isCompLoading } = useGetCompetitionByIdQuery(id)

    const user = useSelector(selectCurrentUser)
    const { data: file, isLoading: isFileLoading } = useGetParticipantCardQuery({ competitionId: id, memberId: user.profile.id })

    useEffect(() => {
        if (!myData) navigate(`/competition/${id}`)
    }, [myData, navigate])

    if (isLoading || isCompLoading || isFileLoading) {
        return <Spinner />
    }

    return (
        <Layout>
            <h1 className='text-2xl font-semibold text-center lg:text-left'>{competition.category}</h1>
            <h2 className='text-lg text-center lg:text-left'>{competition.title}</h2>
            <div className="flex flex-wrap">
                <TeamProfileDetail myData={myData} userData={user} fileUrl={file} />
            </div>
        </Layout>
    )
}

export default EnrollProfile;