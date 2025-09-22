import React, { useState } from 'react';
import { login, signup } from '../api.auth';
import { ImageWithFallback } from './ui/ImageWithFallback';
import loginHero from '../assets/dashboard-ui.jpg';

type Props = {
  onAuthenticated: () => void;
};

export function Auth({ onAuthenticated }: Props) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === 'signup') {
        if (!username) {
          setError('Please enter a username');
          setLoading(false);
          return;
        }
        await signup(username, email, password);
      } else {
        await login(email, password);
      }
      onAuthenticated();
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'Request failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEFEFE] via-[#D5D8AB]/30 to-[#84A15D]/20 flex items-center justify-center px-4" style={{ fontFamily: 'Georgia, serif' }}>
      <div className="w-full max-w-md bg-white/80 backdrop-blur rounded-xl shadow-lg p-0 border border-[#84A15D]/30 overflow-hidden">
        <div className="w-full h-40 bg-[#E1D1A5]/40 flex items-center justify-center">
          <ImageWithFallback src={loginHero} alt="Ayur Login" className="h-40 w-full object-cover" />
        </div>
        <div className="p-6">
        <div className="flex mb-6">
          <button
            className={`flex-1 py-2 rounded-l-md border ${mode === 'login' ? 'bg-[#84A15D] text-white border-[#84A15D]' : 'bg-white text-[#84A15D] border-[#84A15D]/40'}`}
            onClick={() => setMode('login')}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 rounded-r-md border ${mode === 'signup' ? 'bg-[#84A15D] text-white border-[#84A15D]' : 'bg-white text-[#84A15D] border-[#84A15D]/40'}`}
            onClick={() => setMode('signup')}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-sm mb-1 text-[#2F3E1E]">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-[#84A15D]/40 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#84A15D]/50"
                placeholder="Your username"
              />
            </div>
          )}
          <div>
            <label className="block text-sm mb-1 text-[#2F3E1E]">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-[#84A15D]/40 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#84A15D]/50"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-[#2F3E1E]">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-[#84A15D]/40 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#84A15D]/50"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error === 'Network Error' ? 'Cannot reach backend. Check VITE_API_URL and backend server.' : error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-[#84A15D] text-white rounded-md hover:bg-[#6d844b] transition disabled:opacity-60"
          >
            {loading ? 'Please wait…' : (mode === 'signup' ? 'Create Account' : 'Login')}
          </button>
        </form>
        </div>
      </div>
    </div>
  );
}


