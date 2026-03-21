import { useState } from 'react'
import styles from '../AILab.module.css'

const EXAMPLES = [
  { company: 'Microsoft', role: 'Senior AI Engineer' },
  { company: 'Google DeepMind', role: 'ML Engineer' },
  { company: 'Amazon', role: 'Applied Scientist' },
  { company: 'Anthropic', role: 'Software Engineer' },
]

export default function PitchGenerator() {
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [pitch, setPitch] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  async function handleGenerate() {
    if (!company.trim() || !role.trim()) return
    setLoading(true)
    setPitch('')
    setError('')
    setCopied(false)

    try {
      const res = await fetch('/api/pitch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company, role, description }),
      })
      const data = await res.json()
      if (data.error) { setError(data.error); return }
      setPitch(data.pitch || '')
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(pitch)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function fillExample(ex) {
    setCompany(ex.company)
    setRole(ex.role)
  }

  return (
    <div className={styles.tabContent}>
      <p className={styles.tabIntro}>
        Enter a company and role — the AI generates a <strong>personalized pitch</strong> for why Sriram is the right hire, matching his specific experience and projects to the position.
      </p>

      {/* Quick examples */}
      <div className={styles.suggestions}>
        {EXAMPLES.map(ex => (
          <button key={ex.company} className={styles.suggestion} onClick={() => fillExample(ex)}>
            {ex.role} @ {ex.company}
          </button>
        ))}
      </div>

      {/* Form */}
      <div className={styles.pitchForm}>
        <div className={styles.pitchRow}>
          <div className={styles.pitchField}>
            <label className={styles.fieldLabel}>Company *</label>
            <input
              className={styles.input}
              value={company}
              onChange={e => setCompany(e.target.value)}
              placeholder="e.g. Microsoft"
              disabled={loading}
            />
          </div>
          <div className={styles.pitchField}>
            <label className={styles.fieldLabel}>Role *</label>
            <input
              className={styles.input}
              value={role}
              onChange={e => setRole(e.target.value)}
              placeholder="e.g. Senior AI Engineer"
              disabled={loading}
            />
          </div>
        </div>
        <div className={styles.pitchField}>
          <label className={styles.fieldLabel}>Job description / context (optional)</label>
          <textarea
            className={`${styles.input} ${styles.textarea}`}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Paste key requirements or context about the role..."
            rows={3}
            disabled={loading}
          />
        </div>
        <button
          className={styles.sendBtn}
          onClick={handleGenerate}
          disabled={loading || !company.trim() || !role.trim()}
        >
          {loading ? 'Generating...' : 'Generate Pitch'}
        </button>
      </div>

      {/* Result */}
      {pitch && (
        <div className={styles.answer}>
          <div className={styles.answerHeader}>
            <p className={styles.answerLabel}>Generated Pitch — {role} at {company}</p>
            <button className={styles.copyBtn} onClick={handleCopy}>
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          </div>
          <p className={styles.answerText} style={{ whiteSpace: 'pre-wrap' }}>{pitch}</p>
        </div>
      )}

      {error && <p className={styles.errorMsg}>{error}</p>}
    </div>
  )
}
