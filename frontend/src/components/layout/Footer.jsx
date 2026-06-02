import { formatDate } from '../../utils/formatDate';
import { APP_NAME } from '../../constants/appConstants';

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container-page flex min-h-16 items-center justify-between gap-4 text-sm text-slate-500">
        <span>{APP_NAME}</span>
        <span>{formatDate(new Date(), 'yyyy')}</span>
      </div>
    </footer>
  );
}

export default Footer;
