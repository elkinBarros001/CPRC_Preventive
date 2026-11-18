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
    <div style={{ width: '100%', maxWidth: '900px', margin: '20px auto', padding: '15px', boxSizing: 'border-box', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#0f172a', marginBottom: '6px' }}>Centro de Buenas Prácticas</h2>
        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>Recomendaciones clave de ciberseguridad y alfabetización digital.</p>

        {/* Grid adaptable que se ajusta automáticamente a pantallas pequeñas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {cards.map((card, idx) => (
            <div key={idx} style={{ padding: '16px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc', boxSizing: 'border-box' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1e293b', marginBottom: '6px' }}>{card.title}</h3>
              <p style={{ fontSize: '13px', color: '#475569', marginBottom: '12px', lineHeight: '1.4' }}>{card.desc}</p>
              <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: '#334155' }}>
                {card.tips.map((tip, i) => (
                  <li key={i} style={{ marginBottom: '4px' }}>{tip}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};