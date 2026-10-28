import { NextResponse } from 'next/server';

interface ChatRequestBody {
  message: string;
  catalog: Array<{
    title?: string;
    productType?: string;
    tags?: string[];
    priceRange?: {
      minVariantPrice?: {
        amount: string;
        currencyCode: string;
      };
    };
  }>;
}

// Valid, ultra-fast Gemini models
const FAST_MODELS = [
  'gemini-3.8-flash',
  'gemini-3.6-flash',
  'gemini-2.0-flash',
  'gemini-1.5-flash',
  'gemini-3.5-flash-lite',
  'gemini-flash-latest',,
];

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
    const { message, catalog = [] } = body;

    // 1. Optimize catalog data to minimal plain text (drastically cuts token latency)
    const simplifiedCatalog = catalog.slice(0, 15).map((p) => ({
      name: p.title,
      type: p.productType,
      tags: p.tags,
      price: p.priceRange?.minVariantPrice
        ? `${p.priceRange.minVariantPrice.amount} ${p.priceRange.minVariantPrice.currencyCode}`
        : 'N/A',
    }));

    const promptText = `You are Babyblu's AI Baby Care Assistant. Cheerful, concise (2 sentences max), pediatric-focused.

Catalog:
${JSON.stringify(simplifiedCatalog)}

User Question: ${message}`;

    let lastError = 'All fast models failed';

    // 2. Try fast models with strict timeouts
    for (const model of FAST_MODELS) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 sec max per attempt

      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: promptText }] }],
              generationConfig: {
                maxOutputTokens: 150, // Short response = faster generation
                temperature: 0.7,
              },
            }),
            signal: controller.signal,
          }
        );

        clearTimeout(timeoutId);

        const data = await response.json();

        if (response.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
          const reply = data.candidates[0].content.parts[0].text;
          return NextResponse.json({ reply, modelUsed: model });
        }

        lastError = data.error?.message || `Model ${model} error (${response.status})`;
        console.warn(`[Fast AI] ${model} failed, switching...`);
      } catch (err: unknown) {
        clearTimeout(timeoutId);
        const errMessage = err instanceof Error ? err.message : 'Timeout / Network Error';
        console.warn(`[Fast AI] ${model} skipped (${errMessage})`);
      }
    }

    return NextResponse.json({ error: lastError }, { status: 500 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Server Exception';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}