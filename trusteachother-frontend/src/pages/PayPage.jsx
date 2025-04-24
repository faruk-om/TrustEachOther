import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

// Load your Stripe publishable key
const stripePromise = loadStripe('pk_test_51RFeQMBUse0CwuKaNZmkYhduyw7eGy1Bll7DPurMh3OrG10uzYr9ydCnxZJYEEdUaBJDf5laBe4ehcgC0hISbkWc00C8YJMNek');

function PayPage() {
  const { dealId } = useParams();
  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch deal details by ID
  useEffect(() => {
    const fetchDeal = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/get-deal/${dealId}`);
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setDeal(data);
      } catch (err) {
        console.error("❌ Failed to load deal:", err);
        setError("Failed to load deal. Please check the deal link.");
      } finally {
        setLoading(false);
      }
    };
    fetchDeal();
  }, [dealId]);

  // Handle Stripe checkout
  const handleCheckout = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/create-checkout-session/${dealId}`, {
        method: 'POST'
      });
      const data = await res.json();

      if (data.error) {
        console.error("❌ Stripe session error:", data.error);
        alert(`Checkout error: ${data.error}`);
        return;
      }

      const stripe = await stripePromise;
      const result = await stripe.redirectToCheckout({ sessionId: data.id });

      if (result.error) {
        console.error("⚠️ Stripe redirect error:", result.error.message);
        alert(result.error.message);
      }
    } catch (err) {
      console.error("🔥 Stripe checkout failed:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  // Render loading or error
  if (loading) return <h2>Loading deal...</h2>;
  if (error) return <h2 style={{ color: 'red' }}>{error}</h2>;

  return (
    <div style={{ padding: 30 }}>
      <h1>Pay for: {deal.itemName}</h1>
      <p><strong>Seller:</strong> {deal.sellerName}</p>
      <p><strong>Amount:</strong> ${(deal.amount / 100).toFixed(2)}</p>
      <p><strong>Fee Mode:</strong> {deal.feeMode}</p>

      <button onClick={handleCheckout} style={{ marginTop: '20px', padding: '10px 20px' }}>
        💳 Pay Securely with Stripe
      </button>
    </div>
  );
}

export default PayPage;
