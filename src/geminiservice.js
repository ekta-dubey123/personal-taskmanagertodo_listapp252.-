// src/geminiService.js
//
// This file is the ONLY place that talks to the Gemini API.
// It sends the user's natural-language sentence and asks Gemini
// to return structured task data (title, description, priority) as JSON.
//
// NOTE ON SECURITY: In this simple demo, the API key is read from a
// frontend env variable (REACT_APP_GEMINI_API_KEY), which means it IS
// visible in the browser bundle. That's fine for a personal project /
// resume demo, but in a production app this call should instead go
// through a backend (e.g. a Firebase Cloud Function) that holds the
// key server-side, so it's never exposed to the browser.

const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

// The prompt is the whole "prompt engineering" piece: we force the
// model to return ONLY valid JSON in a fixed shape, so our code can
// parse it reliably instead of dealing with free-form text.
function buildPrompt(userText) {
  return `You are a task parser for a to-do app.
Read the sentence below and extract task details.
Return ONLY valid JSON, with no extra text, no markdown formatting, no code fences.
Use exactly this shape:
{
  "title": string,        // short task name
  "desc": string,          // brief description (can restate the task if nothing else is given)
  "priority": "low" | "medium" | "high"   // guess "medium" if not mentioned
}

Sentence: "${userText}"`;
}

// Strips accidental ```json ... ``` fences the model sometimes adds,
// even when told not to. Basic defensive parsing.
function cleanJsonString(raw) {
  return raw.replace(/```json/gi, "").replace(/```/g, "").trim();
}

export async function parseTaskWithAI(userText) {
  if (!GEMINI_API_KEY) {
    throw new Error(
      "Missing REACT_APP_GEMINI_API_KEY. Add it to your .env file."
    );
  }

  const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: buildPrompt(userText) }] }],
    }),
  });

  if (!response.ok) {
    const errBody = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errBody}`);
  }

  const data = await response.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!rawText) {
    throw new Error("Gemini returned no usable content.");
  }

  const cleaned = cleanJsonString(rawText);

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (e) {
    throw new Error("Could not parse AI response as JSON: " + cleaned);
  }

  // Basic validation so a malformed response can't silently break the app
  const { title, desc, priority } = parsed;
  if (!title) throw new Error("AI response missing a title.");

  const validPriorities = ["low", "medium", "high"];
  const safePriority = validPriorities.includes(priority) ? priority : "medium";

  return {
    title: String(title),
    desc: desc ? String(desc) : "",
    priority: safePriority,
  };
}
