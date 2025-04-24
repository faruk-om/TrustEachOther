import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe("pk_test_51RFeQMBUse0CwuKaNZmkYhduyw7eGy1Bll7DPurMh3OrG10uzYr9ydCnxZJYEEdUaBJDf5laBe4ehcgC0hISbkWc00C8YJMNek")

function PayPage() {
  const { dealId } = useParams()
  const [deal, setDeal] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:5000/api/get-deal/${dealId}`)
      .then(res => res.json())
      .then(data => setDeal(data))
  }, [dealId])

  const handleCheckout = async () => {
    const res = await fetch(`http://localhost:5000/api/create-checkout-session/${dealId}`, {
      method: 'POST'
    })
    const data = await res.json()
    const stripe = await stripePromise
    await stripe.redirectToCheckout({ sessionId: data.id })
  }

  if (!deal) return <h3>Loading deal...</h3>

  return (
    <div style={{ padding: 20 }}>
      <h1>Pay for: {deal.itemName}</h1>
      <p>Amount: ${(deal.amount / 100).toFixed(2)}</p>
      <p>Fee Split: {deal.feeMode}</p>
      <button onClick={handleCheckout}>Pay Securely with Stripe</button>
    </div>
  )
}

export default PayPage

