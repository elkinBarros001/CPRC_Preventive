import { DiagnosticModule } from './components/DiagnosticModule';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-blue-900">CPRC Preventive App</h1>
        <p className="text-slate-600">Herramienta de alfabetización y diagnóstico de ciberseguridad</p>
      </header>
      <main>
        {/* Renderiza el módulo de diagnóstico (RF1) */}
        <DiagnosticModule />
      </main>
    </div>
  );
}

export default App;