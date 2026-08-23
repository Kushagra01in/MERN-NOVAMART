import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    const res = await login(email, password);
    setSubmitting(false);

    if (res.success) {
      navigate(redirect);
    } else {
      setErrorMsg(res.message || 'Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans">
      
      {/* Brand Header */}
      <Link to="/" className="mb-6 flex items-center font-black text-3xl text-gray-900 tracking-tight">
        <span>Nova</span>
        <span className="text-amazon-orange">Mart</span>
      </Link>

      {/* Login Card */}
      <div className="bg-white rounded-xl border border-gray-300 shadow-sm max-w-sm w-full p-8 space-y-5">
        <h1 className="text-2xl font-bold text-gray-900">Sign in</h1>

        {errorMsg && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3 rounded-lg text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-gray-700 block mb-1">Email address</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-amazon-orange focus:outline-none bg-white text-sm"
              />
              <Mail className="w-4 h-4 text-gray-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-bold text-gray-700">Password</label>
              <a href="#" className="text-amazon-blue hover:text-amazon-orange hover:underline text-[11px]">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-amazon-orange focus:outline-none bg-white text-sm"
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-amazon-yellow hover:bg-amazon-orange text-gray-950 font-bold py-2.5 rounded-lg text-xs shadow-xs hover:shadow-md transition duration-150 disabled:opacity-50 mt-2"
          >
            {submitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="text-[11px] text-gray-500 text-center leading-relaxed">
          By continuing, you agree to NovaMart's Conditions of Use and Privacy Notice.
        </div>

        {/* Demo Credentials Box */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-3 text-[11px] text-gray-700 space-y-1">
          <div className="font-bold text-amber-900">Demo Accounts Available:</div>
          <div>👑 <strong>Admin:</strong> admin@novamart.com / admin123</div>
          <div>👤 <strong>Customer:</strong> john@example.com / user123</div>
        </div>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-gray-200" />
          <span className="flex-shrink mx-2 text-gray-400 text-[11px]">New to NovaMart?</span>
          <div className="flex-grow border-t border-gray-200" />
        </div>

        <Link
          to={`/register?redirect=${redirect}`}
          className="w-full block text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 rounded-lg text-xs border border-gray-300 transition shadow-2xs"
        >
          Create your NovaMart account
        </Link>
      </div>

    </div>
  );
};

export const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters');
      return;
    }

    setSubmitting(true);
    const res = await register(name, email, password);
    setSubmitting(false);

    if (res.success) {
      navigate(redirect);
    } else {
      setErrorMsg(res.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans">
      
      {/* Brand Header */}
      <Link to="/" className="mb-6 flex items-center font-black text-3xl text-gray-900 tracking-tight">
        <span>Nova</span>
        <span className="text-amazon-orange">Mart</span>
      </Link>

      {/* Registration Card */}
      <div className="bg-white rounded-xl border border-gray-300 shadow-sm max-w-sm w-full p-8 space-y-5">
        <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>

        {errorMsg && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3 rounded-lg text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-gray-700 block mb-1">Your name</label>
            <input
              type="text"
              required
              placeholder="First and last name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-amazon-orange focus:outline-none bg-white text-sm"
            />
          </div>

          <div>
            <label className="font-bold text-gray-700 block mb-1">Email</label>
            <input
              type="email"
              required
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-amazon-orange focus:outline-none bg-white text-sm"
            />
          </div>

          <div>
            <label className="font-bold text-gray-700 block mb-1">Password</label>
            <input
              type="password"
              required
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-amazon-orange focus:outline-none bg-white text-sm"
            />
          </div>

          <div>
            <label className="font-bold text-gray-700 block mb-1">Re-enter password</label>
            <input
              type="password"
              required
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-amazon-orange focus:outline-none bg-white text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-amazon-yellow hover:bg-amazon-orange text-gray-950 font-bold py-2.5 rounded-lg text-xs shadow-xs hover:shadow-md transition duration-150 disabled:opacity-50 mt-2"
          >
            {submitting ? 'Creating account...' : 'Create your NovaMart account'}
          </button>
        </form>

        <div className="text-[11px] text-gray-500 leading-relaxed border-t border-gray-200 pt-4">
          Already have an account?{' '}
          <Link to={`/login?redirect=${redirect}`} className="text-amazon-blue hover:text-amazon-orange hover:underline font-bold">
            Sign in
          </Link>
        </div>
      </div>

    </div>
  );
};