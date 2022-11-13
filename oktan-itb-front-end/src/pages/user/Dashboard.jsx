import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardItemMember from '../../components/member/DashboardItem';


const Dashboard = () => {

    return (
        <DashboardItemMember/>
    )
}

export default Dashboard;