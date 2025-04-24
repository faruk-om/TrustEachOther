// server.js
console.log("🚨 RUNNING IN-MEMORY SERVER.JS 🚨");

require('dotenv').config();
const express       = require('express');
const cors          = require('cors');
const { randomUUID }= require('crypto');
const Stripe        = require('stripe');
const axios         = require('axios');

const app    = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const PORT   = process.env.PORT || 5000;

//  ── In-Memory “Database” ─────────────────────────────
app.locals.dealsStore = new Map();
//  ─────────────────────────────────────────────────────

app.use(cors());
app.use(express.json());

// 1) Create a deal (no Mongo)
app.post('/api/create-deal', (req, res) => {
  console.log('🔥 HIT /api/create-deal', req.body);
  const { sellerName, itemName, amount, feeMode } = req.body;
  if (!sellerName || !itemName || !amount || !feeMode) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const id   = randomUUID();
  const deal = { id, sellerName, itemName, amount, feeMode };
  app.locals.dealsStore.set(id, deal);
  return res.status(201).json({
    message: 'Deal created (in-memory)',
    dealId: id,
    link: `https://trusteachother.org/pay/${id}`
  });
});

// 2) Get a deal by ID
app.get('/api/get-deal/:id', (req, res) => {
  console.log('🔥 HIT /api/get-deal', req.params.id);
  const deal = app.locals.dealsStore.get(req.params.id);
  if (!deal) return res.status(404).json({ error: 'Deal not found' });
  return res.json(deal);
});

// 3) Create Stripe Checkout Session
app.post('/api/create-checkout-session/:dealId', async (req, res) => {
  console.log('🔥 HIT /api/create-checkout-session', req.params.dealId);
  const deal = app.locals.dealsStore.get(req.params.dealId);
  if (!deal) return res.status(404).json({ error: 'Deal not found' });
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: deal.itemName },
          unit_amount: deal.amount
        },
        quantity: 1
      }],
      mode: 'payment',
      success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:5173/pay/${deal.id}`,
      metadata: { dealId: deal.id }
    });
    return res.json({ id: session.id });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// 4) (Optional) Shipping-status remains unchanged
app.post('/submit-tracking', async (req, res) => {
  const { trackingNumber } = req.body;
  try {
    const response = await axios.get(
      `https://api.goshippo.com/tracks/usps/${trackingNumber}`,
      { headers: { Authorization: `ShippoToken ${process.env.SHIPPO_API_KEY}` } }
    );
    const status = response.data.tracking_status?.status || "Not found";
    res.json({ status });
  } catch {
    res.status(400).json({ error: 'Invalid tracking number' });
  }
});

app.get('/', (req, res) => res.send('✅ In-memory backend running'));
app.listen(PORT, () => console.log(`🚀 Listening on port ${PORT}`));
