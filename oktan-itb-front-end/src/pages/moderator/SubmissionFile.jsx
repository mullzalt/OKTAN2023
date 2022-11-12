import React from 'react';
import getCompetitionSubmission from '../../components/competitions/moderator/getCompetitionSubmission';
import ListPeserta from '../../components/user/ListPeserta';
import Layout from './Layout';

const SubmissionFiles = () => {
    return (
        
        <Layout>
            <getCompetitionSubmission />
        </Layout>
    )
}

export default SubmissionFiles;