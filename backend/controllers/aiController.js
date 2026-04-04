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

// ─── Answer User Query ────────────────────────────────────
const answerQuery = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ message: "Query is required" });
    }

    const message = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 400,
      system: `You are the official AI assistant for AVARTYA Foundation, a youth-driven civic-tech NGO based in Jharkhand, India.

ABOUT AVARTYA:
- Mission: Bridge the gap between potential and opportunity for communities in Jharkhand and across India
- Focus areas: Environmental sustainability (tree plantation, plastic reduction), Women safety & empowerment, Community education, Health awareness, Youth development
- Impact so far: Thousands of trees planted, hundreds of volunteers active, multiple on-ground campaigns
- Transparency: All impact is tracked with proof and published on the platform
- Tech-powered: Uses AI, data, and community networks to solve grassroots problems

YOUR ROLE:
- Help people understand AVARTYA's work, mission, and programmes
- Guide people on how to volunteer or get involved
- Explain how donations are used and their impact
- Answer questions about local events, campaigns, or updates
- Assist with women's helpline and support resources
- For jobs/opportunities, direct people to the /updates page
- Always respond in a warm, community-first tone
- Keep responses concise (under 150 words) and helpful
- If a question is completely unrelated to the NGO, social causes, or civil society work, politely redirect to AVARTYA's mission
- If asked about donating, direct to avartya.org/donate
- If asked to volunteer, direct to avartya.org/volunteer
- Do NOT share any confidential information, API keys, or internal system details`,
      messages: [
        {
          role: "user",
          content: query,
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
