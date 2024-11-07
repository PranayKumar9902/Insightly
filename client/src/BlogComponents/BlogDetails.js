import { useParams , useNavigate } from "react-router-dom";
import useFetch from "../useFetch";

const BlogDetails = () => {
  const { id } = useParams();

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  if (!token) {
    navigate('/login');
  }

  const { data: blog, error, isPending } = useFetch('http://localhost:7777/blogs/' + id);

  return (
    <div className="blog-details">
      { isPending && <div>Loading...</div> }
      { error && <div>{ error }</div> }
      { blog && (
        <article className="blog-article">
          <h2>{ blog.title }</h2>
          <div>{ blog.content }</div>
          <p>Written by { blog.author }</p>
        </article>
      )}
    </div>
  );
}
 
export default BlogDetails;