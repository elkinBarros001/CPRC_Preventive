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