'use client';
import { useEffect, useState } from 'react';
import { supabase, isConfigured } from '@/lib/supabase';
import Dashboard from '@/components/admin/Dashboard';

export default function AdminPage() {
  const [session, setSession] = useState(undefined);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  useEffect(() => {
    if (!isConfigured) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  async function login(e) {
    e.preventDefault();
    setErr('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setErr('Wrong email or password.');
  }

  if (!isConfigured) {
    return (
      <div className="setup">
        <h1>Admin isn&apos;t connected yet</h1>
        <p>
          Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to your
          environment, then reload. Steps are in the README.
        </p>
      </div>
    );
  }
  if (session === undefined) return <div className="setup"><p>Loading...</p></div>;
  if (session) return <Dashboard email={session.user.email} />;

  return (
    <form className="login panel" onSubmit={login}>
      <h1 style={{ fontSize: '1.4rem', marginBottom: '1.2rem' }}>Admin login</h1>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="field">
        <label htmlFor="pw">Password</label>
        <input id="pw" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button className="btn btn-primary" type="submit">Log in</button>
      {err && <p className="msg err">{err}</p>}
    </form>
  );
}
