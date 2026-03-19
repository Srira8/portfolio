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
          {projects.map(({ type, title, description, tech }) => (
            <div key={title} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.type}>{type}</span>
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
