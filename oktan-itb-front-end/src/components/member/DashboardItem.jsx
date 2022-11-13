import React from 'react'
import { useSelector } from 'react-redux'
import WelcomeImg from '../../assets/img/welcome.jpg';
import { Link } from 'react-router-dom'
import CompetitionCardItems from '../competitions/CompetitionCard';
import { useGetCompetitionsQuery } from '../../features/competitions/competitionSlice';

export const DashboardItemMember = () => {

    const params = {where: '', visible: true, isEnrolled: false}
    const {data, error, isLoading} = useGetCompetitionsQuery({...params})

    return (
        <React.Fragment>
         
         <div className='flex flex-wrap'>
            {isLoading
            ? <div>Loading...</div>  
            : error ? <div>Something went wrong, please refresh</div> 
            : data? data.map(comp => {
                return <CompetitionCardItems competition={comp}/>
            }) 
            : null}
         </div>


        </React.Fragment>
    )
}


export default DashboardItemMember