import { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import api from './api';

export default function UserDashboard({ onLogout }) {
  const { auth, logout } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/api/user/dashboard')
      .then(res => setData(res.data))
      .catch(() => setError('Access denied or session expired'));
  }, []);

  const handleLogout = () => { logout(); onLogout(); };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>👤 User Dashboard</h2>
        <p><b>Logged in as:</b> {auth?.username}</p>
        <p><b>Role:</b> <span style={styles.badge}>{auth?.role}</span></p>
        <hr />
        {data ? (
          <div style={styles.response}>
            <p>✅ <b>API Response:</b></p>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        ) : (
          <p style={{ color: 'red' }}>{error}</p>
        )}
        <p style={styles.tokenBox}><b>JWT Token (truncated):</b><br />{auth?.token?.substring(0, 60)}...</p>
        <button style={styles.logout} onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#e6f7ff' },
  card: { background: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 12px rgba(0,0,0,0.1)', width: '420px' },
  badge: { background: '#52c41a', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '13px' },
  response: { background: '#f6ffed', padding: '12px', borderRadius: '4px', border: '1px solid #b7eb8f' },
  tokenBox: { background: '#fffbe6', padding: '10px', borderRadius: '4px', fontSize: '12px', wordBreak: 'break-all', marginTop: '1rem' },
  logout: { marginTop: '1rem', padding: '8px 20px', background: '#ff4d4f', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};
