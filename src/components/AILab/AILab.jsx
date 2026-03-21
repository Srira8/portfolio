import { useState } from 'react'
import MultiAgent from './tabs/MultiAgent'
import PitchGenerator from './tabs/PitchGenerator'
import DeepThink from './tabs/DeepThink'
import VoiceAssistant from './tabs/VoiceAssistant'
import styles from './AILab.module.css'

const TABS = [
  { id: 'multi-agent', label: 'Multi-Agent', icon: '🤖', desc: 'Watch agents collaborate in real time' },
  { id: 'pitch', label: 'Pitch Generator', icon: '🎯', desc: 'Generate a personalized hiring pitch' },
  { id: 'think', label: 'Deep Think', icon: '🧠', desc: "See Claude's raw reasoning process" },
  { id: 'voice', label: 'Voice', icon: '🎤', desc: 'Ask your portfolio a question by voice' },
]

export default function AILab() {
  const [activeTab, setActiveTab] = useState('multi-agent')

  return (
    <section id="ai-lab" className={`section ${styles.aiLab}`}>
      <div className="container">

        <p className={styles.sectionLabel}>Interactive Demo</p>
        <h2 className="section-title">Intelligence Lab</h2>
        <p className={styles.subtitle}>
          A live showcase of Agentic AI, RAG, extended thinking, and voice — the same patterns used in production.
        </p>
        <div className="divider" />

        {/* ── Tabs ── */}
        <div className={styles.tabs}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className={styles.tabIcon}>{tab.icon}</span>
              <span className={styles.tabLabel}>{tab.label}</span>
              <span className={styles.tabDesc}>{tab.desc}</span>
            </button>
          ))}
        </div>

        {/* ── Tab Content ── */}
        <div className={styles.panel}>
          {activeTab === 'multi-agent' && <MultiAgent />}
          {activeTab === 'pitch' && <PitchGenerator />}
          {activeTab === 'think' && <DeepThink />}
          {activeTab === 'voice' && <VoiceAssistant />}
        </div>

      </div>
    </section>
  )
}
