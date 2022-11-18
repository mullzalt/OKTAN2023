import React from 'react'
import CompetitionCardItems from '../../components/competitions/CompetitionCard'
import { ModeratorCompetitionItem } from '../../components/moderator'
import { useGetCompetitionByIdQuery, useGetCompetitionsQuery } from '../../features'




const CompetitionListsMember = () => {
    const enrolled = { where: '', drafted: false, enrolled: false }
    const { data, error, isLoading } = useGetCompetitionsQuery({ ...enrolled })
    return (
        <div>

            {
                isLoading ? <>...</> : error ? <>Something went wrong</> :
                    data ? data.map(comp => {
                        return <CompetitionCardItems id={comp.id} />
                    }) : <>empty</>
            }
        </div>
    )
}

export default CompetitionListsMember