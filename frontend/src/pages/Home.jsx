import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import Button from '../components/ui/Button';
import { ROUTES } from '../constants/appConstants';

function Home() {
  return (
    <section className="container-page grid min-h-[calc(100vh-8rem)] items-center gap-10 py-12 lg:grid-cols-[1fr_0.9fr]">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#1f6feb]">Production starter</p>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
          A scalable React frontend foundation for real applications.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
          Routing, authentication structure, API services, reusable components, notifications, forms, and responsive styling are ready to extend.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to={ROUTES.DASHBOARD}>
            <Button>
              Open Dashboard
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to={ROUTES.REGISTER}>
            <Button variant="secondary">Create Account</Button>
          </Link>
        </div>
      </motion.div>
      <motion.div
        className="rounded-md border border-slate-200 bg-white p-6 shadow-sm"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, delay: 0.1 }}
      >
        <div className="grid gap-4">
          <div className="flex items-start gap-4 rounded-md bg-slate-50 p-4">
            <ShieldCheck className="h-6 w-6 text-[#18835f]" />
            <div>
              <h2 className="font-semibold text-slate-950">Protected Routes</h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">Authentication state is centralized and guarded routes are isolated.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-md bg-slate-50 p-4">
            <Zap className="h-6 w-6 text-[#c2410c]" />
            <div>
              <h2 className="font-semibold text-slate-950">API Layer</h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">Axios interceptors handle tokens and normalized API errors.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Home;
