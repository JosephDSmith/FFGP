import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import Authorization from './pages/Auth/Authorization';
import Home from './pages/Home/Home';
import Languages from './pages/Languages/Languages';
import Settings from './pages/Settings/Settings';
import './App.css'
// import './tailwind.css'
// comment in or out line 9 to see tailwind
// to build the tailwind.css file, run the following command from the client folder:
// npx tailwindcss build -o src/tailwind.css

export default function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="px-4 pt-24">
          <Routes>
            <Route path="/" element={<Authorization />} />
            <Route path="/home" element={<Home />} />
            <Route path="/languages" element={<Languages />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}