import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import Authorization from './pages/Authorization';
import Home from './pages/Home';
import Languages from './pages/Languages';
import './App.css'
import Discover from './pages/Discover';
import Contribute from './pages/Contribute';
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
            <Route path="/discover" element={<Discover />} />
            <Route path="/contribute" element={<Contribute />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}