import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css'; // Reuse the existing CSS
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!username || !password || !email) {
            setErrorMessage("All fields are required.");
            return;
        }
        setLoading(true);
        setErrorMessage("");

        try {
            const response = await axios.post('http://localhost:7777/register', {
                username,
                password,
                email,
            });
            navigate('/login'); 
        } catch (err) {
            console.error('Error:', err);
            setErrorMessage("Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='login-wrapper'>
            <div className="form-box register">
                <form className='login-form' onSubmit={handleSubmit}>
                    <h2>Register</h2>

                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    <div className="input-box">
                        <input 
                            type="text" 
                            placeholder='Username' 
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

                    <div className="input-box">
                        <input 
                            type="email" 
                            placeholder='Email' 
                            required 
                            value={email} 
                            onChange={handleEmailChange} 
                        />
                        <FaEnvelope className='icon' />
                    </div>

                    <button type='submit' disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>

                    <div className="register-link">
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
