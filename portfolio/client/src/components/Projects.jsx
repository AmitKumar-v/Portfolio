import { useEffect, useState } from 'react';
import api, { getErrorMessage } from '../api/client';
import Section from './Section';
import ProjectCard from './ProjectCard';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Runs once when the page opens: ask the API for the projects
  useEffect(() => {
    api
      .get('/projects')
      .then((res) => setProjects(res.data))
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Section id="projects" title="Projects">
      {loading && <p className="text-muted-foreground">Loading projects...</p>}
      {error && <p className="text-destructive">{error}</p>}
      {!loading && !error && projects.length === 0 && (
        <p className="text-muted-foreground">No projects yet. Add one from the admin page.</p>
      )}
      <div className="space-y-6">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </Section>
  );
}
