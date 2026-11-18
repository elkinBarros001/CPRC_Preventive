import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

//conexión con firebase
const firebaseConfig = {
  apiKey: "AIzaSyD-GmnvC91ushDmZSN9lr_YL8KXqj-S8HA",
  authDomain: "cprc-preventive-app.firebaseapp.com",
  projectId: "cprc-preventive-app",
  storageBucket: "cprc-preventive-app.firebasestorage.app",
  messagingSenderId: "182097453990",
  appId: "1:182097453990:web:43ba8b3a1d49b4d39be567"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

/**
 * Función para guardar el resultado del test de diagnóstico de forma anónima (RNF4).
 * Solo guarda puntaje, nivel de riesgo y fecha, cumpliendo la Ley 1581 de 2012.
 */
export const saveDiagnosticResultAnonymously = async (totalScore: number, riskLevel: string) => {
  try {
    await addDoc(collection(db, "anonymous_diagnostics"), {
      totalScore,
      riskLevel,
      createdAt: serverTimestamp()
    });
    console.log("Resultado anónimo guardado con éxito en Firestore");
  } catch (error) {
    console.error("Error al guardar el diagnóstico anónimo:", error);
  }
};