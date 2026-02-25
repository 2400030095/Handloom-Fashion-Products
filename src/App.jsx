import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import BuyerDashboard from './pages/BuyerDashboard';
import ArtisanDashboard from './pages/ArtisanDashboard';
import AdminDashboard from './pages/AdminDashboard';
import MarketingDashboard from './pages/MarketingDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/buyer" element={<BuyerDashboard />} />
            <Route path="/artisan" element={<ArtisanDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/marketing" element={<MarketingDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
