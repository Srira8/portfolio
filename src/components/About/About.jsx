import { summary, stats, personal, education } from '../../data/portfolioData'
import styles from './About.module.css'

export default function About() {
  return (
    <section id="about" className={`section ${styles.about}`}>
      <div className="container">

        <p className={styles.sectionLabel}>About me</p>
        <h2 className="section-title">Background & Experience</h2>
        <div className="divider" />

        <div className={styles.grid}>

          {/* ── Left: Summary ── */}
          <div className={styles.left}>
            {summary.map((para, i) => (
              <p key={i} className={styles.para}>{para}</p>
            ))}

            <div className={styles.infoRows}>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Location</span>
                <span className={styles.infoValue}>{personal.location}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Education</span>
                <span className={styles.infoValue}>{education.degree}, {education.school}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Graduated</span>
                <span className={styles.infoValue}>{education.graduated}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Email</span>
                <a href={`mailto:${personal.email}`} className={styles.infoLink}>{personal.email}</a>
              </div>
            </div>
          </div>

          {/* ── Right: Stat cards ── */}
          <div className={styles.statsGrid}>
            {stats.map(({ value, label }) => (
              <div key={label} className={styles.statCard}>
                <span className={styles.statValue}>{value}</span>
                <span className={styles.statLabel}>{label}</span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}
