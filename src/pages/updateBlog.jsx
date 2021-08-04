import { useParams } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';
import { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import { FETCH_BLOG_QUERY, UPDATE_BLOG_MUTATION } from '../utils/graphql';

const UpdateBlog = () => {
  const { blogId } = useParams();
  const contentRef = useRef(null);
  const [content, setContent] = useState('');

  const { data } = useQuery(FETCH_BLOG_QUERY, {
    variables: {
      blogId
    }
  });

  useEffect(() => {
    setContent(data && data.getBlog.content);
  }, [data]);

  const [updateBlog, { error }] = useMutation(UPDATE_BLOG_MUTATION, {
    update() {
      window.location.replace(`/blogs/${blogId}`);
    },
    variables: {
      content,
      blogId
    },
  });

  const handleSubmit = e => {
    e.preventDefault();
    updateBlog();
  };

  const handleError = () => {
    return error ? true : false
  };

  return (
    <div className='form-container' style={{ marginTop: 30 }}>
      <Form onSubmit={handleSubmit}>
        <h2 className='heading-tertiary'>Update</h2>
        <div className='ui action input fluid'>
          <Form.Field>
            <input
              type='text'
              name='commentBody'
              placeholder='Comment...'
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onError={handleError}
              ref={contentRef}
            />
            <Button
              type='submit'
              color='blue'
              disabled={content === ''}
            >
              Submit
            </Button>
          </Form.Field>
        </div>
      </Form>
      {error && (
        <div className='ui error message'>
          <ul className='list'>
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UpdateBlog;
