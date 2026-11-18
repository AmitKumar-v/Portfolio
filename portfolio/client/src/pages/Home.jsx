import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

// The public page. Each section is its own component.
export default function Home() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-5">
        <Hero />
        <Projects />
        <About />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
