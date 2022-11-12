import React from 'react';
import Layout from './Layout';
import HeaderCrystalCompetition from '../components/competitions/crystal/HeaderCrystalCompetition';
import DescriptionCrystalCompetition from '../components/competitions/crystal/DescriptionCrystalCompetition';
import TimelineCrystalCompetition from '../components/competitions/crystal/TimelineCrystalCompetition';
import RequirementCrystalCompetition from '../components/competitions/crystal/RequirementCrystalCompetition';
import InformationContactCrystalCompetition from '../components/competitions/crystal/InformationContactCrystalCompetition';
import PrizeCrystalCompetition from '../components/competitions/crystal/PrizeCrystalCompetition';

const IsotermCompetition = () => {
    return (
        <Layout>
            <HeaderCrystalCompetition />
            <DescriptionCrystalCompetition />
            <RequirementCrystalCompetition />
            <PrizeCrystalCompetition />
            <TimelineCrystalCompetition />
            <InformationContactCrystalCompetition />
        </Layout>
    )
}

export default IsotermCompetition;