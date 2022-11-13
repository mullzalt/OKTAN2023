import React from 'react'
import Pulse from '../../../components/loadings/Pulse'
import Spinner from '../../../components/loadings/Spinner'
import { ModeratorCompetitionItem } from '../../../components/moderator'
import { Layout } from '../../../components/user'
import { useGetCompetitionsQuery } from '../../../features'


const CompetitionList = () => {

  const params = {where: '', visible: false}
  const {data, error, isLoading} = useGetCompetitionsQuery({...params})


  
  return (
        <React.Fragment>
          {isLoading
            ? <Spinner/>
            : error
            ? (<>Something went wrong</>)
            : data.map(competition => {
              return <ModeratorCompetitionItem id={competition.id}/>
            })
            
          }
        </React.Fragment>
  )
}

export default CompetitionList