import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PayPage from './pages/PayPage'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/pay/:dealId" element={<PayPage />} />
      <Route path="*" element={<h1>Welcome to TrustEachOther</h1>} />
    </Routes>
  </BrowserRouter>
)
