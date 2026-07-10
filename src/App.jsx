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
    <div className="min-h-screen bg-canvas text-ink">
      <Navbar />
      <main>
        <Hero />

        {/* Not yet migrated to the vermilion system. data-legacy keeps them on
            the old dark tokens so they stay coherent until each is redesigned;
            remove the wrapper as sections move across. */}
        <div data-legacy>
          <About />
          <TechStack />
          <Projects />
          <AIDevelopment />
          <CV />
        </div>
      </main>
      <div data-legacy>
        <Footer />
      </div>
    </div>
  );
}

export default App;
