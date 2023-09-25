import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './functionality/UserContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Authorization from './pages/Authorization';
import Home from './pages/Home';
import Languages from './pages/Languages';
import Discover from './pages/Discover';
import Contribute from './pages/Contribute';
import UserSidebar from './components/UserSidebar/UserSidebar';
import './App.css'
import UserContributions from './pages/UserContributions';

export default function App() {
  const { user } = useContext(UserContext) || { user: null }; 
  
  return (
    <div className="App">
      <Router>
        <Header />
        {user && <UserSidebar user={user}/>}
        {!user && <div className="mt-20"></div>}
        <div className="mt-30 p-20">
          <Routes>
            <Route path="/" element={<Authorization />} />
            <Route path="/home" element={<Home />} />
            <Route path="/languages" element={<Languages />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/discover/:tagId" element={<Discover />} />
            {user && <Route path="/contributions" element={<UserContributions />} />}
            {user && <Route path="/contribute" element={<Contribute />} />}
            
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}