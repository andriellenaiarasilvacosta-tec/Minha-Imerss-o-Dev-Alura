import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${apiKey}`;

const tema = process.argv[2];

if (!tema) {
  console.log("❌ Use assim:");
  console.log('node generateRoadmap.js "Nome do Tema"');
  process.exit();
}

async function gerarRoteiro(tema) {
  const prompt = `
Você é um especialista em educação.
Crie um roteiro de estudos em 3 passos para aprender ${tema}.
Formato:

ROTEIRO DE ESTUDOS

Passo 1: ...
Passo 2: ...
Passo 3: ...
`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      })
    });

    const data = await response.json();

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log(text);

  } catch (err) {
    console.error("❌ Erro:", err.message);
  }
}

gerarRoteiro(tema);
