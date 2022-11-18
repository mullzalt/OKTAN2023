import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import NotFound from './pages/NotFound';
import RequireAuth from './features/auth/RequireAuth'

import CrystalCompetition from './pages/CrystalCompetition';
import Home from './pages/Home';
import IsotermCompetition from './pages/IsotermCompetition';

import Login from './pages/publics/Login';
import Register from './pages/publics/Register';
import EmailVerification from './pages/publics/EmailVerification';

import Dashboard from './pages/user/Dashboard';
import EmailVerified from './pages/publics/EmailVerified';
import CompetitionDetail from './pages/moderator/competitions/CompetitionDetail';
import { CompetitionList, ParticipantList } from './pages/moderator';
import MyCompetitions from './pages/member/MyCompetitions';
import CompetitionListsMember from './pages/member/CompetitionLists';
import CompetitionDetailsMember from './pages/member/CompetitionDetails';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<Home />} />
          <Route path='/competition/crystal' element={<CrystalCompetition />} />
          <Route path='/competition/isoterm' element={<IsotermCompetition />} />

          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/verifyemail' element={<EmailVerification />} />
          <Route path='/authentication/verified' element={<EmailVerified />} />

          <Route element={< RequireAuth />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/mycompetitions' element={<MyCompetitions />} />
            <Route path='/competitions' element={<CompetitionListsMember />} />
            <Route path='/competitions/:id' element={<CompetitionDetailsMember />} />
          </Route>


          <Route element={< RequireAuth />}>
            <Route path='/moderator'>
              <Route index element={<Dashboard />} />
              <Route path='competitions' element={<CompetitionList />} />
              <Route path='competitions/:id/edit' element={<CompetitionDetail />} />
              <Route path='competitions/:id/members' element={<ParticipantList />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
