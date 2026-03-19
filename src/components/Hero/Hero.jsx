import { personal, education } from '../../data/portfolioData'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={`container ${styles.inner}`}>

        {/* ── Left: Text content ── */}
        <div className={styles.content}>
          <h1 className={styles.name}>{personal.name}</h1>

          <p className={styles.role}>{personal.role}</p>

          <p className={styles.tagline}>{personal.tagline}</p>

          <div className={styles.meta}>
            <span className={styles.metaItem}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              {personal.location}
            </span>
            <span className={styles.metaDot} />
            <span className={styles.metaItem}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
              {education.degree} · {education.school}
            </span>
          </div>

          <div className={styles.ctas}>
            <a href="#contact" className="btn btn-primary">Get in touch</a>
            <a href="#projects" className="btn btn-outline">View my work</a>
          </div>
        </div>

        {/* ── Right: Avatar block ── */}
        <div className={styles.avatarWrap}>
          <div className={styles.avatarRing}>
            <div className={styles.avatar}>
              <span className={styles.avatarInitials}>{personal.initials}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Scroll cue */}
      <div className={styles.scrollCue}>
        <span>Scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  )
}
