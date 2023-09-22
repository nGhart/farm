import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteBlog } from '../../slice/blogSlice';
import EditBlog from './EditBlog.jsx';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const SingleBlog = (props) => {
  const dispatch = useDispatch();

  return (
    <Col>
      <Row>
        <div>
          <p>{props.user.title}</p>
        </div>
      </Row>
      <Row>
        <Col xs={8}>
          <section>
            <h6>{props.user.description}</h6>
            <p>Category:{props.user.content}</p>
          </section>
        </Col>
      </Row>
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
        }}
      >
        <EditBlog user={props.user} editBlog={props.editBlog} />

        <button
          style={{
            width: '60px',
            backgroundColor: 'grey',
            color: 'white',
            borderRadius: '5px',
            margin: '2px',
            border: 'none',
          }}
          onClick={() => {
            dispatch(deleteBlog(props.user.id));
          }}
        >
          Delete
        </button>
      </div>
    </Col>
  );
};
export default SingleBlog;
