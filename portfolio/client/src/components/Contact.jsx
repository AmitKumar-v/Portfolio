import { useState } from 'react';
import api, { getErrorMessage } from '../api/client';
import Section from './Section';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');

  // One handler for all three inputs: the input's "name" tells us which field to update
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    setError('');
    try {
      await api.post('/messages', form);
      setForm({ name: '', email: '', message: '' });
      setStatus('sent');
    } catch (err) {
      setError(getErrorMessage(err));
      setStatus('error');
    }
  }

  return (
    <Section id="contact" title="Contact">
      <p className="max-w-xl leading-relaxed text-muted-foreground">
        Have a question or an internship opening? Send me a message and I will reply by email.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 max-w-xl space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="label">Name</label>
            <input id="name" name="name" value={form.name} onChange={handleChange} className="input" required />
          </div>
          <div>
            <label htmlFor="email" className="label">Email</label>
            <input id="email" name="email" type="email" value={form.email} onChange={handleChange} className="input" required />
          </div>
        </div>
        <div>
          <label htmlFor="message" className="label">Message</label>
          <textarea id="message" name="message" rows="5" value={form.message} onChange={handleChange} className="input" required />
        </div>

        {status === 'sent' && (
          <p role="status" className="text-sm">Message sent. Thank you, I will get back to you soon.</p>
        )}
        {status === 'error' && (
          <p role="alert" className="text-sm text-destructive">{error}</p>
        )}

        <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending...' : 'Send message'}
        </button>
      </form>
    </Section>
  );
}
