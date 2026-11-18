import { useEffect, useState } from 'react';
import api, { getErrorMessage } from '../../api/client';

// Features and tech stack are arrays in the database,
// but in the form they are plain text: one feature per line, tech separated by commas.
const emptyForm = {
  title: '',
  tagline: '',
  description: '',
  featuresText: '',
  techText: '',
  githubUrl: '',
  liveUrl: '',
  status: 'In progress',
  order: 1,
};

export default function ProjectManager() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState(null); // null means the form is closed
  const [editingId, setEditingId] = useState(null); // null means we are adding a new project
  const [saving, setSaving] = useState(false);

  async function loadProjects() {
    try {
      const { data } = await api.get('/projects');
      setProjects(data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  function openNew() {
    setEditingId(null);
    setForm({ ...emptyForm, order: projects.length + 1 });
    setError('');
  }

  function openEdit(project) {
    setEditingId(project._id);
    setForm({
      title: project.title,
      tagline: project.tagline,
      description: project.description,
      featuresText: project.features.join('\n'),
      techText: project.techStack.join(', '),
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl,
      status: project.status,
      order: project.order,
    });
    setError('');
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError('');

    // Convert the form text back into the shape the API expects
    const payload = {
      title: form.title,
      tagline: form.tagline,
      description: form.description,
      features: form.featuresText.split('\n').map((s) => s.trim()).filter(Boolean),
      techStack: form.techText.split(',').map((s) => s.trim()).filter(Boolean),
      githubUrl: form.githubUrl,
      liveUrl: form.liveUrl,
      status: form.status,
      order: Number(form.order) || 0,
    };

    try {
      if (editingId) {
        await api.put(`/projects/${editingId}`, payload);
      } else {
        await api.post('/projects', payload);
      }
      setForm(null);
      await loadProjects();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(project) {
    if (!window.confirm(`Delete "${project.title}"?`)) return;
    try {
      await api.delete(`/projects/${project._id}`);
      await loadProjects();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }

  if (loading) return <p className="text-muted-foreground">Loading projects...</p>;

  return (
    <div>
      {error && <p role="alert" className="mb-4 text-sm text-destructive">{error}</p>}

      {form ? (
        <form onSubmit={handleSubmit} className="max-w-2xl space-y-4 rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold">{editingId ? 'Edit project' : 'Add project'}</h2>

          <div>
            <label htmlFor="title" className="label">Title</label>
            <input id="title" name="title" value={form.title} onChange={handleChange} className="input" required />
          </div>
          <div>
            <label htmlFor="tagline" className="label">Tagline</label>
            <input id="tagline" name="tagline" value={form.tagline} onChange={handleChange} className="input" required />
          </div>
          <div>
            <label htmlFor="description" className="label">Description</label>
            <textarea id="description" name="description" rows="4" value={form.description} onChange={handleChange} className="input" required />
          </div>
          <div>
            <label htmlFor="featuresText" className="label">Features (one per line)</label>
            <textarea id="featuresText" name="featuresText" rows="5" value={form.featuresText} onChange={handleChange} className="input" />
          </div>
          <div>
            <label htmlFor="techText" className="label">Tech stack (separate with commas)</label>
            <input id="techText" name="techText" value={form.techText} onChange={handleChange} className="input" placeholder="React, Node.js, MongoDB" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="githubUrl" className="label">GitHub link</label>
              <input id="githubUrl" name="githubUrl" type="url" value={form.githubUrl} onChange={handleChange} className="input" placeholder="https://github.com/..." />
            </div>
            <div>
              <label htmlFor="liveUrl" className="label">Live site link</label>
              <input id="liveUrl" name="liveUrl" type="url" value={form.liveUrl} onChange={handleChange} className="input" placeholder="https://..." />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="status" className="label">Status</label>
              <select id="status" name="status" value={form.status} onChange={handleChange} className="input">
                <option>In progress</option>
                <option>Completed</option>
              </select>
            </div>
            <div>
              <label htmlFor="order" className="label">Position (1 shows first)</label>
              <input id="order" name="order" type="number" value={form.order} onChange={handleChange} className="input" />
            </div>
          </div>

          <div className="flex gap-3">
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving...' : 'Save project'}
            </button>
            <button type="button" className="btn btn-outline" onClick={() => setForm(null)}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <button type="button" onClick={openNew} className="btn btn-primary mb-6">Add project</button>
          {projects.length === 0 && <p className="text-muted-foreground">No projects yet.</p>}
          <ul className="space-y-3">
            {projects.map((project) => (
              <li key={project._id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card p-4">
                <div>
                  <p className="font-medium">{project.title}</p>
                  <p className="text-sm text-muted-foreground">{project.tagline}</p>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => openEdit(project)} className="btn btn-outline px-3 py-1.5">Edit</button>
                  <button type="button" onClick={() => handleDelete(project)} className="btn btn-danger px-3 py-1.5">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
