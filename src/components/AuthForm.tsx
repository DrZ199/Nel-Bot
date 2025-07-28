import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function AuthForm() {
  const { signIn, signUp, loading } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    setError(null);
    const fn = mode === 'signin' ? signIn : signUp;
    const result = await fn(email, password);
    if (result && result.error) setError(result.error);
    setPending(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-8 rounded shadow-md w-80 flex flex-col gap-4">
        <h2 className="text-xl font-bold mb-2 text-center">{mode === 'signin' ? 'Sign In' : 'Sign Up'}</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border rounded px-3 py-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border rounded px-3 py-2"
          required
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2 font-semibold disabled:opacity-50"
          disabled={pending || loading}
        >
          {pending ? 'Loading...' : mode === 'signin' ? 'Sign In' : 'Sign Up'}
        </button>
        <button
          type="button"
          className="text-blue-600 underline text-sm mt-2"
          onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
        >
          {mode === 'signin' ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
        </button>
      </form>
    </div>
  );
}