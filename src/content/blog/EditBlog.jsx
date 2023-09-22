import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editBlog } from '../../slice/blogSlice';
import { Modal, Form, Button } from 'react-bootstrap';

const EditBlog = (props) => {
  const [blogs, setBlogs] = useState({
    title: props.user.title,
    description: props.user.description,
    content: props.user.content,
    _id: props.user._id,
  });

  const dispatch = useDispatch();
  //console.log(blogs);

  const handleChange = (e) => {
    e.preventDefault();
    setBlogs({ ...blogs, [e.target.name]: e.target.value });
  };
  const handleEdit = (e) => {
    e.preventDefault();
    let newBlog = {
      title: blogs.title,
      description: blogs.description,
      content: blogs.content,
      _id: props.user._id,
    };
    dispatch(editBlog({ _id: props.user._id, newBlog }));
    handleEditClose();
  };

  const [show, setShow] = useState(false);
  const handleEditClose = () => setShow(false);
  const handleEditShow = () => setShow(true);

  return (
    <>
      <button onClick={handleEditShow}>Edit</button>
      <Modal
        show={show}
        onHide={handleEditClose}
        backdrop="static"
        keyboard={false}
      >
        <Form onSubmit={handleEdit}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Title"
              onChange={handleChange}
              name="title"
              value={blogs.title}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description"
              onChange={handleChange}
              name="description"
              value={blogs.description}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="content">
            <Form.Label>Content</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter content"
              onChange={handleChange}
              name="content"
              value={blogs.content}
              required
            />
          </Form.Group>
          <Form.Group>
            <Button type="submit" onClick={handleEditClose}>
              <span>Cancel</span>
            </Button>
            <Button type="submit" style={{ width: '150px' }}>
              <span>Edit</span>
            </Button>
          </Form.Group>
        </Form>
      </Modal>
    </>
  );
};

export default EditBlog;
