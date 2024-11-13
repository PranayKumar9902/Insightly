import './profile.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import TemplateModal from '../templates/pop-up';
import { FaPlus } from "react-icons/fa";

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
            setError("No token found");
            setLoading(false);
            return;
        }

        const fetchUserProfile = async () => {
            try {
                const response = await axios.get('http://localhost:7777/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUserData(response.data.userProfile);
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    setError("Token is expired or invalid");
                    navigate('/login');
                } else {
                    setError("Error fetching data");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [navigate]);

    
    const [show, setShow] = useState(false);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    // Destructure userData
    const handleLogout = () => {

        setShow(true);
    }


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if (!userData) {
        return <div>No user data available</div>;
    }

    const { username, email, blogs, categories } = userData;

    return (
        <div className="profile-wrapper">

            <div className="profile-page">

                <div className="logout-profile">
                    <button className="logout-profile" onClick={handleLogout}>LogOut</button>
                </div>

                <div className="header">
                    <h3>UserName : {username}</h3>
                </div>

                <div className="contact-info">
                    <p><strong>Email:</strong> {email}</p>
                </div>

                <div className="profile-categories">
                    <strong>Categories Written In:</strong>
                    <ul>
                        {categories.map((category, index) => (
                            <li key={index}>{category}</li>
                        ))}
                    </ul>
                </div>

                <div className="blog-stats">
                    <div className="blog-preview-container">
                        <p> <strong>Blogs Written :</strong></p>
                        {blogs.map(blog => (
                            <div className="blog-preview" key={blog.id}>
                                <Link to={`/blogs/${blog.id}`}>
                                    <h2>{blog.title}</h2>
                                    <br />
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', margin: '10px' }}>
                                        <span style={{ alignSelf: 'flex-end' }}>Category: {blog.category}</span>
                                    </div>
                                </Link>
                            </div>
                        ))}

                        <div className="blog-preview" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Link to={`/create`}>
                                <FaPlus style={{ height: '50px', width: '50px' }} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <TemplateModal textbody={`Are You Sure ?`} show={show} handleClose={handleClose} handleShow={handleShow} />
        </div>
    );
}

export default Profile;
