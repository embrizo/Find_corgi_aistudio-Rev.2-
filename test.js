import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
async function run() {
  const modelsToTest = [
    "gemini-3.5-flash",
    "gemini-flash-latest",
    "gemini-3.1-flash-lite",
    "gemini-3-flash-preview"
  ];
  for (const model of modelsToTest) {
    try {
      console.log(`Testing ${model}...`);
      const response = await ai.models.generateContent({
          model: model,
          contents: "Hi"
      });
      console.log(`Success with ${model}:`, response.text);
      break;
    } catch (e) {
      console.error(`Failed with ${model}:`, e.message);
    }
  }
}
run();
