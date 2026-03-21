import { useState } from 'react'
import styles from '../AILab.module.css'

const SUGGESTIONS = [
  'What MCP and Agentic AI work has Sriram done?',
  'What cloud platforms does Sriram know?',
  'Tell me about his RAG projects',
  'What was his highest impact achievement?',
]

const STATUS_ICON = { thinking: '⟳', working: '⟳', done: '✓' }
const STATUS_CLASS = { thinking: styles.stepThinking, working: styles.stepWorking, done: styles.stepDone }

export default function MultiAgent() {
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)
  const [steps, setSteps] = useState([])
  const [answer, setAnswer] = useState('')
  const [error, setError] = useState('')

  async function handleAsk(q) {
    const query = q || question
    if (!query.trim()) return
    setLoading(true)
    setSteps([])
    setAnswer('')
    setError('')

    try {
      const res = await fetch('/api/multi-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: query }),
      })
      const data = await res.json()
      if (data.error) { setError(data.error); return }
      setSteps(data.steps || [])
      setAnswer(data.answer || '')
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.tabContent}>
      <p className={styles.tabIntro}>
        Ask anything about Sriram's portfolio. Watch the <strong>Orchestrator</strong> route your question to specialist agents — Experience, Projects, Skills — then synthesize a final answer. This mirrors the Semantic Kernel + MCP architecture built in production.
      </p>

      {/* Suggestions */}
      <div className={styles.suggestions}>
        {SUGGESTIONS.map(s => (
          <button key={s} className={styles.suggestion} onClick={() => { setQuestion(s); handleAsk(s) }}>
            {s}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className={styles.inputRow}>
        <input
          className={styles.input}
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="Ask about experience, projects, skills..."
          onKeyDown={e => e.key === 'Enter' && handleAsk()}
          disabled={loading}
        />
        <button className={styles.sendBtn} onClick={() => handleAsk()} disabled={loading || !question.trim()}>
          {loading ? '...' : 'Ask'}
        </button>
      </div>

      {/* Agent trace */}
      {(steps.length > 0 || loading) && (
        <div className={styles.trace}>
          <p className={styles.traceLabel}>Agent Trace</p>
          {steps.map((step, i) => (
            <div key={i} className={`${styles.step} ${STATUS_CLASS[step.status]}`}>
              <span className={styles.stepIcon}>{STATUS_ICON[step.status]}</span>
              <span className={styles.stepAgent}>{step.agent}</span>
              <span className={styles.stepMsg}>{step.message}</span>
            </div>
          ))}
          {loading && (
            <div className={`${styles.step} ${styles.stepThinking}`}>
              <span className={styles.stepIcon}>⟳</span>
              <span className={styles.stepAgent}>Orchestrator</span>
              <span className={styles.stepMsg}>Working...</span>
            </div>
          )}
        </div>
      )}

      {/* Answer */}
      {answer && (
        <div className={styles.answer}>
          <p className={styles.answerLabel}>Answer</p>
          <p className={styles.answerText}>{answer}</p>
        </div>
      )}

      {error && <p className={styles.errorMsg}>{error}</p>}
    </div>
  )
}
