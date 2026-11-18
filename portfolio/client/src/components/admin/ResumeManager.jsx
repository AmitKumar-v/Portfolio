import { useEffect, useState } from 'react';
import api, { getErrorMessage, resumeDownloadUrl } from '../../api/client';

export default function ResumeManager() {
  const [info, setInfo] = useState(null); // null while loading
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  async function loadInfo() {
    try {
      const { data } = await api.get('/resume');
      setInfo(data);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }

  useEffect(() => {
    loadInfo();
  }, []);

  async function handleUpload(e) {
    e.preventDefault();
    if (!file) {
      setError('Please choose a PDF file first');
      return;
    }
    setUploading(true);
    setError('');
    setMessage('');

    // Files are sent as FormData, not JSON. "resume" must match upload.single('resume') on the server.
    const formData = new FormData();
    formData.append('resume', file);

    try {
      await api.post('/resume', formData);
      setMessage('Resume updated. The download button on your site now gives this file.');
      setFile(null);
      e.target.reset(); // clears the file input
      await loadInfo();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm('Delete the resume? The download button will disappear from your site.')) return;
    setError('');
    setMessage('');
    try {
      await api.delete('/resume');
      await loadInfo();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }

  if (!info) return <p className="text-muted-foreground">Loading resume...</p>;

  return (
    <div className="max-w-xl">
      <h2 className="text-lg font-semibold">Current resume</h2>

      {info.exists ? (
        <div className="mt-3 rounded-lg border border-border bg-card p-4">
          <p className="font-medium">{info.filename}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {Math.round(info.size / 1024)} KB, uploaded {new Date(info.updatedAt).toLocaleString()}
          </p>
          <div className="mt-4 flex gap-3">
            <a href={resumeDownloadUrl} className="btn btn-outline px-3 py-1.5">Download</a>
            <button type="button" onClick={handleDelete} className="btn btn-danger px-3 py-1.5">Delete</button>
          </div>
        </div>
      ) : (
        <p className="mt-3 text-muted-foreground">No resume uploaded yet. The download button is hidden on your site.</p>
      )}

      <form onSubmit={handleUpload} className="mt-8 space-y-4">
        <div>
          <label htmlFor="resume" className="label">{info.exists ? 'Replace with a new PDF' : 'Upload a PDF'}</label>
          <input
            id="resume"
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0] || null)}
            className="input file:mr-3 file:rounded file:border-0 file:bg-secondary file:px-3 file:py-1 file:text-sm file:text-secondary-foreground"
          />
          <p className="mt-1.5 text-xs text-muted-foreground">PDF only, up to 2 MB.</p>
        </div>

        {message && <p role="status" className="text-sm">{message}</p>}
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}

        <button type="submit" className="btn btn-primary" disabled={uploading}>
          {uploading ? 'Uploading...' : info.exists ? 'Replace resume' : 'Upload resume'}
        </button>
      </form>
    </div>
  );
}
