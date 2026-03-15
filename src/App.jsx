import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

import Home from './pages/Home.jsx';
import Infrastructure from './pages/Infrastructure.jsx';
import Faculty from './pages/Faculty.jsx';
import Students from './pages/Students.jsx';
import Research from './pages/Research.jsx';
import Events from './pages/Events.jsx';
import Alumni from './pages/Alumni.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import NotFound from './pages/NotFound.jsx';

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Admin routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>

      {/* Public routes */}
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/infrastructure" element={<PublicLayout><Infrastructure /></PublicLayout>} />
      <Route path="/faculty" element={<PublicLayout><Faculty /></PublicLayout>} />
      <Route path="/students" element={<PublicLayout><Students /></PublicLayout>} />
      <Route path="/research" element={<PublicLayout><Research /></PublicLayout>} />
      <Route path="/events" element={<PublicLayout><Events /></PublicLayout>} />
      <Route path="/alumni" element={<PublicLayout><Alumni /></PublicLayout>} />
      
      {/* 404 Case */}
      <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
    </Routes>
  );
}
