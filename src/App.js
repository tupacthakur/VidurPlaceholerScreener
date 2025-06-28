import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import SentimentDashboard from './SentimentDashboard';

const App = () => {
  return (
    <Router>
      <div className="bg-white shadow border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">Vidur Research</h1>
        <nav className="space-x-4">
          <Link to="/" className="text-blue-600 hover:underline">IPO Dashboard</Link>
          <Link to="/sentiment" className="text-blue-600 hover:underline">Sentiment Analysis</Link>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/sentiment" element={<SentimentDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
