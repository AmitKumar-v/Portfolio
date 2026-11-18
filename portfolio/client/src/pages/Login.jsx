import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getErrorMessage } from '../api/client';

export default function Login() {
  const { isLoggedIn, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Already logged in? Go straight to the admin page
  if (isLoggedIn) return <Navigate to="/admin" replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-5">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 rounded-lg border border-border bg-card p-6">
        <h1 className="text-xl font-semibold">Admin login</h1>
        <div>
          <label htmlFor="email" className="label">Email</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" required />
        </div>
        <div>
          <label htmlFor="password" className="label">Password</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" required />
        </div>
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
          {loading ? 'Logging in...' : 'Log in'}
        </button>
        <Link to="/" className="block text-center text-sm text-muted-foreground hover:text-foreground">
          Back to portfolio
        </Link>
      </form>
    </main>
  );
}
