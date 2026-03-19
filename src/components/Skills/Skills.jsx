import { skills } from '../../data/portfolioData'
import styles from './Skills.module.css'

export default function Skills() {
  return (
    <section id="skills" className={`section ${styles.skills}`}>
      <div className="container">

        <p className={styles.sectionLabel}>What I work with</p>
        <h2 className="section-title">Skills & Technologies</h2>
        <div className="divider" />

        <div className={styles.grid}>
          {skills.map(({ category, tags }) => (
            <div key={category} className={styles.group}>
              <h3 className={styles.category}>{category}</h3>
              <div className={styles.tags}>
                {tags.map(tag => (
                  <span key={tag} className={`tag ${styles.tag}`}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
