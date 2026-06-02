import { useEffect, useState } from 'react';
import ErrorMessage from '../components/common/ErrorMessage';
import Loader from '../components/common/Loader';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';

function Dashboard() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setError('');
    }, 300);

    return () => clearTimeout(timer);
  }, []);

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
        <Button variant="secondary">Refresh</Button>
      </div>
      {error && <ErrorMessage message={error} />}
      <div className="grid gap-4 sm:grid-cols-3">
        {['Active Users', 'API Status', 'Open Tasks'].map((label, index) => (
          <div key={label} className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">{label}</p>
            <p className="mt-3 text-3xl font-bold text-slate-950">{index === 1 ? 'Healthy' : index === 0 ? '128' : '6'}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Dashboard;
