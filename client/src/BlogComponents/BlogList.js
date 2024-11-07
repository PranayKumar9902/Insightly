import { Link } from 'react-router-dom';
import './BlogList.css';

const BlogList = ({ blogs }) => {

  return (

    <div className="blog-list">

      {blogs.map(blog => (
        <div className="blog-preview" key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            <h2>{blog.title}</h2>
            <br />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', margin: '10px' }}>
              <span>Written by {blog.author}</span>
              <br />
              <span style={{ alignSelf: 'flex-end' }}>Category: {blog.category}</span>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default BlogList;
