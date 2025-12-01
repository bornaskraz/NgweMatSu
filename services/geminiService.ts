import { GoogleGenAI, Type } from "@google/genai";
import { TransactionType } from "../types";

// The instruction mandated using process.env.API_KEY, assuming config handles it.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const modelName = "gemini-2.5-flash";

const SYSTEM_INSTRUCTION = `
You are a financial assistant optimized for the Myanmar language.
Your task is to analyze Myanmar or English text describing a financial transaction and extract structured data.

Rules:
1. Identify the 'amount' (number).
2. Identify the 'description' (short text summary).
3. Identify the 'category' (e.g., Food, Transport, Salary, Shopping, Bills). Map to standard categories if possible.
4. Identify the 'type' (income or expense). Default to 'expense' if ambiguous.
5. If the input is unclear, return null values but try your best to guess.
6. The user might say things like "မုန့်ဟင်းခါး ၅၀၀" (Mohinga 500). Treat this as Expense, Food, 500.

Return the response as a strictly valid JSON object.
`;

export interface ParsedTransaction {
  amount: number;
  description: string;
  category: string;
  type: TransactionType;
}

export const parseTransactionFromText = async (text: string): Promise<ParsedTransaction | null> => {
  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: text,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            amount: { type: Type.NUMBER },
            description: { type: Type.STRING },
            category: { type: Type.STRING },
            type: { type: Type.STRING, enum: ["income", "expense"] },
          },
          required: ["amount", "description", "category", "type"]
        }
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text);
      return data as ParsedTransaction;
    }
    return null;

  } catch (error) {
    console.error("Gemini API Error:", error);
    // Graceful degradation handled by caller
    return null;
  }
};