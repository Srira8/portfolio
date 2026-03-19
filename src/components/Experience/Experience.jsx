import { experience } from '../../data/portfolioData'
import styles from './Experience.module.css'

export default function Experience() {
  return (
    <section id="experience" className={`section ${styles.experience}`}>
      <div className="container">

        <p className={styles.sectionLabel}>Where I've worked</p>
        <h2 className="section-title">Experience</h2>
        <div className="divider" />

        <div className={styles.timeline}>
          {experience.map(({ role, company, location, period, bullets }, i) => (
            <div key={i} className={styles.item}>

              {/* ── Timeline spine ── */}
              <div className={styles.spine}>
                <div className={styles.dot} />
                {i < experience.length - 1 && <div className={styles.line} />}
              </div>

              {/* ── Content ── */}
              <div className={styles.content}>
                <div className={styles.header}>
                  <div className={styles.headerLeft}>
                    <h3 className={styles.role}>{role}</h3>
                    <p className={styles.company}>{company} · {location}</p>
                  </div>
                  <span className={styles.period}>{period}</span>
                </div>

                <ul className={styles.bullets}>
                  {bullets.map((b, j) => (
                    <li key={j} className={styles.bullet}>
                      <span className={styles.bulletDot} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
