import { Loader2 } from 'lucide-react';

const variants = {
  primary: 'bg-[#1f6feb] text-white hover:bg-[#185cc4] focus-visible:ring-[#1f6feb]',
  secondary: 'bg-white text-[#172033] ring-1 ring-slate-200 hover:bg-slate-50 focus-visible:ring-[#1f6feb]',
  danger: 'bg-[#c2410c] text-white hover:bg-[#9a3412] focus-visible:ring-[#c2410c]',
};

function Button({ children, className = '', isLoading = false, variant = 'primary', type = 'button', ...props }) {
  return (
    <button
      type={type}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-65 ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
}

export default Button;
