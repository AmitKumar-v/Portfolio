import { useEffect, useState } from 'react';
import api, { resumeDownloadUrl } from '../api/client';
import profile from '../data/profile';

export default function Hero() {
  const [hasResume, setHasResume] = useState(false);

  // Ask the API if a resume has been uploaded. Show the button only if it has.
  useEffect(() => {
    api
      .get('/resume')
      .then((res) => setHasResume(res.data.exists))
      .catch(() => setHasResume(false));
  }, []);

  return (
    <section id="top" className="py-16 sm:py-24">
      <h1 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
        I'm {profile.name}. I build full-stack web apps with the MERN stack.
      </h1>
      <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">{profile.intro}</p>

      <div className="mt-8 flex flex-wrap gap-3">
        <a href="#projects" className="btn btn-primary">
          View projects
        </a>
        <a href="#contact" className="btn btn-outline">
          Contact me
        </a>
        {hasResume && (
          <a href={resumeDownloadUrl} className="btn btn-outline">
            Download resume
          </a>
        )}
        <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn-outline">
          GitHub
        </a>
      </div>

      <dl className="mt-12 grid gap-4 border-t border-border pt-6 text-sm sm:grid-cols-3">
        {profile.facts.map((fact) => (
          <div key={fact.label}>
            <dt className="text-muted-foreground">{fact.label}</dt>
            <dd className="mt-1 font-medium">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
