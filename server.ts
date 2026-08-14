import express from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: AI Study Abroad Counselor Assistant
  app.post("/api/ai-advisor", async (req, res) => {
    try {
      const { prompt, country, studyLevel } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        return res.json({
          response: `As Grassroots Study Abroad AI Advisor, I am pleased to assist you! Based on your interest in ${country || "global destinations"} for ${studyLevel || "higher education"}, top recommendations include UK (2-year post-study work visa), Canada (PGWP eligibility), Germany (tuition-free public universities), and Royal Roads or Wittenborg pathway options. Please schedule a free 1-on-1 session with our certified senior counselors for customized profile evaluation!`
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `You are the official AI Study Abroad Counselor for "Grassroots Study Abroad" (Tagline: "Your Gateway to Global Education"). 
Your goal is to assist students interested in studying abroad (UK, USA, Canada, Australia, Ireland, Germany, France, New Zealand).
Key selling points of Grassroots Study Abroad:
- 36 Years Experience, 3,51,000+ Students Advised, 1,00,000+ Students Placed, 98.6% Visa Approval Rate
- Direct Partner Universities: Royal Roads University (Canada), Wittenborg University (Germany/Netherlands), Varna University of Management (Bulgaria/UK dual degree), plus top universities in UK, USA, Australia.
- Unique 1+2 Pathway Programs allowing students to study year 1 in India and transfer abroad with up to 50% cost savings.
- Services: Admissions, Scholarships, Visa Assistance, Education Loans, Accommodation, Career Guidance.

Provide professional, friendly, concise, and structured guidance. Include actionable next steps and invite them to click "Book Free Counselling".`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            role: "user",
            parts: [{ text: `User Query: ${prompt}\nContext: Preferred Country: ${country || 'Any'}, Level: ${studyLevel || 'Any'}` }]
          }
        ],
        config: {
          systemInstruction,
          temperature: 0.7,
          maxOutputTokens: 800
        }
      });

      const text = response.text || "Thank you for reaching out! Our Grassroots Study Abroad senior counselors will be happy to assist you in detail.";
      return res.json({ response: text });

    } catch (err: any) {
      console.error("AI Advisor Error:", err);
      return res.status(500).json({ 
        error: "Failed to generate AI advice",
        fallback: "For detailed personalized advice, please click 'Book Free Counselling' to speak with our study abroad experts."
      });
    }
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", brand: "Grassroots Study Abroad" });
  });

  // Serve robots.txt & sitemap.xml explicitly
  app.get("/robots.txt", (req, res) => {
    res.type("text/plain");
    res.sendFile(path.join(process.cwd(), "public", "robots.txt"));
  });

  app.get("/sitemap.xml", (req, res) => {
    res.type("application/xml");
    res.sendFile(path.join(process.cwd(), "public", "sitemap.xml"));
  });

  // Dedicated Video Stream handler with HTTP 206 Range support for fast playback
  const handleVideoStream = (req: express.Request, res: express.Response) => {
    const videoPath = path.join(process.cwd(), "public", "hero-bg.mp4");
    
    if (!fs.existsSync(videoPath)) {
      return res.status(404).send("Video not found");
    }

    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;
      const file = fs.createReadStream(videoPath, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4",
        "Cache-Control": "public, max-age=31536000, immutable",
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
        "Accept-Ranges": "bytes",
        "Cache-Control": "public, max-age=31536000, immutable",
      };
      res.writeHead(200, head);
      fs.createReadStream(videoPath).pipe(res);
    }
  };

  app.get("/hero-bg.mp4", handleVideoStream);
  app.get("/api/hero-video", handleVideoStream);

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Grassroots Study Abroad server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
