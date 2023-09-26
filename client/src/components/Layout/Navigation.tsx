// Navigation.js
import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../functionality/UserContext";

interface NavigationProps {
  // Define any props being passed to Navigation component
}

// created a component to host styling of each link for readability
const NavLink: React.FC<{ to: string; children: string }> = ({
  to,
  children,
}) => (
  <Link
    to={to}
    className="text-black text-l hover:text-red-400 transition-colors duration-300"
  >
    {children}
  </Link>
);

const Navigation: React.FC<NavigationProps> = () => {
  const { user, setUser } = useContext(UserContext)!;
  return (
    <div className="navigation text-center p-3 bg-white">
      <div className="flex justify-center">
        <div className="sm:hidden space-x-2 flex">
          <Link to="/home">
            <img src="/assets/icons/home.png" alt="Languages Icon" className="w-20 h-20"/>
          </Link>
          <Link to="/languages">
            <img src="/assets/icons/languages.png" alt="Languages Icon" className="w-20 h-20"/>
          </Link>
          <Link to="/discover">
            <img src="/assets/icons/discover.png" alt="Discover Icon" className="w-20 h-20"/>
          </Link>
          <Link to="/contribute">
            <img src="/assets/icons/contribute.png" alt="Contribute Icon" className="w-20 h-20"/>
          </Link>
        </div>
        <div className="hidden sm:flex space-x-20">
          <NavLink to="/home">home</NavLink>
          <NavLink to="/languages">languages</NavLink>
          <NavLink to="/discover">discover</NavLink>
          {user && <NavLink to="/contribute">contribute</NavLink>}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
