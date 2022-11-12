import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardItemMember from '../../components/member/DashboardItem';
import Layout from './Layout';



const Dashboard = () => {

    return (
        <Layout>
            <DashboardItemMember/>

        </Layout>
    )
}

export default Dashboard;