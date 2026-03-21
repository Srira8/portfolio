import { projects } from '../../data/portfolioData'
import styles from './Projects.module.css'

export default function Projects() {
  return (
    <section id="projects" className={`section ${styles.projects}`}>
      <div className="container">

        <p className={styles.sectionLabel}>What I've built</p>
        <h2 className="section-title">Projects</h2>
        <div className="divider" />

        <div className={styles.grid}>
          {projects.map(({ type, title, description, tech, github }) => (
            <div key={title} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.type}>{type}</span>
                {github && (
                  <a href={github} target="_blank" rel="noreferrer" className={styles.githubLink} aria-label="View on GitHub">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>
                    </svg>
                    GitHub
                  </a>
                )}
              </div>
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.description}>{description}</p>
              <div className={styles.tech}>
                {tech.map(t => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
