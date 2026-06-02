import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { ROUTES } from '../constants/appConstants';

function NotFound() {
  return (
    <section className="container-page flex min-h-[calc(100vh-8rem)] items-center justify-center py-12 text-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-[#1f6feb]">404</p>
        <h1 className="mt-3 text-4xl font-bold text-slate-950">Page not found</h1>
        <p className="mt-4 text-slate-600">The page you are looking for does not exist.</p>
        <Link className="mt-6 inline-flex" to={ROUTES.HOME}>
          <Button>Go Home</Button>
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
