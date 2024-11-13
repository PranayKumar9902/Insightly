import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url,setCategories) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
        setIsPending(false);
        setError(null);
      } catch (err) {
        setIsPending(false);
        setError(err.message);
      }
    };

    const fetchCategories = async () => {

      axios.get('http://localhost:7777/categories', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          setCategories(response.data.categories);
        })
        .catch(error => {
          console.error('There was an error fetching the data!', error);
        });
    };

    fetchData();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
