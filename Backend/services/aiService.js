const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Generates a 7-day Ayurvedic diet plan using OpenAI.
 * @param {Object} patient - Patient object with dosha_assessment and health_diet
 * @returns {Object} - structured JSON plan
 */
async function generateDietPlan(patient) {
  const dosha = patient.dosha_assessment || {};
  const health = patient.health_diet || {};

  // Build a prompt extracting relevant details
  const prompt = `
You are an Ayurvedic nutritionist. Generate a personalized 7-day Ayurvedic diet plan for the patient described below.
Output should be valid JSON with keys "overview" and "days" where "days" is an array of 7 elements containing "day", "breakfast", "mid_morning", "lunch", "snack", "dinner", and "notes". Keep meals practical and concise, consider dosha balance and health concerns.

Patient details:
Name: ${patient.full_name || 'Unknown'}
Age: ${patient.date_of_birth ? patient.date_of_birth : 'Unknown'}
Dosha assessment: ${JSON.stringify(dosha)}
Health & diet info: ${JSON.stringify(health)}

Constraints:
- Recommend simple, commonly available ingredients.
- Add notes per day for dosha balancing.
- If allergies listed, avoid those foods.
- Provide short bullet points in notes.

Return only the JSON (no extra commentary).
  `;

  // Use the Chat Completion / Responses
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini', // choose a suitable model or gpt-4o if available
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 900
  });

  // Depending on response shape; adapt if using different SDK version
  const content = response.choices?.[0]?.message?.content || response.choices?.[0]?.text;

  // Try to parse JSON from model output
  try {
    const json = JSON.parse(content);
    return json;
  } catch (err) {
    // If the model returned non-exact JSON, attempt to extract JSON substring
    const start = content.indexOf('{');
    const end = content.lastIndexOf('}');
    if (start !== -1 && end !== -1) {
      const substring = content.substring(start, end + 1);
      try {
        return JSON.parse(substring);
      } catch (err2) {
        throw new Error('AI returned unparsable output');
      }
    }
    throw new Error('AI returned unparsable output');
  }
}

module.exports = { generateDietPlan };
