import React from 'react';
import { v1 as uuid } from 'uuid';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { createBlog } from '../../slice/blogSlice.jsx';
import Row from 'react-bootstrap/Row';
//import

const AddBlog = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [state, setState] = useState({
    title: '',
    description: '',
    content: '',
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBlog = {
      title: state.title,
      description: state.description,
      content: state.content,
      id: uuid(),
    };
    dispatch(createBlog(newBlog));
    setState({
      title: '',
      description: '',
      content: '',
    });

    handleClose();
  };

  return (
    <Row>
      <Button variant="primary" onClick={handleShow} className="addButton">
        <span>add</span>
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              required
              type="text"
              name="title"
              value={state.title}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              type="text"
              name="description"
              value={state.description}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicContent">
            <Form.Label>Content</Form.Label>
            <Form.Control
              required
              type="text"
              name="content"
              value={state.content}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Button type="submit">
              <span onClick={handleClose}>back</span>
            </Button>
            <Button type="submit">
              <span type="submit">add</span>
            </Button>
          </Form.Group>
        </Form>
      </Modal>
    </Row>
  );
};
export default AddBlog;
