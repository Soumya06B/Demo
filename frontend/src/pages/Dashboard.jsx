import { useCallback, useEffect, useState } from 'react';
import ErrorMessage from '../components/common/ErrorMessage';
import Loader from '../components/common/Loader';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import { authService } from '../services/authService';

function Dashboard() {
  const { user, updateUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');
      const { data } = await authService.profile();
      updateUser(data.user);
    } catch (error) {
      setError(error.message || 'Unable to load profile');
    } finally {
      setIsLoading(false);
    }
  }, [updateUser]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  if (isLoading) {
    return <Loader label="Loading dashboard..." />;
  }

  return (
    <section className="container-page py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">Dashboard</h1>
          <p className="mt-2 text-slate-600">Welcome back, {user?.name || 'User'}.</p>
        </div>
        <Button variant="secondary" onClick={loadProfile} isLoading={isLoading}>Refresh</Button>
      </div>
      {error && <ErrorMessage message={error} />}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Name</p>
          <p className="mt-3 text-xl font-bold text-slate-950">{user?.name || 'User'}</p>
        </div>
        <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Email</p>
          <p className="mt-3 break-all text-xl font-bold text-slate-950">{user?.email || 'Not available'}</p>
        </div>
        <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Email Verification</p>
          <p className="mt-3 text-xl font-bold text-slate-950">{user?.isEmailVerified ? 'Verified' : 'Pending'}</p>
        </div>
        <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Account Created</p>
          <p className="mt-3 text-xl font-bold text-slate-950">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Not available'}</p>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
