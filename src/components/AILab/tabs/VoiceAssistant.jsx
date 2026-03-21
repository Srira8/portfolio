import { useState, useEffect, useRef } from 'react'
import styles from '../AILab.module.css'

export default function VoiceAssistant() {
  const [supported, setSupported] = useState(true)
  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [loading, setLoading] = useState(false)
  const [answer, setAnswer] = useState('')
  const [speaking, setSpeaking] = useState(false)
  const [error, setError] = useState('')
  const [waveActive, setWaveActive] = useState(false)
  const recognitionRef = useRef(null)

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setSupported(false)
    }
  }, [])

  function startListening() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.maxAlternatives = 1
    recognitionRef.current = recognition

    recognition.onstart = () => { setListening(true); setWaveActive(true); setTranscript(''); setAnswer(''); setError('') }
    recognition.onresult = (e) => setTranscript(e.results[0][0].transcript)
    recognition.onerror = (e) => { setError(`Speech error: ${e.error}`); setListening(false); setWaveActive(false) }
    recognition.onend = () => { setListening(false); setWaveActive(false) }
    recognition.start()
  }

  function stopListening() {
    recognitionRef.current?.stop()
    setListening(false)
    setWaveActive(false)
  }

  async function handleAsk() {
    if (!transcript.trim()) return
    setLoading(true)
    setAnswer('')
    setError('')

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content: transcript }] }),
      })
      const data = await res.json()
      if (data.error) { setError(data.error); return }
      // Show answer as text AND read it aloud
      setAnswer(data.reply || '')
      speakAnswer(data.reply || '')
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function speakAnswer(text) {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'
    utterance.rate = 0.95
    utterance.onstart = () => setSpeaking(true)
    utterance.onend = () => setSpeaking(false)
    window.speechSynthesis.speak(utterance)
  }

  function stopSpeaking() {
    window.speechSynthesis.cancel()
    setSpeaking(false)
  }

  if (!supported) {
    return (
      <div className={styles.tabContent}>
        <div className={styles.unsupported}>
          <span style={{ fontSize: '2rem' }}>🎤</span>
          <p>Voice recognition is not supported in this browser.</p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Try Chrome or Edge.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.tabContent}>
      <p className={styles.tabIntro}>
        Click the mic, speak your question — the answer is <strong>read aloud</strong> and shown as text below for reference. Runs entirely in the browser.
      </p>

      {/* Mic visualizer */}
      <div className={styles.voiceCenter}>
        <div className={`${styles.micRing} ${waveActive ? styles.micRingActive : ''}`}>
          <div className={`${styles.micRing2} ${waveActive ? styles.micRingActive2 : ''}`}>
            <button
              className={`${styles.micBtn} ${listening ? styles.micBtnActive : ''}`}
              onClick={listening ? stopListening : startListening}
              disabled={loading}
              aria-label={listening ? 'Stop listening' : 'Start listening'}
            >
              {listening ? (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="6" width="12" height="12" rx="2"/>
                </svg>
              ) : (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3Z"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                  <line x1="12" x2="12" y1="19" y2="22"/>
                </svg>
              )}
            </button>
          </div>
        </div>
        <p className={styles.voiceStatus}>
          {listening ? 'Listening... speak now' : loading ? 'Processing...' : speaking ? 'Speaking answer...' : 'Click mic to start'}
        </p>
      </div>

      {/* Transcript */}
      {transcript && (
        <div className={styles.transcriptBox}>
          <p className={styles.answerLabel}>You said</p>
          <p className={styles.transcriptText}>"{transcript}"</p>
          <div className={styles.transcriptActions}>
            <button className={styles.sendBtn} onClick={handleAsk} disabled={loading}>
              {loading ? 'Asking...' : 'Ask'}
            </button>
            <button className={styles.copyBtn} onClick={() => { setTranscript(''); setAnswer('') }}>Clear</button>
          </div>
        </div>
      )}

      {/* Written answer + read aloud controls */}
      {answer && (
        <div className={styles.answer}>
          <div className={styles.answerHeader}>
            <p className={styles.answerLabel}>Answer</p>
            {speaking
              ? <button className={styles.copyBtn} onClick={stopSpeaking}>⏹ Stop</button>
              : <button className={styles.copyBtn} onClick={() => speakAnswer(answer)}>🔊 Read again</button>
            }
          </div>
          <p className={styles.answerText}>{answer}</p>
        </div>
      )}

      {error && <p className={styles.errorMsg}>{error}</p>}
    </div>
  )
}
