import { Loader2 } from 'lucide-react';

function Loader({ label = 'Loading...' }) {
  return (
    <div className="flex min-h-40 items-center justify-center gap-3 text-slate-600" role="status">
      <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

export default Loader;
