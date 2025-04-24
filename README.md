# 🤝 TrustEachOther

**TrustEachOther** is a plug-and-play trust and payment solution for online marketplaces like Facebook, WhatsApp, Craigslist, and OfferUp. It helps buyers and sellers transact safely using Stripe payments and shipping verification.

---

## 🚀 Live Demo

🔗 [Visit Demo Pay Link Example](http://localhost:5173/pay/YOUR_DEAL_ID)

---

## ✅ Features

- 🔐 Secure one-time Stripe Checkout links
- 🔗 Unique deal URLs for each transaction
- 🧾 Portable trust verification, platform-independent
- 💳 Stripe integration with test card support
- 📦 Shippo tracking status integration (backend ready)
- ✅ Payment success page after checkout
- 🔧 Built with React + Vite (Frontend), Express (Backend)

---

## ⚙️ Tech Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Payment: Stripe API
- Shipping Status: Shippo API (planned)
- Deployment-ready: GitHub + Vercel (suggested)

---

## 📂 Folder Structure

```
TrustEachOther/
├── backend/             # Express server + Stripe + Shippo endpoints
│   └── .env             # Environment secrets (not committed)
├── trusteachother-frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   └── PayPage.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── index.html
├── README.md
└── .gitignore
```

---

## 🛠️ Setup & Run Locally

1. Clone the repo:
   ```bash
   git clone https://github.com/faruk-om/TrustEachOther.git
   cd TrustEachOther
   ```

2. Setup backend:
   ```bash
   cd backend
   npm install
   node server.js
   ```

3. Setup frontend:
   ```bash
   cd ../trusteachother-frontend
   npm install
   npm run dev
   ```

4. Test a payment:
   - Create a deal via POST `/api/create-deal`
   - Visit `/pay/:dealId` in your browser
   - Use Stripe test card: `4242 4242 4242 4242`

---

## Omar Faruk
