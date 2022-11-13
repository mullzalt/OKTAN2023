import React from 'react'
import { Link } from 'react-router-dom'
import { useGetCompetitionByIdQuery } from '../../../features'
import Pulse from '../../loadings/Pulse'

import CrystalLogoImg from '../../../assets/img/logo-crystal.png';
import IsotermLogoImg from '../../../assets/img/logo-isoterm.png';
import CompetitionCardItems from '../../competitions/CompetitionCard';


const card = (competition) => {
  return(
  <div className="card card-side bg-base-100 shadow-xl">
    <figure><img src="https://placeimg.com/200/280/arch" alt="Movie"/></figure>
    <div className="card-body">
      <h2 className="card-title">New movie is released!</h2>
      <p>Click the button to watch on Jetflix app.</p>
      <div className="card-actions justify-end">
        <button className="btn btn-primary">Watch</button>
      </div>
    </div>
  </div>
)}



const ModeratorCompetitionItem = ({id}) => {
  const {data, error, isLoading} = useGetCompetitionByIdQuery(id)
  return (
    <React.Fragment>
      {isLoading
            ? <Pulse/>
            : error
            ? (<>Something went wrong</>)
            : card(data) 
          }
    </React.Fragment>
  )
}

export default ModeratorCompetitionItem