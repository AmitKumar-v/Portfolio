import ThemeToggle from './ThemeToggle';
import profile from '../data/profile';

const links = [
  { href: '#projects', label: 'Projects' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5">
        <a href="#top" className="font-semibold">
          {profile.name}
        </a>
        <nav className="flex items-center gap-5 text-sm">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-muted-foreground hover:text-foreground">
              {link.label}
            </a>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
