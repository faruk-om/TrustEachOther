// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PayPage from "./pages/PayPage";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h2>🏠 Welcome to TrustEachOther</h2>} />
        <Route path="/pay/:dealId" element={<PayPage />} />
        <Route path="/success" element={<h2>✅ Payment Successful!</h2>} />
        <Route path="*" element={<h2>❌ 404 – Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
