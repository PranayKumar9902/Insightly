import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Create.css';

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('mario');
  const [category, setCategory] = useState('General');
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);

  const [existingCategories, setExistingCategories] = useState([]);

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const navigate = useNavigate();


  useEffect(() => {

    if (!token) {

      navigate('/login');
    }

    setAuthor(user.username);

    axios.get('http://localhost:7777/categories', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        setExistingCategories(response.data.categories);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, [token, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const blog = { title, content: body, author, category, user_id: user.id };

    axios.post('http://localhost:7777/blogs', blog, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        console.log('Blog added:', response);
        setTitle('');
        setBody('');
        setCategory('General');

        alert('Blog added successfully!');
        navigate('/');

      })
      .catch(error => {
        console.error('There was an error adding the blog!', error);
      });

  }

  return (
    <div className="create-wrapper">
      <div className="create">
        <h2>Add a New Blog</h2>
        <form onSubmit={handleSubmit}>
          <label>Blog title:</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />


          <label>Blog Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {existingCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>


          <label>
            <span>Add new category : <input
              type="checkbox"
              onChange={(e) => setShowNewCategoryInput(e.target.checked)}
            /></span>
          </label>

          {showNewCategoryInput && (
            <>
              <label>New Category:</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </>
          )}


          <label>Blog body:</label>
          <textarea
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
            style={{ width: '100%', height: '200px' }}
          ></textarea>


          <label>Blog author:</label>
          <input
            type="text"
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            disabled
          />

          <br />

          <button>Add Blog</button>
        </form>
      </div>
    </div>
  );
}

export default Create;