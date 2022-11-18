import React from 'react'
import CompetitionCardItems from '../../components/competitions/CompetitionCard'
import { ModeratorCompetitionItem } from '../../components/moderator'
import { useGetCompetitionByIdQuery, useGetCompetitionsQuery } from '../../features'




const MyCompetitions = () => {

    const enrolled = { where: '', drafted: false, enrolled: true }
    const { data: enrolledComp, error: ecError, isLoading: isEcLoading } = useGetCompetitionsQuery({ ...enrolled })
    return (
        <div>

            {
                isEcLoading ? <>...</> : ecError ? <>Something went wrong</> :
                    enrolledComp ? enrolledComp.map(comp => {
                        return <CompetitionCardItems id={comp.id} />
                    }) : <>empty</>
            }
        </div>
    )
}

export default MyCompetitions