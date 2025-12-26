
import { GoogleGenAI, Type } from "@google/genai";
import { GenderGuess } from "../types";

/**
 * Guesses the likely gender based on a name using Gemini 3 Flash.
 * @param name The name to analyze.
 */
export const guessGender = async (name: string): Promise<GenderGuess> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Based on the name "${name}", guess the likely gender. Return a JSON object with 'gender' (male/female/non-binary/unknown), 'confidence' (0-1), and a short 'reasoning'.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          gender: { type: Type.STRING },
          confidence: { type: Type.NUMBER },
          reasoning: { type: Type.STRING },
        },
        required: ["gender", "confidence", "reasoning"],
      },
    },
  });

  try {
    return JSON.parse(response.text || "{}") as GenderGuess;
  } catch (error) {
    console.error("Failed to parse gender guess:", error);
    throw new Error("Invalid response from AI");
  }
};

/**
 * Detects gender from an image using Gemini 2.5 Flash Image.
 * @param imageDataUrl The base64 data URL of the image.
 */
export const detectGenderFromImage = async (imageDataUrl: string): Promise<GenderGuess> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const matches = imageDataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!matches) {
    throw new Error("Invalid image data format.");
  }
  const mimeType = matches[1];
  const base64Data = matches[2];

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          inlineData: {
            data: base64Data,
            mimeType: mimeType,
          },
        },
        {
          text: "Analyze this person and guess their gender identity. Return a JSON object with 'gender' (male/female/non-binary/unknown), 'confidence' (0-1), and a short 'reasoning'.",
        },
      ],
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          gender: { type: Type.STRING },
          confidence: { type: Type.NUMBER },
          reasoning: { type: Type.STRING },
        },
        required: ["gender", "confidence", "reasoning"],
      },
    },
  });

  try {
    return JSON.parse(response.text || "{}") as GenderGuess;
  } catch (error) {
    console.error("Failed to parse visual gender detection:", error);
    throw new Error("Invalid response from visual AI");
  }
};
