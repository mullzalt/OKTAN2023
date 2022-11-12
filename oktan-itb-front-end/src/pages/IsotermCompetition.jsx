import React from 'react';
import Layout from './Layout';
import HeaderIsotermCompetition from '../components/competitions/isoterm/HeaderIsotermCompetition';
import DescriptionIsotermCompetition from '../components/competitions/isoterm/DescriptionIsotermCompetition';
import TimelineIsotermCompetition from '../components/competitions/isoterm/TimelineIsotermCompetition';
import RequirementIsotermCompetition from '../components/competitions/isoterm/RequirementIsotermCompetition';
import InformationContactIsotermCompetition from '../components/competitions/isoterm/InformationContactIsotermCompetition';
import PrizeIsotermCompetition from '../components/competitions/isoterm/PrizeIsotermCompetition';


const IsotermCompetition = () => {

    return (
        <Layout>
            <HeaderIsotermCompetition />
            <DescriptionIsotermCompetition />
            <RequirementIsotermCompetition />
            <PrizeIsotermCompetition />
            <TimelineIsotermCompetition />
            <InformationContactIsotermCompetition />
        </Layout>
    )
}

export default IsotermCompetition;