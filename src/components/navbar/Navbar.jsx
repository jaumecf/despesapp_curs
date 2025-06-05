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
        <ul className="navbar-list">
          <li className="titol"><Link to="/">Despesapp</Link></li>
          <li><Link to="/">Inici</Link></li>
          {!currentUser ? (
                <>
                  <li className="spacer"></li>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/register">Register</Link></li>
                </>
            ) : (
                <>
                  <li><Link to="/projects">Projectes</Link></li>
                  <li className="spacer"></li>
                  <li><button className="logout-button" onClick={handleLogout}>Logout</button></li>
                  <li><span className="navbar-username">Hola, <b>{currentUser.username || currentUser.email}</b></span></li>
                </>
            )}
        </ul>
    </nav>
  )
}
