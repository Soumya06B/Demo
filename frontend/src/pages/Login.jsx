import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { ROUTES } from '../constants/appConstants';
import { useAuth } from '../hooks/useAuth';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 350));
    login({ token: 'demo-token', user: { name: 'Demo User', email: values.email } });
    toast.success('Logged in successfully');
    navigate(location.state?.from?.pathname || ROUTES.DASHBOARD, { replace: true });
  };

  return (
    <section className="container-page flex min-h-[calc(100vh-8rem)] items-center justify-center py-12">
      <div className="w-full max-w-md rounded-md border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-950">Login</h1>
        <p className="mt-2 text-sm text-slate-600">Access your dashboard with your account credentials.</p>
        <form className="mt-6 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Email" type="email" placeholder="you@example.com" error={errors.email?.message} {...register('email', { required: 'Email is required' })} />
          <Input label="Password" type="password" placeholder="Enter password" error={errors.password?.message} {...register('password', { required: 'Password is required' })} />
          <Button type="submit" isLoading={isSubmitting}>Login</Button>
        </form>
      </div>
    </section>
  );
}

export default Login;
