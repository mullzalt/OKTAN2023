import React from 'react';
import { useParams } from 'react-router-dom';
import FormEnrollCompetition from '../../components/competitions/FormEnrollCompetition';
import Spinner from '../../components/Spinner';
import { useGetCompetitionByIdQuery } from '../../services/competitionService';
import Layout from './Layout';

const EnrollCompetition = () => {

  let {id} = useParams()
  const { data, error, isLoading, isError } = useGetCompetitionByIdQuery(id)

  if(isLoading){
    return Spinner
  }

  return (
    <Layout>
      {error? null :<FormEnrollCompetition competition={data}/>}
    </Layout>
  )
}

export default EnrollCompetition;