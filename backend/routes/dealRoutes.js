// routes/dealRoutes.js
const express = require('express');
const { randomUUID } = require('crypto');

const router = express.Router();

console.info('[INIT] In-memory dealRoutes loaded');

const REQUIRED_FIELDS = ['sellerName', 'itemName', 'amount', 'feeMode'];

const isValidRequest = (body) => {
  return REQUIRED_FIELDS.every(field => body.hasOwnProperty(field) && body[field]);
};

router.post('/create-deal', (req, res) => {
  const { body, app } = req;
  console.debug('[POST] /api/create-deal', body);

  if (!isValidRequest(body)) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const id = randomUUID();
  const deal = { id, ...body };
  app.locals.dealsStore.set(id, deal);

  res.status(201).json({
    message: 'Deal created successfully',
    dealId: id,
    link: `https://trusteachother.org/pay/${id}`,
  });
});

router.get('/get-deal/:id', (req, res) => {
  const { id } = req.params;
  console.debug('[GET] /api/get-deal', id);

  const deal = req.app.locals.dealsStore.get(id);

  if (!deal) {
    return res.status(404).json({ error: 'Deal not found' });
  }

  res.status(200).json(deal);
});

module.exports = router;
