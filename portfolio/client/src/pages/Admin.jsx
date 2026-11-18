import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/ThemeToggle';
import ProjectManager from '../components/admin/ProjectManager';
import MessageList from '../components/admin/MessageList';
import ResumeManager from '../components/admin/ResumeManager';

export default function Admin() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('projects'); // 'projects', 'messages' or 'resume'

  function handleLogout() {
    logout();
    navigate('/admin/login');
  }

  const tabClass = (name) =>
    `border-b-2 px-1 pb-2 text-sm font-medium ${
      tab === name ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'
    }`;

  return (
    <>
      <header className="border-b border-border">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5">
          <span className="font-semibold">Admin</span>
          <div className="flex items-center gap-4 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground">View site</Link>
            <button type="button" onClick={handleLogout} className="text-muted-foreground hover:text-foreground">Log out</button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-8">
        <div className="mb-8 flex gap-6 border-b border-border">
          <button type="button" onClick={() => setTab('projects')} className={tabClass('projects')}>Projects</button>
          <button type="button" onClick={() => setTab('messages')} className={tabClass('messages')}>Messages</button>
          <button type="button" onClick={() => setTab('resume')} className={tabClass('resume')}>Resume</button>
        </div>
        {tab === 'projects' && <ProjectManager />}
        {tab === 'messages' && <MessageList />}
        {tab === 'resume' && <ResumeManager />}
      </main>
    </>
  );
}
