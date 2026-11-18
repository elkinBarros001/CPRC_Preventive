import { saveDiagnosticResultAnonymously } from '../services/firebase';
import React, { useState } from 'react';

export interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    score: number;
  }[];
}

export interface DiagnosticResult {
  totalScore: number;
  riskLevel: 'Bajo' | 'Medio' | 'Alto';
  feedback: string;
}

const questionsData: Question[] = [
  {
    id: 1,
    text: "¿Cómo actúas si recibes un mensaje urgente de tu banco solicitando verificar tus datos mediante un enlace?",
    options: [
      { text: "Hago clic de inmediato para evitar que bloqueen mi cuenta.", score: 2 },
      { text: "Respondo al mensaje preguntando si realmente son del banco.", score: 1 },
      { text: "Ignoro el enlace y llamo directamente a los canales oficiales del banco.", score: 0 }
    ]
  },
  {
    id: 2,
    text: "¿Qué es un 'deepfake' en el contexto de la ingeniería social potenciada por Inteligencia Artificial?",
    options: [
      { text: "Un software antivirus avanzado para detectar páginas maliciosas.", score: 2 },
      { text: "Un contenido multimedia (audio o video) manipulado por IA para suplantar la identidad de una persona.", score: 0 },
      { text: "Una falla temporal en las redes de telecomunicaciones.", score: 1 }
    ]
  },
  {
    id: 3,
    text: "Antes de ingresar tus credenciales en una página web que dice ser de una entidad conocida, ¿qué verificas habitualmente?",
    options: [
      { text: "Solo que la página cargue rápido y tenga buena apariencia visual.", score: 2 },
      { text: "Reviso detalladamente la URL en la barra de direcciones y los certificados de seguridad.", score: 0 },
      { text: "No suelo revisar nada si llegué allí a través de un buscador o anuncio.", score: 1 }
    ]
  },
  {
    id: 4,
    text: "¿Cuál es tu postura frente a la Autenticación de Dos Factores (2FA) en tus cuentas principales?",
    options: [
      { text: "La tengo activada en todas las cuentas críticas (correo, banco, redes sociales).", score: 0 },
      { text: "Me parece un proceso molesto y la evito siempre que puedo.", score: 2 },
      { text: "Solo la uso si el sistema me obliga obligatoriamente a configurarla.", score: 1 }
    ]
  },
  {
    id: 5,
    text: "Si recibes una llamada de un familiar pidiendo dinero urgente y notas su voz extraña o metálica, ¿qué haces?",
    options: [
      { text: "Envío el dinero rápido para ayudarle a resolver su emergencia.", score: 2 },
      { text: "Cuelgo e intento comunicarme con él/ella a su número personal conocido para verificar.", score: 0 },
      { text: "Le pido que me mande un audio de WhatsApp para confirmar que sea su voz.", score: 1 }
    ]
  },
  {
    id: 6,
    text: "¿Con qué frecuencia actualizas el sistema operativo y las aplicaciones de tus dispositivos?",
    options: [
      { text: "Nunca o casi nunca, solo cuando el equipo falla por completo.", score: 2 },
      { text: "Solo cuando el sistema me sale con avisos muy insistentes.", score: 1 },
      { text: "Mantengo las actualizaciones automáticas activadas o las instalo regularmente.", score: 0 }
    ]
  },
  {
    id: 7,
    text: "Recibes un SMS indicando que ganaste un premio y debes pagar un envío haciendo clic en un enlace acortado (ej. bit.ly). ¿Qué piensas?",
    options: [
      { text: "Es una gran oportunidad, probablemente sea un concurso legítimo.", score: 2 },
      { text: "Tengo dudas, pero a veces las marcas hacen este tipo de campañas.", score: 1 },
      { text: "Es un claro intento de phishing; las entidades legítimas no operan de esta forma.", score: 0 }
    ]
  },
  {
    id: 8,
    text: "¿Qué haces cuando identificas un correo o mensaje claramente fraudulento o de suplantación?",
    options: [
      { text: "Lo borro o lo ignoro sin prestarle más atención.", score: 1 },
      { text: "Lo reporto a las plataformas o entidades de control (como el CAI Virtual) y lo bloqueo.", score: 0 },
      { text: "Lo reenvío a mis contactos en redes sociales para advertirles.", score: 1 }
    ]
  },
  {
    id: 9,
    text: "¿Compartirías un código de verificación de 6 dígitos que te llegó por SMS con alguien que dice ser soporte técnico?",
    options: [
      { text: "Sí, si la persona suena muy profesional y trabaja en la empresa.", score: 2 },
      { text: "Solo si es un conocido de confianza que me lo pide por chat privado.", score: 1 },
      { text: "Nunca, los códigos de verificación son personales y confidenciales.", score: 0 }
    ]
  },
  {
    id: 10,
    text: "¿Qué tan probable consideras ser blanco de un ataque de ingeniería social o phishing en los próximos seis meses?",
    options: [
      { text: "Muy probable, por lo que aplico medidas preventivas de ciberseguridad constantemente.", score: 0 },
      { text: "Poco probable, los ciberdelincuentes siempre buscan a otras personas.", score: 2 },
      { text: "No lo había pensado, pero reconozco que el riesgo digital existe.", score: 1 }
    ]
  }
];

export const DiagnosticModule: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<DiagnosticResult | null>(null);

  const handleSelectOption = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    if (currentIndex + 1 < questionsData.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: number[]) => {
    const totalScore = finalAnswers.reduce((acc, curr) => acc + curr, 0);
    let riskLevel: 'Bajo' | 'Medio' | 'Alto' = 'Bajo';
    let feedback = "Tienes buenas prácticas de ciberseguridad.";

    if (totalScore > 12) {
      riskLevel = 'Alto';
      feedback = "Alto nivel de vulnerabilidad frente al phishing e ingeniería social con IA. Te recomendamos revisar el Hub de Buenas Prácticas.";
    } else if (totalScore > 6) {
      riskLevel = 'Medio';
      feedback = "Riesgo moderado. Conoces algunas señales de alerta, pero requieres mayor precaución.";
    }

    setResult({ totalScore, riskLevel, feedback });

    //guardado anonimo de resultado a Firebase
    saveDiagnosticResultAnonymously(totalScore, riskLevel);
  };

  const progressPercentage = ((currentIndex + 1) / questionsData.length) * 100;

  return (
    <div style={{
      maxWidth: '650px',
      margin: '40px auto',
      padding: '30px',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
      fontFamily: 'system-ui, sans-serif',
      color: '#1e293b'
    }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px', color: '#0f172a' }}>
        Módulo de Diagnóstico de Riesgo
      </h2>
      <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>
        CPRC Preventive - Evaluación de conocimientos y conductas
      </p>

      {!result ? (
        <div>
          {/* Barra de progreso */}
          <div style={{ width: '100%', backgroundColor: '#e2e8f0', height: '8px', borderRadius: '4px', marginBottom: '20px' }}>
            <div style={{ width: `${progressPercentage}%`, backgroundColor: '#2563eb', height: '8px', borderRadius: '4px', transition: 'width 0.3s ease' }}></div>
          </div>

          <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#2563eb' }}>
            Pregunta {currentIndex + 1} de {questionsData.length}
          </span>
          <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '12px 0 24px 0', color: '#334155' }}>
            {questionsData[currentIndex].text}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {questionsData[currentIndex].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectOption(option.score)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '16px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#f8fafc',
                  color: '#334155',
                  fontSize: '15px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#eff6ff';
                  e.currentTarget.style.borderColor = '#2563eb';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8fafc';
                  e.currentTarget.style.borderColor = '#cbd5e1';
                }}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '16px', color: '#0f172a' }}>
            Resultado de tu Diagnóstico
          </h3>
          <div style={{
            display: 'inline-block',
            padding: '8px 16px',
            borderRadius: '20px',
            color: '#ffffff',
            fontWeight: 'bold',
            marginBottom: '16px',
            backgroundColor: result.riskLevel === 'Alto' ? '#ef4444' : result.riskLevel === 'Medio' ? '#f59e0b' : '#22c55e'
          }}>
            Nivel de Riesgo: {result.riskLevel}
          </div>
          <p style={{ fontSize: '15px', color: '#475569', maxWidth: '450px', margin: '0 auto 24px auto' }}>
            {result.feedback}
          </p>
          <button
            onClick={() => { setCurrentIndex(0); setAnswers([]); setResult(null); }}
            style={{
              padding: '12px 24px',
              backgroundColor: '#2563eb',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Repetir Diagnóstico
          </button>
        </div>
      )}
    </div>
  );
};