import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import AIDevelopment from './components/AIDevelopment';
import CV from './components/CV';
import Footer from './components/Footer';
import MissionGridCampaign from './components/MissionGridCampaign';
import { useIsPlayful } from './usePlayfulMode';

function App() {
  const playful = useIsPlayful();

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Navbar />
      <main>
        <Hero />
        {playful ? (
          <MissionGridCampaign />
        ) : (
          <>
            <Projects />
            <About />
            <TechStack />
            <AIDevelopment />
            <CV />
          </>
        )}
      </main>
      {!playful && <Footer />}
    </div>
  );
}

export default App;
