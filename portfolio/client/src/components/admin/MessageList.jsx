import { useEffect, useState } from 'react';
import api, { getErrorMessage } from '../../api/client';

export default function MessageList() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadMessages() {
    try {
      const { data } = await api.get('/messages');
      setMessages(data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMessages();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm('Delete this message?')) return;
    try {
      await api.delete(`/messages/${id}`);
      await loadMessages();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }

  if (loading) return <p className="text-muted-foreground">Loading messages...</p>;

  return (
    <div>
      {error && <p role="alert" className="mb-4 text-sm text-destructive">{error}</p>}
      {messages.length === 0 && <p className="text-muted-foreground">No messages yet.</p>}
      <ul className="space-y-4">
        {messages.map((m) => (
          <li key={m._id} className="rounded-lg border border-border bg-card p-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-medium">{m.name}</p>
                <a href={`mailto:${m.email}`} className="text-sm text-link underline underline-offset-4">{m.email}</a>
              </div>
              <p className="text-xs text-muted-foreground">{new Date(m.createdAt).toLocaleString()}</p>
            </div>
            <p className="mt-3 whitespace-pre-wrap text-sm">{m.message}</p>
            <button type="button" onClick={() => handleDelete(m._id)} className="btn btn-danger mt-4 px-3 py-1.5">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
