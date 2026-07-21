import './index.css';
import { Suspense, lazy } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useIsPlayful } from './usePlayfulMode';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import AIDevelopment from './components/AIDevelopment';
import CV from './components/CV';
import Footer from './components/Footer';

/* Lazy, so anime.js ships as its own chunk that only downloads once someone
   actually switches to playful mode. Statically imported it added ~21kb gzip
   to the bundle every visitor pays for, on a page PRODUCT.md says is read in
   about twenty seconds. Same treatment three.js gets in the hero. */
const PageBackdrop = lazy(() => import('./components/PageBackdrop'));

function App() {
  const playful = useIsPlayful();
  const reduced = useReducedMotion();

  return (
    <div className="min-h-screen bg-canvas text-ink">
      {/* Playful mode only, matching every other effect on the site: the
          crafted side is what a recruiter lands on and forwards. */}
      {playful && !reduced && (
        <Suspense fallback={null}>
          <PageBackdrop />
        </Suspense>
      )}
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
