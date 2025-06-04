import { Link } from "react-router-dom";
import { useAuth } from '../../context/authProvider';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'

export default function Navbar() {
  const { currentUser, logOut } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      navigate("/");
      await logOut();
    } catch {
        console.error('Error logout');
    }
  }
  return (
    <nav className="navbar">
        <ul>
          {!currentUser ? (
                <>
                    
                    <li className="titol"><Link to="/">Despesapp</Link></li>
                    <li><Link to="/">Inici</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                </>
            ) : (
                <>
                    <li className="titol"><Link to="/">Despesapp</Link></li>
                    <li><Link to="/">Inici</Link></li>
                    <li><Link to="/projects">Projectes</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                    <span className="navbar-username">Hola, <b>{currentUser.username || currentUser.email}</b></span>
                </>
            )}
        </ul>
    </nav>
  )
}
