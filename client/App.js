import Navbar from './Navbar';
import Home from './BlogComponents/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Create from './BlogComponents/Create';
import BlogDetails from './BlogComponents/BlogDetails';
import Login from './AuthComponents/login';
import Register from './AuthComponents/register';
import Profile from './ProfileComponents/profile';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<Create />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;