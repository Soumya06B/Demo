import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { ROUTES } from '../constants/appConstants';
import { authService } from '../services/authService';

function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    try {
      const { data } = await authService.register(values);
      toast.success(data.message || 'OTP sent to email');
      navigate(ROUTES.VERIFY_REGISTER_OTP, { state: { email: values.email } });
    } catch (error) {
      toast.error(error.message || 'Registration failed');
    }
  };

  return (
    <section className="container-page flex min-h-[calc(100vh-8rem)] items-center justify-center py-12">
      <div className="w-full max-w-md rounded-md border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-950">Register</h1>
        <p className="mt-2 text-sm text-slate-600">Create an account to start using the dashboard.</p>
        <form className="mt-6 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Name" placeholder="Your name" error={errors.name?.message} {...register('name', { required: 'Name is required' })} />
          <Input label="Email" type="email" placeholder="you@example.com" error={errors.email?.message} {...register('email', { required: 'Email is required' })} />
          <Input label="Password" type="password" placeholder="Create password" error={errors.password?.message} {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Use at least 8 characters' } })} />
          <Button type="submit" isLoading={isSubmitting}>Send Register OTP</Button>
        </form>
        <p className="mt-5 text-center text-sm text-slate-600">
          Already have an account? <Link className="font-semibold text-[#1f6feb]" to={ROUTES.LOGIN}>Login</Link>
        </p>
      </div>
    </section>
  );
}

export default Register;
