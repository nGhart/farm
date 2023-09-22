// import { createSlice } from '@reduxjs/toolkit';
// export const initialState = {
//   blogs: [
//     {
//       title: 'Work',
//       description: 'how are all the good',
//       content: 'good',
//       id: '2343d%sdfvv',
//     },
//     {
//       title: 'Home',
//       description: 'how are all the good',
//       content: 'okay',
//       id: '2343dsd@343fvv',
//     },
//   ],
// };
// const blogSlice = createSlice({
//   name: 'blogs',
//   initialState,
//   reducers: {
//     addBlog: (state, action) => {
//       state.blogs = [...state.blogs, action.payload];
//     },
//     deleteBlog: (state, action) => {
//       state.blogs = state.blogs.filter((item) => {
//         if (item.id !== action.payload) {
//           return item;
//         }
//       });
//     },
//     editBlog: (state, action) => {
//       state.blogs = state.blogs.map((item) => {
//         if (item.id === action.payload.id) {
//           return action.payload.newBlog;
//         }
//         return item;
//       });
//     },
//   },
// });
// export const { addBlog, deleteBlog, editBlog } = blogSlice.actions;
// export default blogSlice.reducer;
// blogSlice.js

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const initialState = {
  blogs: [],
  loading: false,
  error: null,
};

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      state.blogs = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    editBlog: (state, action) => {
      // Ensure that 'state.blogs' is an array before mapping
      if (Array.isArray(state.blogs)) {
        const updatedBlogs = state.blogs.map((item) => {
          if (item._id === action.payload.newBlog._id) {
            return action.payload.newBlog;
          }
          return item;
        });
        state.blogs = updatedBlogs;
        console.log(state.blogs);
      }
    },
  },
});

export const { setBlogs, setLoading, setError, editBlog } = blogSlice.actions;

export const fetchBlogs = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get('http://localhost:2020/blog');
    dispatch(setBlogs(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const createBlog = (blogData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:2020/blog', blogData);
    dispatch(fetchBlogs());
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const updateBlog = (blogData) => async (dispatch) => {
  try {
    const response = await axios.put(
      `http://localhost:2020/blog/${blogData._id}`,
      blogData
    );
    dispatch(editBlog({ newBlog: response.data }));
    dispatch(fetchBlogs());
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const deleteBlog = (blogId) => async (dispatch) => {
  try {
    const response = await axios.delete(`http://localhost:2020/blog/${blogId}`);
    dispatch(fetchBlogs());
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default blogSlice.reducer;
