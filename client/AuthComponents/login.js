import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import './login.css';
import { FaUser, FaLock } from 'react-icons/fa';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); 

        try {
            const response = await axios.post('http://localhost:7777/login', {
                username,
                password,
            },{
                withCredentials: true
            });

            const { token , user} = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            navigate('/');
        } catch (err) {
            if (err.response) {
                alert(err.response.data.message || 'An error occurred');
            } else if (err.request) {
                alert('No response from server. Please try again.');
            } else {
                alert('Error: ' + err.message);
            }
        }
    };

    return (
        <div className='login-wrapper'>
            <div className="form-box login">
                <form className='login-form' onSubmit={handleSubmit}>
                    <h2>Login</h2>

                    <div className="input-box">
                        <input 
                            type="text" 
                            placeholder='UserName' 
                            required 
                            value={username} 
                            onChange={handleUsernameChange} 
                        />
                        <FaUser className='icon' />
                    </div>

                    <div className="input-box">
                        <input 
                            type="password" 
                            placeholder='Password' 
                            required 
                            value={password} 
                            onChange={handlePasswordChange} 
                        />
                        <FaLock className='icon' />
                    </div>

                    <div className="remember-forgot">
                        <label><input type="checkbox" />Remember Me</label>
                        <Link to="/forgot">Forgot Password</Link>
                    </div>

                    <button type='submit'>Login</button>

                    <div className="register-link">
                        <p>Don't have an account? <Link to="/register">Register</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
