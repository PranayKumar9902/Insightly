import BlogList from "./BlogList";
import useFetch from "../useFetch";
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const { error, isPending, data: blogs } = useFetch('http://localhost:7777/blogs');

  const handleChangeCategory = (e) => {

    const category = e.target.value;
    console.log('Category:', category);

  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:7777/categories', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(response.data.categories);
      } catch (error) {
        console.error('There was an error fetching the data!', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="home-wrapper">
      <div className="home">
        {error && <div>{error}</div>}
        {isPending && <div>Loading...</div>}
        <div className="category-selector">
          <label htmlFor="choose-category-to-read">Choose a category to read:</label>
          <select name="choose-category" id="choose-category-to-read" onChange={handleChangeCategory}>
            <option value="all">All</option>
            {categories.map(category => (
              <option value={category} key={category}>{category}</option>
            ))}

          </select>
        </div>
        {blogs && <BlogList blogs={blogs}  />}
      </div>
    </div>
  );
}

export default Home;