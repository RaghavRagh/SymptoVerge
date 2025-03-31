import { configDotenv } from "dotenv";
import express from "express";
import axios from "axios";
import cors from "cors";

configDotenv();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 6000;
const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;

app.post("/predict", async (req, res) => {
  console.log(req.body.text);
  try {
    // const response = await axios.post("http://127.0.0.1:8000/predict", {
    //   text: req.body.text,
    // });
    const response = await axios.post("https://symptoverge-fastapi.onrender.com/predict", {
      text: req.body.text,
    });

    console.log("Response -> ", response.data.response);
    res.json(response.data.response);
  } catch (error) {
    console.error("Error calling ML model:", error);
    res.status(500).json({ error: "Failed to fetch prediction" });
  }
});

app.post("/chat", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Missing text input." });
    }

    const response = await axios.post(
      "https://api.mistral.ai/v1/chat/completions",
      {
        model: "mistral-tiny",
        messages: [{ role: "user", content: text }],
      },
      {
        headers: {
          Authorization: `Bearer ${MISTRAL_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    
    res.json({ response: response.data.choices[0].message.content });
  } catch (error) {
    console.error("Error communicating with Mistral API:", error);
    res.status(500).json({ error: "Mistral API request failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
