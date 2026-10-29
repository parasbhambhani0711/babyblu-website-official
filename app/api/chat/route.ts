import { NextResponse } from 'next/server';

interface MessageHistory {
  sender: 'user' | 'ai';
  text: string;
}

interface CatalogItem {
  id?: string;
  title?: string;
  productType?: string;
  tags?: string[];
  priceRange?: {
    minVariantPrice?: {
      amount: string;
      currencyCode: string;
    };
  };
}

interface ChatRequestBody {
  message: string;
  messages?: MessageHistory[];
  catalog: CatalogItem[];
}

// Active models to attempt in order
const MODELS_TO_TRY = [
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-1.5-flash',
];

// Check if user is asking to see or buy product cards
function isAskingForProductCards(message: string): boolean {
  const lower = message.toLowerCase();
  const keywords = [
    'recommend', 'suggest', 'buy', 'show', 'option', 'which', 'best',
    'looking for', 'catalog', 'pick', 'shop', 'cost', 'price',
    'what wipes', 'what teether', 'product'
  ];
  return keywords.some((kw) => lower.includes(kw));
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is missing in .env.local' },
        { status: 500 }
      );
    }

    const body = (await req.json()) as ChatRequestBody;
    const { message, messages = [], catalog = [] } = body;

    const userWantsCards = isAskingForProductCards(message);

    // Minified catalog context
    const simplifiedCatalog = catalog.slice(0, 15).map((p) => ({
      id: p.id,
      name: p.title,
      type: p.productType,
      price: p.priceRange?.minVariantPrice
        ? `${p.priceRange.minVariantPrice.amount} ${p.priceRange.minVariantPrice.currencyCode}`
        : 'N/A',
    }));

    // Multi-turn chat history formatting
    const formattedContents = messages
      .filter((m) => m.text && m.text.trim().length > 0)
      .map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }],
      }));

    if (
      formattedContents.length === 0 ||
      formattedContents[formattedContents.length - 1].parts[0].text !== message
    ) {
      formattedContents.push({
        role: 'user',
        parts: [{ text: message }],
      });
    }

    const systemPrompt = `You are Babyblu Concierge, an empathetic, highly intelligent Pediatric AI Assistant for the e-commerce store Babyblu.

BEHAVIOR INSTRUCTIONS:
- Answer user questions naturally, contextually, and directly.
- Never use robotic fixed responses. Use recent conversation history to provide helpful, tailored advice.
- When asked about sensitive skin, wipes, oral care, or safety, explain that Babyblu products are 100% food-grade, BPA-free, hypoallergenic, and pediatrician-tested.
- Formatting: Do NOT use markdown bolding (**text**). Keep text clean, plain, and easy to read.

PRODUCT CARDS ("productIds"):
- User asked for product recommendations/options: ${userWantsCards ? 'YES' : 'NO'}.
- ONLY include matching product IDs in "productIds" if the user explicitly asks to see, recommend, or buy products.
- Otherwise, set "productIds" to [].

AVAILABLE CATALOG:
${JSON.stringify(simplifiedCatalog)}

STRICT JSON RESPONSE FORMAT:
Respond with raw JSON only (no markdown, no backticks):
{
  "reply": "Your helpful, natural response here...",
  "productIds": []
}`;

    // Loop through endpoints (v1 and v1beta) and models
    for (const model of MODELS_TO_TRY) {
      const endpoints = [
        `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${apiKey}`,
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      ];

      for (const endpoint of endpoints) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              systemInstruction: {
                parts: [{ text: systemPrompt }],
              },
              contents: formattedContents,
              generationConfig: {
                temperature: 0.4,
                responseMimeType: 'application/json',
              },
            }),
            signal: controller.signal,
          });

          clearTimeout(timeoutId);

          if (!response.ok) {
            continue;
          }

          const data = await response.json();

          if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
            const rawText = data.candidates[0].content.parts[0].text.trim();

            let parsed = { reply: '', productIds: [] };
            try {
              parsed = JSON.parse(rawText);
            } catch {
              const replyMatch = rawText.match(/"reply"\s*:\s*"([^"]*)/);
              parsed = {
                reply: replyMatch ? replyMatch[1] : rawText.replace(/[\{\}"]/g, ''),
                productIds: [],
              };
            }

            const finalProductIds = userWantsCards && Array.isArray(parsed.productIds) ? parsed.productIds : [];

            return NextResponse.json({
              reply: parsed.reply || 'I am here to help answer any questions about safe baby essentials!',
              productIds: finalProductIds,
              modelUsed: model,
            });
          }
        } catch {
          clearTimeout(timeoutId);
        }
      }
    }

    // Friendly, intelligent fallback response if API endpoints are temporarily unavailable
    const lowerMsg = message.toLowerCase();
    let fallbackReply = "Our wipes and oral care tools are crafted with 99%+ pure water, organic cotton, and 100% food-grade silicone—completely free from fragrance, parabens, and BPA!";

    if (lowerMsg.includes('wipe')) {
      fallbackReply = "For delicate or sensitive skin, Babyblu Pure Water Wipes are ideal! They are made with 99%+ pure water, hypoallergenic cotton, and zero alcohol or fragrances.";
    } else if (lowerMsg.includes('hi') || lowerMsg.includes('hello')) {
      fallbackReply = "Hello there! 👋 How can I help you choose safe oral care, wipes, or teethers for your baby today?";
    }

    return NextResponse.json({
      reply: fallbackReply,
      productIds: userWantsCards ? catalog.slice(0, 2).map((p) => p.id).filter(Boolean) : [],
      modelUsed: 'fallback-concierge',
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Server Exception';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}