import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";


dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());


const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


app.get("/", (req, res) => res.send("Food Explorer Backend läuft ✅"));


app.post("/api/chat", async (req, res) => {
try {
const { prompt } = req.body;
if (!prompt) return res.status(400).json({ error: "Prompt fehlt" });


const response = await openai.chat.completions.create({
model: "gpt-4o-mini",
messages: [{ role: "user", content: prompt }],
temperature: 0.7,
});


res.json({ text: response.choices[0].message.content });
} catch (err) {
console.error(err);
res.status(500).json({ error: "Fehler bei der OpenAI-Anfrage" });
}
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
