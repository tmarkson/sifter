import { GoogleGenAI, Type } from "@google/genai";
import type { Product } from '../types';

if (!process.env.API_KEY) {
    // This is a placeholder for environments where the key is not set.
    // The web app environment is expected to have this configured.
    console.warn("API_KEY environment variable not set. Using a placeholder.");
    process.env.API_KEY = "YOUR_API_KEY";
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const schema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      lastModified: {
        type: Type.STRING,
        description: "The date the product information was last updated, in ISO 8601 format (e.g., '2025-04-08T09:57:00Z').",
      },
      title: { type: Type.STRING, description: "The official name or title of the product." },
      mfg: { type: Type.STRING, description: "The name of the manufacturer." },
      mfgPn: { type: Type.STRING, description: "The manufacturer's part number." },
      link: { type: Type.STRING, description: "A direct, valid, and publicly accessible URL to the product's official page. Prioritize official manufacturer or major retailer websites. Do not invent URLs. Use null if a valid URL cannot be found." },
      country: { type: Type.STRING, description: "The country of origin for the product." },
      formFactor: { type: Type.STRING, description: "The physical form factor (e.g., 'SBC', 'SOM', 'Boxed SBC')." },
      price: { type: Type.NUMBER, description: "The price in USD for a single unit. Use null if not available." },
      features: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "A list of key technical features or specifications.",
      },
      imageUrl: {
        type: Type.STRING,
        description: "A direct, valid, and publicly accessible URL to an image of the product. Prioritize official sources. Should be a full URL ending in .png, .jpg, .webp, etc. Use null if no valid image is available.",
      },
    },
    required: ["lastModified", "title", "mfg", "mfgPn", "link", "country", "formFactor", "price", "features", "imageUrl"],
  },
};


export const generateComparisonData = async (prompt: string): Promise<Product[]> => {
  try {
    const fullPrompt = `Based on the following request, generate a comparison database of 10 to 15 real products. The user wants to compare: "${prompt}". Return the data as a JSON array. Each object in the array must represent a single, real product and conform to the provided schema. All data, especially links and image URLs, must be factual and verifiable. For 'link' and 'imageUrl', provide direct, valid, and publicly accessible URLs. Prioritize official manufacturer or major retailer websites. Do not invent URLs. If a valid URL cannot be found, return null for that field. Prices should be numbers, not strings.`;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: fullPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    const jsonText = response.text.trim();
    if (!jsonText) {
      throw new Error("API returned an empty response.");
    }

    const data = JSON.parse(jsonText);
    
    // Basic validation to ensure we have an array of objects
    if (!Array.isArray(data) || data.some(item => typeof item !== 'object')) {
        throw new Error("API did not return a valid JSON array of products.");
    }
    
    return data as Product[];

  } catch (error) {
    console.error("Error generating data with Gemini:", error);
    if (error instanceof Error && error.message.includes("API key not valid")) {
       throw new Error("The API key is invalid. Please check your configuration.");
    }
    throw new Error("Failed to generate data from AI. The model may have returned an invalid format.");
  }
};