// All the text about YOU lives here. Edit this file to change the page.
// (Projects are not here. They come from the database and you edit them in the admin page.)
const profile = {
  name: 'Amit',
  github: 'https://github.com/amitkumar-v',

  intro:
    'I am a third-year B.Sc. IT student in Mumbai. My project include: a CRM that helps a small business follow up with its leads, and an AI support desk that answers customer questions from a company\'s own FAQs.',

  facts: [
    { label: 'Location', value: 'Kandivali East, Mumbai' },
    { label: 'Studying', value: 'B.Sc. IT, graduating 2027' },
    { label: 'Looking for', value: 'Internship/Part-time job' },
  ],

  about: [
    'Full-stack web developer focused on building reliable web applications from the ground up. I enjoy working across the stack—structuring schemas, connecting APIs, and making sure the frontend feels effortless to use.',
    'Lately, my work has centered on customer-facing tools designed to cut down on manual work and keep daily operations running smoothly.'
  ],

  education: [
    {
      title: 'B.Sc. IT',
      place: 'KES Shroff College of Arts & Commerce, University of Mumbai',
      period: '2024 to 2027',
      note: 'SGPA 8.0',
    },
    {
      title: 'HSC',
      place: 'KES Shroff College of Arts & Commerce',
      period: '2024',
      note: '82.33%',
    },
  ],

  experience: [
    {
      title: 'Computer & Documentation Assistant',
      place: 'Quick Help CSC Centre, Poisar, Kandivali East',
      period: '6 months',
      note: '',
    },
  ],

  skills: [
    { group: 'Frontend', items: ['React', 'JavaScript', 'Tailwind CSS', 'HTML', 'CSS'] },
    { group: 'Backend', items: ['Node.js', 'Express', 'REST APIs', 'JWT authentication'] },
    { group: 'Database', items: ['MongoDB', 'Mongoose'] },
    { group: 'Tools', items: ['Git', 'GitHub'] },
  ],
};

export default profile;
