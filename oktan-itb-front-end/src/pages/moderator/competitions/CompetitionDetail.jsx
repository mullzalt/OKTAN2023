import React from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../../../components/loadings/Spinner'
import { CompetitionForm, ParticipantTable } from '../../../components/moderator'
import { useGetCompetitionByIdQuery } from '../../../features'

const CompetitionDetail = () => {
    const { id } = useParams()

    const { data, isLoading, isError, isFetching } = useGetCompetitionByIdQuery(id)

    if (isLoading) {
        return <Spinner message={"Sedang memproses..."} />
    }

    return (
        <div>
            <div className="mb-4">
                <div className="pb-3">
                    <h2 className='font-bold text-xl'>{data.category}</h2>
                    <p className='font-semibold text-l'>{data.title}</p>
                </div>
                <hr />
            </div>
            <CompetitionForm competition={data} />
            <ParticipantTable />
        </div>
    )
}

export default CompetitionDetail