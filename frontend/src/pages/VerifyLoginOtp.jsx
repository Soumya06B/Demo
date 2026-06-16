import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { ROUTES } from '../constants/appConstants';
import { useAuth } from '../hooks/useAuth';
import { authService } from '../services/authService';

function VerifyLoginOtp() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const defaultEmail = location.state?.email || '';
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { email: defaultEmail } });

  const onSubmit = async (values) => {
    try {
      const { data } = await authService.verifyLoginOtp(values);
      login({ token: data.token, user: data.user });
      toast.success('Logged in successfully');
      navigate(ROUTES.DASHBOARD, { replace: true });
    } catch (error) {
      toast.error(error.message || 'OTP verification failed');
    }
  };

  return (
    <section className="container-page flex min-h-[calc(100vh-8rem)] items-center justify-center py-12">
      <div className="w-full max-w-md rounded-md border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-950">Verify Login OTP</h1>
        <p className="mt-2 text-sm text-slate-600">Enter the 6-digit OTP sent to your email.</p>
        <form className="mt-6 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Email" type="email" placeholder="you@example.com" error={errors.email?.message} {...register('email', { required: 'Email is required' })} />
          <Input label="OTP" inputMode="numeric" maxLength="6" placeholder="123456" error={errors.otp?.message} {...register('otp', { required: 'OTP is required', minLength: { value: 6, message: 'OTP must be 6 digits' } })} />
          <Button type="submit" isLoading={isSubmitting}>Verify OTP</Button>
        </form>
        <p className="mt-5 text-center text-sm text-slate-600">
          Need a new OTP? <Link className="font-semibold text-[#1f6feb]" to={ROUTES.LOGIN}>Login again</Link>
        </p>
      </div>
    </section>
  );
}

export default VerifyLoginOtp;
