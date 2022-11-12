import React from 'react';
import { useSelector } from 'react-redux';
import CompetitionItem from '../../components/competitions/competitionItem';
import Spinner from '../../components/Spinner';
import { selectCurrentUser } from '../../services/auth/authSlice';
import { useGetCompetitionsQuery } from '../../services/competitionService';
import Layout from './Layout';

const MyCompetition = () => {
    const user = useSelector(selectCurrentUser)
    const member = user.profile.id
    const param = `me=${member}`

    const { data, error, isLoading, isError } = useGetCompetitionsQuery(param)

    let isEmpty
    let emptyMessage

    if(!data?.length){
        isEmpty = true
        emptyMessage = (<div className="alert shadow-lg">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>Belum mengikuti lomba apapun</span>
        </div>
      </div>)
    }

    return (
        <Layout>
            <h1 className='text-2xl font-semibold text-center lg:text-left'>Kompetisi Saya</h1>
            <div className="pt-5 flex flex-wrap">
                {

                        isError ? (<p>{error}</p>) :
                        isLoading ? (<p>loading...</p>) :
                        isEmpty? emptyMessage :
                        data ? data.map((competition) => (
                            <CompetitionItem key={competition.id} competition={competition} />
                        )) :
                        null
                }
            </div>
        </Layout>
    )
}

export default MyCompetition;