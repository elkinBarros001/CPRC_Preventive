import React, { useState } from 'react';
import { DiagnosticModule } from './components/DiagnosticModule';
import { PhishingSimulator } from './components/PhishingSimulator';
import { BestPracticesHub } from './components/BestPracticesHub';

function App() {
  const [currentTab, setCurrentTab] = useState<'diagnostic' | 'simulator' | 'hub'>('diagnostic');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', paddingBottom: '40px' }}>
      <header style={{ backgroundColor: '#0f172a', color: '#fff', padding: '20px 0', textAlign: 'center' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'extrabold', margin: 0 }}>CPRC Preventive App</h1>
        <p style={{ fontSize: '14px', color: '#94a3b8', margin: '5px 0 15px 0' }}>Herramienta de alfabetización y diagnóstico de ciberseguridad</p>
        
        <nav style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
          <button 
            onClick={() => setCurrentTab('diagnostic')}
            style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', backgroundColor: currentTab === 'diagnostic' ? '#2563eb' : '#334155', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Diagnóstico (RF1)
          </button>
          <button 
            onClick={() => setCurrentTab('simulator')}
            style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', backgroundColor: currentTab === 'simulator' ? '#2563eb' : '#334155', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Simulador (RF2)
          </button>
          <button 
            onClick={() => setCurrentTab('hub')}
            style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', backgroundColor: currentTab === 'hub' ? '#2563eb' : '#334155', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Buenas Prácticas (RF3)
          </button>
        </nav>
      </header>

      <main style={{ padding: '20px' }}>
        {currentTab === 'diagnostic' && <DiagnosticModule />}
        {currentTab === 'simulator' && <PhishingSimulator />}
        {currentTab === 'hub' && <BestPracticesHub />}
      </main>
    </div>
  );
}

export default App;