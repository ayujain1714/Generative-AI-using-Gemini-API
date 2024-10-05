require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const markdown = require("markdown").markdown;
/// redcarpet markdown can also be used for code blocks.

const {
  GoogleGenerativeAI,
  FunctionDeclarationSchemaType,
} = require("@google/generative-ai");

const PORT = process.env.PORT;

const apikey = process.env.API_Key;

const genAI = new GoogleGenerativeAI(apikey);

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.post("/sendprmpt", async (req, res) => {
  console.log("Received Prompt: " + req.body.prmpt);

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(req.body.prmpt);

  const response = result.response;
  const text = response.text();
  res.json({ message: markdown.toHTML(text) });
});

app.listen(PORT, () => console.log(`Listning on http://localhost:${PORT}`));
