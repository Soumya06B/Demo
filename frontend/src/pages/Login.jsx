import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { ROUTES } from '../constants/appConstants';
import { authService } from '../services/authService';

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    try {
      const { data } = await authService.login(values);
      toast.success(data.message || 'Login OTP sent to email');
      navigate(ROUTES.VERIFY_LOGIN_OTP, { state: { email: values.email } });
    } catch (error) {
      toast.error(error.message || 'Login failed');
    }
  };

  return (
    <section className="container-page flex min-h-[calc(100vh-8rem)] items-center justify-center py-12">
      <div className="w-full max-w-md rounded-md border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-950">Login</h1>
        <p className="mt-2 text-sm text-slate-600">Access your dashboard with your account credentials.</p>
        <form className="mt-6 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Email" type="email" placeholder="you@example.com" error={errors.email?.message} {...register('email', { required: 'Email is required' })} />
          <Input label="Password" type="password" placeholder="Enter password" error={errors.password?.message} {...register('password', { required: 'Password is required' })} />
          <Button type="submit" isLoading={isSubmitting}>Send Login OTP</Button>
        </form>
      </div>
    </section>
  );
}

export default Login;
