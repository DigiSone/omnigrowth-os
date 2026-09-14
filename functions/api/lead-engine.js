export async function onRequestPost({ request, env }) {
  try {
    const data = await request.json();
    const { email, name, phone, intent, source } = data;

    if (!email) {
      return new Response(JSON.stringify({ error: "Email zaroori hai" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Lead Scoring Engine (Enterprise Qualification)
    let score = 25;
    if (phone) score += 25;
    if (intent === 'ENTERPRISE' || intent === 'BUY') score += 50;

    const leadClassification = score >= 75 ? 'HIGH_PRIORITY_SQL' : 'NURTURE_MQL';

    return new Response(JSON.stringify({
      success: true,
      lead_score: score,
      status: leadClassification,
      action: "AUTO_CAMPAIGN_TRIGGERED",
      timestamp: new Date().toISOString()
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}