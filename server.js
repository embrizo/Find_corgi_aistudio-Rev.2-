import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // AI Client
  let ai = null;
  try {
    if (process.env.GEMINI_API_KEY) {
      ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
  } catch (e) {
    console.error("Failed to initialize Google Gen AI client", e);
  }

  app.post("/api/chat", async (req, res) => {
    try {
      if (!ai) {
        return res.status(500).json({ error: "Gemini API key is missing or invalid on the server." });
      }

      const { messages } = req.body;
      
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Invalid request payload. Expected an array of messages." });
      }

      const systemInstruction = "You are a helpful and playful learning assistant for a children's vocabulary app called 'Find the Corgi'. Your role is to help users learn English and Thai words, provide hints about the app, and answer questions in a friendly, encouraging, and child-appropriate tone.";

      // Convert messages to the format expected by chat
      const chat = ai.chats.create({
        model: "gemini-3.1-flash-lite",
        config: {
          systemInstruction,
        }
      });

      // To maintain conversation history, we send all previous messages in order
      let responseText = "";
      
      // For proper chat history handling using the API, we need to pass previous history if possible,
      // but if the API doesn't allow setting history directly easily in chats.create, we can use generateContent
      // or send messages sequentially in the chat session.
      // Wait, we can pass history in `contents` to generateContent.
      
      const contents = messages.map(msg => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: contents,
        config: {
          systemInstruction,
        }
      });

      res.json({ reply: response.text });
      
    } catch (e) {
      console.error("Error in /api/chat:", e);
      res.status(500).json({ error: "Failed to generate response." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
