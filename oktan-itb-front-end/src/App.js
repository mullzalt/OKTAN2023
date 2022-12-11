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
import CompetitionListsMember from './pages/member/CompetitionLists';
import CompetitionDetailsMember from './pages/member/CompetitionDetails';
import EnrollCompetition from './pages/member/EnrollCompetition';
import ParticipantDetail from './pages/moderator/competitions/ParticipantDetail';
import InvoicesLists from './pages/member/InvoicesLists';
import InvoiceDetail from './pages/member/InvoiceDetail';
import InvoicePay from './pages/member/InvoicePay';
import PaymentsLog from './pages/moderator/payments/PaymentsLog';
import PaymentDetail from './pages/moderator/payments/PaymentDetail';
import MemberLists from './pages/moderator/members/MemberLists';
import MemberDetail from './pages/moderator/members/MemberDetail';
import SubmissionPage from './pages/member/SubmissionPage';
import SubmissionForm from './pages/member/SubmissionForm';
import PaperLists from './pages/moderator/papers/PaperLists';
import PaperDetail from './pages/moderator/papers/PaperDetail';
import CreateNotifications from './pages/moderator/news/CreateNotifications';


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
            <Route path='/competitions' element={<CompetitionListsMember />} />
            <Route path='/competitions/:id' element={<CompetitionDetailsMember />} />
            <Route path='/competitions/:id/enroll' element={<EnrollCompetition />} />
            <Route path='/invoices' element={<InvoicesLists />} />
            <Route path='/invoices/:id' element={<InvoiceDetail />} />
            <Route path='/invoices/:id/pay' element={<InvoicePay />} />

            <Route path='/submissions' element={<SubmissionPage />} />
            <Route path='/submissions/:competitionId/members/:memberId/submit' element={<SubmissionForm />} />
          </Route>


          <Route element={< RequireAuth />}>
            <Route path='/moderator'>
              <Route index element={<Dashboard />} />
              <Route path='competitions' element={<CompetitionList />} />
              <Route path='competitions/:id/edit' element={<CompetitionDetail />} />
              <Route path='competitions/:id/members' element={<ParticipantList />} />
              <Route path='competitions/:id/members/:memberId' element={<ParticipantDetail />} />

              <Route path='payments' element={<PaymentsLog />} />
              <Route path='payments/:id' element={<PaymentDetail />} />

              <Route path='members' element={<MemberLists />} />
              <Route path='members/:id' element={<MemberDetail />} />

              <Route path='papers' element={<PaperLists />} />
              <Route path='papers/:competitionId/members/:memberId' element={<PaperDetail />} />

              <Route path='notifications/send' element={<CreateNotifications />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
