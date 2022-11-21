import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardItemMember from '../../components/member/DashboardItem';
import CompetitionDetail from '../../components/competitions/CompetitionDetail';
import { selectCurrentProfile, selectCurrentUser } from '../../features/auth/authSlice';
import DashboardItemModerator from '../../components/moderator/DashboardItemModerator';

const Dashboard = () => {
    const user = useSelector(selectCurrentUser)
    const profile = useSelector(selectCurrentProfile)

    return (
        <>
            {!user?.role ? null : user?.role === 'admin' || user?.role === 'panitia' ?
                <DashboardItemModerator profile={profile} /> : null
            }

            {!user?.role ? null : user?.role === 'peserta' ?
                <DashboardItemMember profile={profile} />
                : null
            }

        </>
    )
}

export default Dashboard;