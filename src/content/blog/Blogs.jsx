// import React from 'react';
// import Row from 'react-bootstrap/Row';
// import SingleBlog from './SingleBlog.jsx';
// import { useDispatch, useSelector } from 'react-redux';

// const Blogs = () => {
//   const state = useSelector((state) => {
//     return state.blogReducer;
//   });

//   return (
//     <>
//       <Row>
//         {state.blogs.map((item) => {
//           return <SingleBlog key={item.id} user={item} />;
//         })}
//       </Row>
//     </>
//   );
// };

// export default Blogs;

import React, { useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import SingleBlog from './SingleBlog.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '../../slice/blogSlice.jsx'; // Replace with the correct import

const Blogs = () => {
  const blogs = useSelector((state) => state.blogReducer.blogs);

  const error = useSelector((state) => state.blogReducer.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogs()).catch((error) => {
      dispatch(setError(error.message));
    });
    console.log(blogs);
    console.log(typeof blogs);
    console.log(blogs.data);
    console.log(typeof blogs.data);
  }, [dispatch]);
  useEffect(() => {
    console.log(blogs.data);
  }, [blogs]);
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <Row>
        {Array.isArray(blogs.data) ? (
          blogs.data.map((item) => {
            return <SingleBlog key={item._id} user={item} />;
          })
        ) : (
          <p>Loading...</p>
        )}
      </Row>
    </>
  );
};

export default Blogs;
