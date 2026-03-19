import { useState, useRef, useEffect } from 'react'
import styles from './Chat.module.css'

const SUGGESTIONS = [
  'What has Sriram built?',
  'Tell me about the MCP & Agentic AI project',
  'Does he know AWS or Azure?',
  'What are his top skills?',
  'Where has he worked?',
  'What ML projects has he done?',
  'Is he open to new opportunities?',
  'How can I contact Sriram?',
]

export default function Chat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm Sriram's portfolio assistant. Ask me anything about his experience, skills, or projects." }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const inputRef = useRef(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  const send = async (text) => {
    const userMsg = text || input.trim()
    if (!userMsg || loading) return

    const newMessages = [...messages, { role: 'user', content: userMsg }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages
            .filter((m, i) => !(m.role === 'assistant' && i === 0))
            .map(({ role, content }) => ({ role, content }))
        }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply || data.error }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Something went wrong. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  const focusInput = () => {
    inputRef.current?.focus()
  }

  return (
    <>
      {/* ── Floating button ── */}
      <button
        className={`${styles.fab} ${open ? styles.fabOpen : ''}`}
        onClick={() => setOpen(v => !v)}
        aria-label="Chat"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        )}
      </button>

      {/* ── Chat panel ── */}
      {open && (
        <div className={styles.panel}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerAvatar}>SK</div>
            <div>
              <p className={styles.headerName}>Sriram's Assistant</p>
              <p className={styles.headerSub}>Powered by Claude AI</p>
            </div>
          </div>

          {/* Messages */}
          <div className={styles.messages}>
            {messages.map((m, i) => (
              <div key={i} className={`${styles.message} ${m.role === 'user' ? styles.user : styles.assistant}`}>
                {m.content}
              </div>
            ))}
            {loading && (
              <div className={`${styles.message} ${styles.assistant}`}>
                <span className={styles.typing}><span/><span/><span/></span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions — shown only on first load */}
          {messages.length === 1 && (
            <div className={styles.suggestions}>
              <p className={styles.suggestionsLabel}>Try asking:</p>
              {SUGGESTIONS.map(s => (
                <button key={s} className={styles.suggestion} onClick={() => send(s)}>{s}</button>
              ))}
              <button className={`${styles.suggestion} ${styles.suggestionOwn}`} onClick={focusInput}>
                ✏️ Ask your own question...
              </button>
            </div>
          )}

          {/* Input */}
          <div className={styles.inputRow}>
            <input
              ref={inputRef}
              className={styles.input}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Type any question..."
              disabled={loading}
            />
            <button className={styles.sendBtn} onClick={() => send()} disabled={loading || !input.trim()}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
