import { useState, useEffect, useRef } from 'react'
import styles from '../AILab.module.css'

const SUGGESTIONS = [
  "How does Sriram's MCP architecture compare to traditional microservices?",
  'What makes Sriram uniquely qualified for a Gen AI role?',
  'What is the strongest evidence of his technical depth?',
  'How would Sriram approach building a RAG system from scratch?',
]

function TypewriterText({ text, speed = 8 }) {
  const [displayed, setDisplayed] = useState('')
  const idx = useRef(0)

  useEffect(() => {
    setDisplayed('')
    idx.current = 0
    if (!text) return
    const interval = setInterval(() => {
      if (idx.current < text.length) {
        setDisplayed(text.slice(0, idx.current + 1))
        idx.current++
      } else {
        clearInterval(interval)
      }
    }, speed)
    return () => clearInterval(interval)
  }, [text, speed])

  return <>{displayed}</>
}

function NeuralLoader() {
  return (
    <div className={styles.neuralLoader}>
      <div className={styles.neuralRing} />
      <div className={`${styles.neuralRing} ${styles.neuralRing2}`} />
      <div className={`${styles.neuralRing} ${styles.neuralRing3}`} />
      <span className={styles.neuralIcon}>🧠</span>
    </div>
  )
}

export default function DeepThink() {
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)
  const [thinking, setThinking] = useState('')
  const [answer, setAnswer] = useState('')
  const [error, setError] = useState('')
  const [phase, setPhase] = useState('idle') // idle | loading | thinking | answer

  async function handleAsk(q) {
    const query = q || question
    if (!query.trim()) return
    setLoading(true)
    setPhase('loading')
    setThinking('')
    setAnswer('')
    setError('')

    try {
      const res = await fetch('/api/think', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: query }),
      })
      const data = await res.json()
      if (data.error) { setError(data.error); setPhase('idle'); return }
      setThinking(data.thinking || '')
      setAnswer(data.answer || '')
      setPhase('thinking')
      setTimeout(() => setPhase('answer'), Math.min((data.thinking?.length || 0) * 8 + 500, 8000))
    } catch {
      setError('Network error. Please try again.')
      setPhase('idle')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.tabContent}>
      <p className={styles.tabIntro}>
        Powered by <strong>Claude's extended thinking</strong> — the model reasons through the problem step by step before answering.
        Watch the raw thought process, then see the final answer emerge.
      </p>

      <div className={styles.suggestions}>
        {SUGGESTIONS.map(s => (
          <button key={s} className={styles.suggestion} onClick={() => { setQuestion(s); handleAsk(s) }}>
            {s}
          </button>
        ))}
      </div>

      <div className={styles.inputRow}>
        <input
          className={styles.input}
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="Ask a complex question about Sriram..."
          onKeyDown={e => e.key === 'Enter' && handleAsk()}
          disabled={loading}
        />
        <button className={styles.sendBtn} onClick={() => handleAsk()} disabled={loading || !question.trim()}>
          {loading ? '...' : 'Think'}
        </button>
      </div>

      {phase === 'loading' && (
        <div className={styles.thinkingStage}>
          <NeuralLoader />
          <p className={styles.thinkingStatus}>Claude is reasoning deeply...</p>
          <div className={styles.thinkingDots}>
            <span /><span /><span />
          </div>
        </div>
      )}

      {(phase === 'thinking' || phase === 'answer') && thinking && (
        <div className={styles.thinkingTerminal}>
          <div className={styles.terminalHeader}>
            <span className={styles.terminalDot} style={{ background: '#ff5f57' }} />
            <span className={styles.terminalDot} style={{ background: '#febc2e' }} />
            <span className={styles.terminalDot} style={{ background: '#28c840' }} />
            <span className={styles.terminalTitle}>💭 claude_thinking.log</span>
          </div>
          <pre className={styles.terminalBody}>
            <TypewriterText text={thinking} speed={6} />
            <span className={styles.cursor}>▋</span>
          </pre>
        </div>
      )}

      {phase === 'answer' && answer && (
        <div className={`${styles.answer} ${styles.answerReveal}`}>
          <div className={styles.answerHeader}>
            <p className={styles.answerLabel}>✅ Final Answer</p>
          </div>
          <p className={styles.answerText} style={{ whiteSpace: 'pre-wrap' }}>
            <TypewriterText text={answer} speed={12} />
          </p>
        </div>
      )}

      {error && <p className={styles.errorMsg}>{error}</p>}
    </div>
  )
}
