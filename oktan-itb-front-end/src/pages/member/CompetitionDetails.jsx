import React from 'react'
import { useParams } from 'react-router-dom'
import CompetitionDetail from '../../components/competitions/CompetitionDetail'
import Spinner from '../../components/loadings/Spinner'
import { useGetCompetitionByIdQuery } from '../../features'
import NotFound from '../NotFound'



const ErrorMessage = ({ error }) => {
    if (error.status === 404) {
        return (
            <NotFound />
        )
    }

    return (
        <div className="flex justify-center">
            <h1 className='text-2xl'>{JSON.stringify(error)}</h1>
        </div>
    )
}


const CompetitionDetailsMember = () => {
    const { id } = useParams()

    const { data, isLoading, isError, isFetching, error } = useGetCompetitionByIdQuery({ id: id, checkEnroll: true })



    if (isLoading) {
        return <Spinner message={'Sedang memuat kompetisi...'} />
    }
    return (
        <div>

            {
                isLoading ? <>...</> : isError ? <ErrorMessage error={error} /> :
                    data ? < CompetitionDetail competition={data} />
                        : <NotFound />
            }
        </div>
    )
}

export default CompetitionDetailsMember