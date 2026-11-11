import { Flag } from 'lucide-react';
import databasyInterface from '../../assets/plates/databasy-interface.png';
import projectPaper from '../../assets/plates/project-paper.png';
import { featuredProjects } from '../content/projects';

export default function MissionGridProject() {
  const project = featuredProjects.find((item) => item.id === 'databasy-platform');

  return (
    <section id="projects" className="mission-dossier mission-project" style={{ '--mission-paper-texture': `url(${projectPaper})` }} aria-labelledby="mission-project-title">
      <header className="mission-dossier__header"><Flag aria-hidden="true" /><h2 id="mission-project-title">MISSION 01 / PROJECTS</h2><span aria-hidden="true" /></header>
      <div className="mission-project__layout">
        <figure className="mission-dossier__primary-visual">
          <img src={databasyInterface} alt="Illustrative DATABASY storefront and operational workspace interface" loading="lazy" />
          <figcaption>Illustrative interface</figcaption>
        </figure>
        <div className="mission-dossier__copy">
          <h3>{project.name}</h3>
          <p className="mission-project__statement">{project.statement}</p>
          <p>{project.description}</p>
          <dl className="featured-project__facts">
            <div><dt>Problem</dt><dd>{project.problem}</dd></div>
            <div><dt>Use</dt><dd>{project.application}</dd></div>
            <div><dt>Role</dt><dd>{project.role}</dd></div>
            <div><dt>System</dt><dd>{project.system}</dd></div>
            <div><dt>Delivery</dt><dd>{project.delivery}</dd></div>
          </dl>
          <ul className="featured-project__proof" aria-label="DATABASY project highlights">{project.proof.map((feature) => <li key={feature}>{feature}</li>)}</ul>
          <p className="mission-project__status">Private product build</p>
        </div>
      </div>
    </section>
  );
}
