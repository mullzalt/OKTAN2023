import React from 'react'
import Pulse from '../../../components/loadings/Pulse'
import Spinner from '../../../components/loadings/Spinner'
import { ModeratorCompetitionItem } from '../../../components/moderator'
import { Layout } from '../../../components/user'
import { useGetCompetitionsQuery } from '../../../features'


const CompetitionList = () => {

  const params = {where: '', visible: true}
  const {data, error, isLoading} = useGetCompetitionsQuery({...params})


  
  return (
        <React.Fragment>
          <div className="form-control mb-4">
            <div className="input-group">
              <input type="text" placeholder="Search…" className="input input-bordered w-full" />
              <button className="btn btn-square">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
            </div>
          </div>

          <div className='grid grid-cols-4 gap-4'>
            {isLoading
              ? <Spinner/>
              : error
              ? (<>Something went wrong</>)
              : data.map(competition => {
                return <ModeratorCompetitionItem id={competition.id}/>
              }) 
            }
          </div>
        </React.Fragment>
  )
}

export default CompetitionList