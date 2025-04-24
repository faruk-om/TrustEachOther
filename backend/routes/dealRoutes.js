// routes/dealRoutes.js
const express = require('express');
const { randomUUID } = require('crypto');
const router = express.Router();

// **DEBUG**: show when this file is loaded
console.log("✅ dealRoutes.js (IN-MEMORY) is LOADED");

router.post('/create-deal', (req, res) => {
  // **BIG DEBUG** to confirm handler is running
  console.log("🔥 [IN-MEMORY] /api/create-deal HIT", req.body);

  const { sellerName, itemName, amount, feeMode } = req.body;
  if (!sellerName || !itemName || !amount || !feeMode) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const id   = randomUUID();
  const deal = { id, sellerName, itemName, amount, feeMode };
  req.app.locals.dealsStore.set(id, deal);

  return res.status(201).json({
    message: 'Deal created (in-memory)',
    dealId: id,
    link: `https://trusteachother.org/pay/${id}`
  });
});

router.get('/get-deal/:id', (req, res) => {
  console.log("🔥 [IN-MEMORY] /api/get-deal HIT", req.params.id);
  const deal = req.app.locals.dealsStore.get(req.params.id);
  if (!deal) return res.status(404).json({ error: 'Deal not found' });
  return res.json(deal);
});

module.exports = router;
