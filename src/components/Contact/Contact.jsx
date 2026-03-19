import { personal } from '../../data/portfolioData'
import styles from './Contact.module.css'

const links = [
  {
    label: 'Email',
    value: personal.email,
    href: `mailto:${personal.email}`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'sriramkrishna-dev',
    href: personal.linkedin,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  ...personal.github.map(({ label, url }) => ({
    label: 'GitHub',
    value: label,
    href: url,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>
      </svg>
    ),
  })),
]

export default function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      <div className={`container ${styles.inner}`}>

        {/* ── Heading block ── */}
        <div className={styles.heading}>
          <p className={styles.sectionLabel}>Get in touch</p>
          <h2 className={styles.title}>Let's work together</h2>
          <p className={styles.tagline}>
            I'm open to full-time roles, contract work, and research collaborations
            in AI, ML, and cloud-native engineering. Feel free to reach out.
          </p>
        </div>

        {/* ── Link cards ── */}
        <div className={styles.links}>
          {links.map(({ label, value, href, icon }) => (
            <a key={href} href={href} className={styles.linkCard} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noreferrer">
              <span className={styles.linkIcon}>{icon}</span>
              <span className={styles.linkText}>
                <span className={styles.linkLabel}>{label}</span>
                <span className={styles.linkValue}>{value}</span>
              </span>
              <svg className={styles.arrow} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17 17 7M7 7h10v10"/>
              </svg>
            </a>
          ))}

        </div>

      </div>

      {/* ── Footer ── */}
      <div className={styles.footer}>
        <p>© {new Date().getFullYear()} Sriram Krishna · Seattle, WA</p>
      </div>
    </section>
  )
}
