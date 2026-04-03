const Anthropic = require("@anthropic-ai/sdk");

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ─── Generate Campaign Description ─────────────────────────
const generateCampaignDescription = async (req, res) => {
  try {
    const { topic, category, location } = req.body;

    if (!topic || !category) {
      return res.status(400).json({ message: "Topic and category are required" });
    }

    const message = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 500,
      messages: [
        {
          role: "user",
          content: `Write a compelling campaign description for an Indian NGO called Avartya Foundation.
          
Campaign topic: ${topic}
Category: ${category}
Location: ${location || "India"}

Requirements:
- 2-3 paragraphs
- Inspiring and community-focused tone
- Include call to action
- Keep it under 300 words
- No markdown formatting`,
        },
      ],
    });

    const description = message.content[0].text;
    res.json({ description });
  } catch (error) {
    console.error("[AI Generate Error]", error.message);
    res.status(500).json({ message: "AI service temporarily unavailable" });
  }
};

// ─── Answer User Query ──────────────────────────────────────
const answerQuery = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ message: "Query is required" });
    }

    const message = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 300,
      messages: [
        {
          role: "user",
          content: `You are a helpful assistant for Avartya Foundation, an Indian NGO working on:
- Environmental sustainability (tree plantation, pollution awareness)
- Women safety and empowerment
- Community education
- Health awareness
- Youth development

Answer this question concisely and helpfully: ${query}

If the question is unrelated to the NGO's work, politely redirect to the NGO's mission.`,
        },
      ],
    });

    res.json({ answer: message.content[0].text });
  } catch (error) {
    console.error("[AI Query Error]", error.message);
    res.status(500).json({ message: "AI service temporarily unavailable" });
  }
};

// ─── Summarize Volunteer Data ───────────────────────────────
const summarizeData = async (req, res) => {
  try {
    const { data, dataType } = req.body;

    if (!data) {
      return res.status(400).json({ message: "Data is required" });
    }

    const message = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 400,
      messages: [
        {
          role: "user",
          content: `Summarize this ${dataType || "data"} for an NGO admin dashboard in 3-5 bullet points. Focus on key insights, trends, and actionable recommendations.

Data: ${JSON.stringify(data)}`,
        },
      ],
    });

    res.json({ summary: message.content[0].text });
  } catch (error) {
    console.error("[AI Summary Error]", error.message);
    res.status(500).json({ message: "AI service temporarily unavailable" });
  }
};

module.exports = { generateCampaignDescription, answerQuery, summarizeData };
