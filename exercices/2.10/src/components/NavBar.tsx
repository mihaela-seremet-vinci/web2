import { Link } from "react-router-dom";
import "./App.css";


const NavBar = () => (

  <nav className="navbar">
    <Link to="/">Home</Link>
    <Link to="/cinemas">Cinemas</Link>
    <Link to="/movie-list">Fav movies</Link>
   
  </nav>
);

export default NavBar;