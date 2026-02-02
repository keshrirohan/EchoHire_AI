import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

console.log(
  "Loaded API Key:",
  process.env.GEMINI_API_KEY ? "Present" : "MISSING",
);

// -------- GEMINI CONFIGURATION --------
if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY not found in .env file");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// -------- GEMINI HELPER FUNCTION --------
async function askGemini(
  prompt,
  fallback = "Please continue with the interview.",
) {
  try {
    const result = await Promise.race([
      model.generateContent(prompt),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Gemini timeout")), 15000),
      ),
    ]);

    return result.response.text();
  } catch (error) {
    console.log("Gemini Error:", error.message);
    return fallback;
  }
}

// -------- VALIDATION MIDDLEWARE --------
function validateRequest(requiredFields) {
  return (req, res, next) => {
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          error: `Missing required field: ${field}`,
        });
      }
    }
    next();
  };
}

// -------- BASIC ROUTES --------
app.get("/", (req, res) => {
  res.send("EchoHire AI Backend Running");
});

// -------- FIRST QUESTION BASED ON JD --------
app.post("/first-question", validateRequest(["jd"]), async (req, res) => {
  const { jd } = req.body;

  const prompt = `
    Act as a professional HR interviewer.

    Job Description:
    ${jd}

    Generate ONE clear and simple first interview question 
    directly related to this job description.

    Rules:
    - Use simple language
    - Be professional
    - Be role specific
    - Return ONLY the question

    Output format: Single question only.
    `;

  const question = await askGemini(
    prompt,
    "Tell me about your background and experience.",
  );

  res.json({ question });
});

// -------- MAIN INTERVIEW LOGIC --------
app.post("/next-question", async (req, res) => {
  const { answer, round, questionCount, lastQuestion, jd } = req.body;

  // ----- ROUND CHANGE LOGIC FIRST -----

  if (round === "HR" && questionCount >= 3) {
    return res.json({
      type: "round_change",
      nextRound: "TECH",
      question: "Great. Now let's move to the technical round. Can you explain what technologies from the JD you are most confident with?"
    });
  }

  if (round === "TECH" && questionCount >= 5) {
    return res.json({
      type: "round_change",
      nextRound: "MANAGER",
      question: "Good. Now moving to managerial round. Tell me about a challenging project you handled."
    });
  }

  if (round === "MANAGER" && questionCount >= 4) {
    return res.json({
      type: "round_change",
      nextRound: "SALARY",
      question: "Great discussion. Now let's talk about salary expectations."
    });
  }

  // ----- AI QUESTION LOGIC -----

  let prompt = "";

  if (round === "HR") {
    prompt = `
    You are an HR interviewer.

    Job Description:
    ${jd}

    Last Question: ${lastQuestion}
    Candidate Answer: ${answer}

    Generate the next HR interview question related to this JD.

    Return ONLY the question text.
    `;
  }

  if (round === "TECH") {
    prompt = `
    You are a technical interviewer.

    Job Description:
    ${jd}

    Previous Question: ${lastQuestion}
    Candidate Answer: ${answer}

    Ask a technical question strictly based on skills in the JD.

    Return only the question.
    `;
  }

  if (round === "MANAGER") {
    prompt = `
    You are a hiring manager.

    Job Description:
    ${jd}

    Ask a behavioral or leadership question related to this role.

    Return only the question.
    `;
  }

  if (round === "SALARY") {
    prompt = `
    You are HR negotiating salary.

    Candidate says: ${answer}

    Respond professionally and continue salary discussion.

    Return only your reply.
    `;
  }

  const aiQuestion = await askGemini(prompt);

  res.json({
    type: "next",
    question: aiQuestion,
  });
});


// -------- REPORT GENERATION --------
app.post("/generate-report", validateRequest(["answers"]), async (req, res) => {
  const { answers } = req.body;

  const prompt = `
    You are an expert interview evaluator.

    Analyze these interview answers:

    ${JSON.stringify(answers)}

    Generate a structured interview report.

    Format EXACTLY like:

    Overall Score (1-10):
    Technical Score:
    Communication Score:

    Strengths:
    - point 1
    - point 2

    Improvements:
    - point 1
    - point 2
    `;

  const report = await askGemini(
    prompt,
    "Unable to generate detailed report at this time.",
  );

  res.json({ report });
});

// -------- GLOBAL ERROR HANDLER --------
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).json({
    error: "Internal server error",
  });
});

// -------- START SERVER --------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
