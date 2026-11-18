import Section from './Section';
import profile from '../data/profile';

// A simple list used for both education and experience
function List({ title, items }) {
  return (
    <div className="mt-10">
      <h3 className="font-medium">{title}</h3>
      <ul className="mt-3 divide-y divide-border border-y border-border">
        {items.map((item) => (
          <li key={item.title} className="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between sm:gap-6">
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-muted-foreground">{item.place}</p>
            </div>
            <p className="text-sm text-muted-foreground sm:text-right">
              {item.period}
              {item.note && <span className="block">{item.note}</span>}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function About() {
  return (
    <Section id="about" title="About">
      <div className="max-w-xl space-y-4 leading-relaxed text-muted-foreground">
        {profile.about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <List title="Education" items={profile.education} />
      <List title="Experience" items={profile.experience} />

      <div className="mt-10">
        <h3 className="font-medium">Skills</h3>
        <dl className="mt-3 divide-y divide-border border-y border-border">
          {profile.skills.map((skill) => (
            <div key={skill.group} className="flex flex-col gap-2 py-3 sm:flex-row sm:gap-6">
              <dt className="w-28 shrink-0 text-sm text-muted-foreground">{skill.group}</dt>
              <dd className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span key={item} className="tag">
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
