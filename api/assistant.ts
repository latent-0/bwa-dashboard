// Vercel Edge Function: proxies chat requests to OpenRouter so the API key
// never ships to the browser. Set OPENROUTER_API_KEY in the Vercel project's
// Environment Variables (never commit it to source).
export const config = { runtime: 'edge' }

interface OfferContext {
  brand: string
  campaign: string
  status: string
  missing: string[]
  revenuePerCallDisplay: string | null
  dealNotes: string | null
  notes: string | null
  productionStage: string | null
  datasetSummary: string
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 })
  }

  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'OPENROUTER_API_KEY is not configured on the server.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    )
  }

  let body: { question?: string; context?: OfferContext }
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body.' }), { status: 400 })
  }

  const question = (body.question ?? '').trim().slice(0, 2000)
  if (!question) {
    return new Response(JSON.stringify({ error: 'A question is required.' }), { status: 400 })
  }

  const ctx = body.context
  const systemPrompt = ctx
    ? `You are an assistant embedded in Blue Wing Ads' internal ops dashboard. You are currently focused on one offer, but you also have a live summary of every other offer in the book below, so you can answer cross-cutting questions (what else needs a buyer, what should I unlock next, how many are live) as well as questions about this specific offer. Only use the facts given here, never invent data you don't have. If something isn't in the facts below, say you don't have that information rather than guessing. Keep answers short (2-4 sentences) and practical, and suggest a concrete next action when relevant.

Current offer:
- Brand: ${ctx.brand}
- Campaign: ${ctx.campaign}
- Status: ${ctx.status}
- Missing signals: ${ctx.missing.length ? ctx.missing.join(', ') : 'none, fully live'}
- Our revenue per call: ${ctx.revenuePerCallDisplay ?? 'not set'}
- Production stage: ${ctx.productionStage ?? 'not set'}
- Deal notes: ${ctx.dealNotes ?? 'none'}
- Other notes: ${ctx.notes ?? 'none'}

Whole book summary: ${ctx.datasetSummary}`
    : 'You are an assistant embedded in Blue Wing Ads internal ops dashboard. Keep answers short and practical.'

  try {
    const upstream = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://bwa-dashboard-three.vercel.app/',
        'X-Title': 'Blue Wing Ads Ops Dashboard',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o',
        max_tokens: 300,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: question },
        ],
      }),
    })

    if (!upstream.ok) {
      const text = await upstream.text()
      return new Response(JSON.stringify({ error: `OpenRouter error: ${text.slice(0, 300)}` }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const data = await upstream.json()
    const reply = data.choices?.[0]?.message?.content ?? "Sorry, I didn't get a response."
    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: `Request failed: ${String(err)}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
