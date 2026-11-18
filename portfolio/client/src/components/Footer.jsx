import { Link } from 'react-router-dom';
import profile from '../data/profile';

export default function Footer() {
  return (
    <footer className="flex justify-between border-t border-border py-8 text-sm text-muted-foreground">
      <span>
        &copy; {new Date().getFullYear()} {profile.name}
      </span>
      <Link to="/admin/login" className="hover:text-foreground">
        Admin
      </Link>
    </footer>
  );
}
