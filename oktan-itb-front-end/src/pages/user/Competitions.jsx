import React from 'react';
import CompetitionItem from '../../components/competitions/competitionItem';
import { useGetCompetitionsQuery } from '../../services/competitionService';
import Layout from './Layout';

const CompetitionsPage = () => {

    const { data: isoterm, error: isoError, isLoading: isoLoading } = useGetCompetitionsQuery('where=ISOTERM', { refetchOnMountOrArgChange: true })
    const { data: crystal, error: crysError, isLoading: crysLoading } = useGetCompetitionsQuery('where=CRYSTAL', { refetchOnMountOrArgChange: true })

    return (
        <Layout>
            <div>                
                <h1 className='text-2xl font-semibold text-center lg:text-left'>ISOTERM Competition</h1>
                <div className="pt-5 flex flex-wrap">
                    {
                        isoError ? (<p>{isoError}</p>) :
                        isoLoading ? (<p>loading...</p>) :
                        isoterm ? isoterm.map((competition) => (
                            <CompetitionItem key={competition.id} competition={competition} />
                        )) :
                        null
                    }
                </div>

                <h1 className='text-2xl font-semibold text-center mt-10 lg:text-left'>CRYSTAL Competition</h1>
                <div className="pt-5 flex flex-wrap">
                    {
                        crysError ? (<p>{crysLoading}</p>) :
                        crysLoading ? (<p>crysLoading...</p>) :
                        crystal ? crystal.map((competition) => (
                            <CompetitionItem key={competition.id} competition={competition} />
                        )) :
                        null
                    }
                </div>
            </div>
        </Layout>
    )
}

export default CompetitionsPage;