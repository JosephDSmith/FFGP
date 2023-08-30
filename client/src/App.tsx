import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Authorization from './pages/Auth/Authorization';
import Home from './pages/Home/Home';
import Languages from './pages/Languages/Languages';
import Settings from './pages/Settings/Settings';

export default function App() {

  return (
    <div className="App">
      <Router>
        <Header/>
          <Routes>
            <Route path="/" element={<Authorization />} />
            <Route path="/home" element={<Home />} />
            <Route path="/languages" element={<Languages />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        <Footer/>
      </Router>

    </div>
  );
}