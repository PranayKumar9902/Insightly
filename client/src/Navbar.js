import { Link, useNavigate } from "react-router-dom";
import { ImProfile } from "react-icons/im";


const Navbar = () => {

  const navigate = useNavigate();

  const onProfileClick = () => {

    const token = localStorage.getItem('token');
    console.log('token', token);
    if (!token) {
      navigate('/login');
    } else {
      navigate('/profile');
    }
  }

  return (
    <nav className="navbar">
      <h1>Insightly</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/create" style={{
          color: 'white',
          backgroundColor: '#f1356d',
          borderRadius: '8px'
        }}>New Blog</Link>
        <button onClick={onProfileClick}><ImProfile /></button>
      </div>
    </nav>
  );
}

export default Navbar;