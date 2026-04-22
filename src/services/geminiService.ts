import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || '' 
});

export async function getCivicInsight(title: string, description: string, category: string) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured in the environment.");
  }

  const prompt = `Atue como um Especialista em Civic Tech e Direito Constitucional. 
  Analise o seguinte problema público para o protocolo L-GPPS 2.0:
  Título: ${title}
  Categoria: ${category}
  Descrição: ${description}
  
  Forneça:
  1. Base legal (Constituição ou Lei relevante).
  2. Nível de impacto institucional.
  3. Recomendação estratégica de sobrevivência jurídica para o cidadão.
  
  Formato: JSON { "legalBasis": "string", "insight": "string", "impactLevel": "string" }`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
}
