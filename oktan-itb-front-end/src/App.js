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

// import Login from './pages/Login';
// import Register from './pages/Register';
// import CompetitionDetail from './pages/user/CompetitionDetail';
// import SubmissionUpload from './pages/user/SubmissionUpload';
// import Dashboard from './pages/user/Dashboard';
// import EnrollCompetition from './pages/user/EnrollCompetition';
// import MyCompetition from './pages/user/MyCompetition';
// import Panitia from './pages/user/Panitia';
// import Peserta from './pages/moderator/CompetitionParticipant';
// import Profile from './pages/user/Profile';
// import Verification from './pages/Verification';
// import Verified from './pages/Verified';
// import CompetitionMod from './pages/moderator/CompetitionMod';
// import CompetitionParticipant from './pages/moderator/CompetitionParticipant';
// import CompetitionParticipantDetail from './pages/moderator/CompetitionParticipantDetail';
// import CompetitionsPage from './pages/user/Competitions';
// import Invoice from './pages/member/Invoice';
// import Payment from './pages/member/Payment';
// import InvoiceDetail from './pages/member/InvoiceDetail';
// import InvoiceBayar from './pages/member/InvoiceBayar';
// import PaymentDetail from './pages/member/PaymentDetail';
// import EnrollProfile from './pages/user/EnrollProfile';
// import PaymentMod from './pages/moderator/PaymentMod';
// import PaymentDetailMod from './pages/moderator/PaymentDetailMod';


function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/'>
              <Route index element={<Home/>}/>
              <Route path='/competition/crystal' element={<CrystalCompetition />} />
              <Route path='/competition/isoterm' element={<IsotermCompetition />} />
              
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/verifyemail' element={<EmailVerification />} />
              <Route path='/authentication/verified' element={<EmailVerified />} />

              <Route element={< RequireAuth />}>
                  <Route path='/dashboard' element={<Dashboard />}/>
              </Route>

              <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    </BrowserRouter>

    // <BrowserRouter>
    //   <Routes>
    //     {/* Landing Page */}
    //     <Route path='/' element={<Home />} />
    //     <Route path='/competition/crystal' element={<CrystalCompetition />} />
    //     <Route path='/competition/isoterm' element={<IsotermCompetition />} />

    //     {/* User */}
    //     <Route path='/login' element={<Login />} />
    //     <Route path='/register' element={<Register />} />
    //     <Route path='/home' element={<Dashboard />} />
    //     <Route path='/profile' element={<Profile />} />


    //     <Route path='/competition/' element={<CompetitionsPage />} />
    //     <Route path='/competition/:id' element={<CompetitionDetail />} />
    //     <Route path='/competition/:id/profile' element={<EnrollProfile />} />
    //     <Route path='/competition/:id/enroll' element={<EnrollCompetition />} />
    //     <Route path='/competition/:id/upload' element={<SubmissionUpload />} />


    //     <Route path='/invoices/me' element={<Invoice />} />
    //     <Route path='/invoices/me/:id' element={<InvoiceDetail />} />
    //     <Route path='/invoices/me/:id/bayar' element={<InvoiceBayar />} />
    //     <Route path='/payments/me' element={<Payment />} />
    //     <Route path='/payments/me/:id' element={<PaymentDetail />} />


    //     <Route path='/moderator/competition' element={<CompetitionMod />} />
    //     <Route path='/moderator/competition/:id' element={<CompetitionParticipant />} />
    //     <Route path='/moderator/competition/:id/:id' element={<CompetitionParticipantDetail />} />
    //     <Route path='/moderator/payments' element={<PaymentMod />} />
    //     <Route path='/moderator/payments/:id' element={<PaymentDetailMod />} />

    //     <Route path='/mycompetition' element={<MyCompetition />} />
    //     <Route path='/pesertas' element={<Peserta />} />
    //     <Route path='/panitia' element={<Panitia />} />

    //     {/* Authentication */}
    //     <Route path='/authentication/verify' element={<Verification />} />
    //     <Route path='/authentication/verified' element={<Verified />} />
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
