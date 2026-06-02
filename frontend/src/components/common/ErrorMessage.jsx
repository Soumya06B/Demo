import { AlertCircle } from 'lucide-react';

function ErrorMessage({ message = 'Unable to load this content.' }) {
  return (
    <div className="flex items-start gap-3 rounded-md border border-[#f1b7a4] bg-[#fff7f4] p-4 text-[#9a3412]" role="alert">
      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}

export default ErrorMessage;
