// Run once with: npm run seed
// 1) creates your admin account  2) adds the two projects if there are none yet
import 'dotenv/config';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import User from './models/User.js';
import Project from './models/Project.js';

const projects = [
  {
    title: 'ClientFlow',
    tagline: 'Business CRM and lead management system',
    description:
      'A CRM for a small company that gets many customer enquiries. Instead of tracking leads in Excel or WhatsApp, employees manage every enquiry, follow-up and sale in one place, and the admin can see how the team is doing.',
    features: [
      'Login with admin and employee roles',
      'Add, edit and delete leads with a status from New to Converted or Lost',
      'Follow-up dates, call notes and full lead history',
      'Dashboard with total, new, converted and lost leads and conversion rate',
      'Search, filter by status and date, and sort',
      'Admin can manage employees, assign leads and view performance',
    ],
    techStack: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Recharts'],
    status: 'In progress',
    order: 1,
  },
  {
    title: 'SmartDesk',
    tagline: 'AI-powered customer support system',
    description:
      'A support desk for company websites. Visitors ask questions and get answers from the company\'s own FAQs. If the answer is not there, SmartDesk says so and lets the visitor create a support ticket for a human to handle.',
    features: [
      'Chat interface that stores conversation history',
      'Knowledge base where the admin adds approved FAQs',
      'AI answers only from approved information and never invents an answer',
      'Support tickets with Open, In Progress and Resolved status',
      'Admin dashboard with conversations, tickets and common questions',
      'AI ticket summaries, query categories and suggested replies',
    ],
    techStack: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'Gemini API', 'JWT'],
    status: 'In progress',
    order: 2,
  },
];

async function seed() {
  await connectDB();

  const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD in server/.env first');
    process.exit(1);
  }

  const email = ADMIN_EMAIL.toLowerCase().trim();
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    console.log('Admin already exists, skipping');
  } else {
    const hashed = await bcrypt.hash(ADMIN_PASSWORD, 10);
    await User.create({ email, password: hashed });
    console.log(`Admin created: ${email}`);
  }

  if ((await Project.countDocuments()) === 0) {
    await Project.insertMany(projects);
    console.log('Added 2 projects');
  } else {
    console.log('Projects already exist, skipping');
  }

  await mongoose.disconnect();
}

seed();
