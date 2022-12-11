import React, { useEffect } from 'react';
import CompetitionHome from '../components/home/CompetitionHome';
import ContactUsHome from '../components/home/ContactUsHome';
import HeaderHome from '../components/home/HeaderHome';
import MediaSponsorHome from '../components/home/MediaSponsorHome';
import Spinner from '../components/Spinner';
import Layout from './Layout';




const Home = () => {
    return (
        <Layout>
            <HeaderHome />
            <CompetitionHome />
            <ContactUsHome />
            <MediaSponsorHome />
        </Layout>
    )
}

export default Home;