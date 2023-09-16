import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { UserContext } from './functionality/UserContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Authorization from './pages/Authorization';
import Home from './pages/Home';
import Languages from './pages/Languages';
import './App.css'
import Discover from './pages/Discover';
import Contribute from './pages/Contribute';
import UserSidebar from './components/UserSidebar/UserSidebar';
// import './tailwind.css'
// comment in or out line 9 to see tailwind
// to build the tailwind.css file, run the following command from the client folder:
// npx tailwindcss build -o src/tailwind.css

export default function App() {
  const { user } = useContext(UserContext) || { user: null }; 
  
  return (
    <div className="App">
      <Router>
        <Header />
        {user && <UserSidebar user={user}/>}
        <div className="">
          <Routes>
            {/* Render the Authorization component only if no user is logged in, otherwise render Home*/}
              {/* {user === null ? (
                <Route path="/" element={<Authorization />} />
              ) : (
                <Route path="/" element={<Home />} />
              )} */}
            <Route path="/" element={<Authorization />} />
            <Route path="/home" element={<Home />} />
            <Route path="/languages" element={<Languages />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/discover/:tagId" element={<Discover />} />
            <Route path="/contribute" element={<Contribute />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}