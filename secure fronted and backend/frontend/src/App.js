import { useState } from 'react';
import { AuthProvider, useAuth } from './AuthContext';
import Login from './Login';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';

function AppContent() {
  const { auth } = useAuth();
  const [page, setPage] = useState(auth ? auth.role : 'login');

  const handleLogin = (role) => setPage(role);
  const handleLogout = () => setPage('login');

  if (page === 'login' || !auth) return <Login onLogin={handleLogin} />;
  if (page === 'ROLE_ADMIN') return <AdminDashboard onLogout={handleLogout} />;
  return <UserDashboard onLogout={handleLogout} />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
