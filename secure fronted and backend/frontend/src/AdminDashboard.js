import { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import api from './api';

export default function AdminDashboard({ onLogout }) {
  const { auth, logout } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [users, setUsers] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      api.get('/api/admin/dashboard'),
      api.get('/api/admin/users')
    ])
      .then(([d, u]) => { setDashboard(d.data); setUsers(u.data); })
      .catch(() => setError('Access denied'));
  }, []);

  const handleLogout = () => { logout(); onLogout(); };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>🛡️ Admin Dashboard</h2>
        <p><b>Logged in as:</b> {auth?.username}</p>
        <p><b>Role:</b> <span style={styles.badge}>{auth?.role}</span></p>
        <hr />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {dashboard && (
          <div style={styles.section}>
            <p>✅ <b>/api/admin/dashboard</b></p>
            <pre>{JSON.stringify(dashboard, null, 2)}</pre>
          </div>
        )}
        {users && (
          <div style={{ ...styles.section, marginTop: '12px' }}>
            <p>✅ <b>/api/admin/users</b></p>
            <pre>{JSON.stringify(users, null, 2)}</pre>
          </div>
        )}
        <p style={styles.tokenBox}><b>JWT Token (truncated):</b><br />{auth?.token?.substring(0, 60)}...</p>
        <button style={styles.logout} onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#fff7e6' },
  card: { background: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 12px rgba(0,0,0,0.1)', width: '460px' },
  badge: { background: '#fa8c16', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '13px' },
  section: { background: '#f6ffed', padding: '12px', borderRadius: '4px', border: '1px solid #b7eb8f' },
  tokenBox: { background: '#fffbe6', padding: '10px', borderRadius: '4px', fontSize: '12px', wordBreak: 'break-all', marginTop: '1rem' },
  logout: { marginTop: '1rem', padding: '8px 20px', background: '#ff4d4f', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};
