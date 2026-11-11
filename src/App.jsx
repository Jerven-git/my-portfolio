import './index.css';
import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import AIDevelopment from './components/AIDevelopment';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MissionGridCampaign from './components/MissionGridCampaign';
import PixelPortalTransition from './components/PixelPortalTransition';
import { useIsPlayful } from './usePlayfulMode';

function App() {
  const playful = useIsPlayful();

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-canvas text-ink">
        <PixelPortalTransition />
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          <Hero />
          <Services />
          <AIDevelopment />
          {playful ? (
            <MissionGridCampaign />
          ) : (
            <>
              <Projects />
              <About />
            </>
          )}
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}

export default App;
