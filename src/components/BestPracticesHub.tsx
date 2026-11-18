import React from 'react';

export const BestPracticesHub: React.FC = () => {
  const cards = [
    {
      title: "Autenticación en Dos Pasos (2FA)",
      desc: "Añade una capa extra de seguridad combinando algo que sabes (contraseña) y algo que tienes (código en app o SMS).",
      tips: ["Usa apps como Google Authenticator o Authy", "Evita depender solo de SMS si es posible", "Nunca compartas tus códigos de respaldo"]
    },
    {
      title: "Gestión Segura de Contraseñas",
      desc: "Evita usar la misma clave en múltiples servicios y diseña contraseñas robustas y difíciles de adivinar.",
      tips: ["Usa frases largas de al menos 12 caracteres", "Combina símbolos, números y mayúsculas", "Apóyate en un gestor de contraseñas confiable"]
    },
    {
      title: "Detección de Deepfakes e IA",
      desc: "La inteligencia artificial permite clonar voces y rostros para fraudes. Aprende a identificar anomalías.",
      tips: ["Desconfía de llamadas urgentes pidiendo dinero", "Establece una palabra clave familiar secreta", "Verifica llamando de vuelta al número conocido"]
    },
    {
      title: "Guía de Reporte CAI Virtual",
      desc: "Canales oficiales en Colombia para reportar delitos informáticos amparados por la Ley 1273 de 2009.",
      tips: ["Conserva capturas de pantalla y evidencias", "No elimines correos ni bloquees sin documentar", "Reporta en caivirtual.policia.gov.co"]
    }
  ];

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '30px', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', fontFamily: 'system-ui, sans-serif' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', marginBottom: '8px' }}>Centro de Buenas Prácticas</h2>
      <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>Recomendaciones clave de ciberseguridad y alfabetización digital[cite: 1].</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '20px' }}>
        {cards.map((card, idx) => (
          <div key={idx} style={{ padding: '20px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px' }}>{card.title}</h3>
            <p style={{ fontSize: '14px', color: '#475569', marginBottom: '14px', lineHeight: '1.4' }}>{card.desc}</p>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: '#334155' }}>
              {card.tips.map((tip, i) => (
                <li key={i} style={{ marginBottom: '6px' }}>{tip}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};