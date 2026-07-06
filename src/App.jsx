import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import AIDevelopment from './components/AIDevelopment';
import CV from './components/CV';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-100">
      <Navbar />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <AIDevelopment />
        <CV />
      </main>
      <Footer />
    </div>
  );
}

export default App;
