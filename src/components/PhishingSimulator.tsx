import React, { useState } from 'react';

interface Message {
  id: number;
  type: 'email' | 'sms';
  sender: string;
  subject: string;
  content: string;
  warning: string;
  isSafe: boolean;
}

const mockMessages: Message[] = [
  {
    id: 1,
    type: 'email',
    sender: 'seguridad@banco-nacional-alerta.com',
    subject: '¡ALERTA DE SEGURIDAD! Cuenta bloqueada temporalmente',
    content: 'Estimado cliente, detectamos un acceso no autorizado. Para evitar la suspensión de su servicio, debe verificar sus datos haciendo clic en el siguiente enlace: https://banco-nacional-verificar.co/login',
    warning: 'Remitente sospechoso (dominio alterado) y uso de lenguaje de urgencia.',
    isSafe: false
  },
  {
    id: 2,
    type: 'sms',
    sender: '+57 300 000 0000',
    subject: 'Envío de Paquete Retenido',
    content: 'Tu paquete internacional está retenido en aduanas por falta de pago de impuestos ($12.500). Ingresa aquí para liberarlo: bit.ly/paq-col',
    warning: 'Uso de enlaces acortados (bit.ly) y solicitud de pagos por mensajería.',
    isSafe: false
  },
  {
    id: 3,
    type: 'email',
    sender: 'soporte@universidad.edu.co',
    subject: 'Mantenimiento programado de correo institucional',
    content: 'Informamos a la comunidad académica que este domingo habrá mantenimiento en los servidores de correo de 2:00 a.m. a 4:00 a.m.',
    warning: 'Dominio oficial institucional (.edu.co) y ausencia de enlaces maliciosos o urgencia desmedida.',
    isSafe: true
  }
];

export const PhishingSimulator: React.FC = () => {
  const [selectedMessage, setSelectedMessage] = useState<Message>(mockMessages[0]);
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' | 'warning' } | null>(null);

  const handleAction = (action: 'click' | 'ignore' | 'report') => {
    if (selectedMessage.isSafe) {
      if (action === 'ignore' || action === 'click') {
        setFeedback({
          message: "¡Correcto! Este mensaje era legítimo y seguro, aunque siempre es prudente verificar los canales oficiales.",
          type: "success"
        });
      } else {
        setFeedback({
          message: "Este mensaje era oficial y seguro, no requería reporte urgente, pero es una buena práctica estar alerta.",
          type: "warning"
        });
      }
    } else {
      if (action === 'click') {
        setFeedback({
          message: "⚠️ ¡Caíste en la trampa! Hiciste clic en un enlace de phishing. Tus credenciales habrían sido robadas.",
          type: "error"
        });
      } else if (action === 'ignore') {
        setFeedback({
          message: "⚠️ Ignoraste el mensaje, lo cual es mejor que hacer clic, pero el peligro sigue activo para otros usuarios. Lo ideal es reportarlo.",
          type: "warning"
        });
      } else if (action === 'report' || action === 'block') {
        setFeedback({
          message: "¡Excelente decisión! Identificaste las señales de alerta, bloqueaste al remitente y reportaste el intento de fraude.",
          type: "success"
        });
      }
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '30px', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', fontFamily: 'system-ui, sans-serif' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', marginBottom: '8px' }}>Simulador de Phishing e Ingeniería Social</h2>
      <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>Evalúa los mensajes recibidos y decide correctamente cómo actuar.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
        {/* Bandeja de entrada simulada */}
        <div style={{ borderRight: '1px solid #e2e8f0', paddingRight: '15px' }}>
          <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#334155' }}>Bandeja de Entrada</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {mockMessages.map((msg) => (
              <div 
                key={msg.id}
                onClick={() => { setSelectedMessage(msg); setFeedback(null); }}
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  border: selectedMessage.id === msg.id ? '2px solid #2563eb' : '1px solid #cbd5e1',
                  backgroundColor: selectedMessage.id === msg.id ? '#eff6ff' : '#f8fafc',
                  cursor: 'pointer',
                  fontSize: '13px'
                }}
              >
                <strong style={{ display: 'block', color: '#1e293b' }}>{msg.sender}</strong>
                <span style={{ color: '#475569', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>{msg.subject}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Detalle del mensaje y acciones */}
        <div>
          <div style={{ backgroundColor: '#f1f5f9', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
            <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase' }}>De: {selectedMessage.sender}</span>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#0f172a', margin: '6px 0' }}>{selectedMessage.subject}</h3>
            <p style={{ fontSize: '14px', color: '#334155', lineHeight: '1.5' }}>{selectedMessage.content}</p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#334155', display: 'block', marginBottom: '8px' }}>¿Qué acción deseas tomar?</span>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => handleAction('click')} style={{ flex: 1, padding: '10px', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Hacer Clic</button>
              <button onClick={() => handleAction('ignore')} style={{ flex: 1, padding: '10px', backgroundColor: '#64748b', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Ignorar</button>
              <button onClick={() => handleAction('report')} style={{ flex: 1, padding: '10px', backgroundColor: '#22c55e', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Reportar</button>
            </div>
          </div>

          {feedback && (
            <div style={{
              padding: '14px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              backgroundColor: feedback.type === 'success' ? '#dcfce7' : feedback.type === 'error' ? '#fee2e2' : '#fef3c7',
              color: feedback.type === 'success' ? '#166534' : feedback.type === 'error' ? '#991b1b' : '#92400e',
              border: `1px solid ${feedback.type === 'success' ? '#bbf7d0' : feedback.type === 'error' ? '#fecaca' : '#fde68a'}`
            }}>
              <p style={{ margin: 0, marginBottom: '6px' }}>{feedback.message}</p>
              {!selectedMessage.isSafe && (
                <small style={{ display: 'block', fontStyle: 'italic' }}>Análisis de seguridad: {selectedMessage.warning}</small>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};