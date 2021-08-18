import { useMutation } from '@apollo/client';
import { Button, Form } from 'semantic-ui-react';

import { CREATE_BLOG_MUTATION, FETCH_BLOGS_QUERY } from '../utils/graphql';
import { useForm } from '../utils/useForm';

const BlogForm = () => {
  const { values, handleChange, handleSubmit } = useForm(createBlogCallback, {
    content: '',
  });

  const [createBlog, { error }] = useMutation(CREATE_BLOG_MUTATION, {
    update(proxy, result) {
      const data = proxy.readQuery({ query: FETCH_BLOGS_QUERY });
      const newData = [result.data.createBlog, ...data.getBlogs];
      proxy.writeQuery({ query: FETCH_BLOGS_QUERY, data: { newData } });

      values.content = '';
    },
    variables: values,
    refetchQueries: [{ query: FETCH_BLOGS_QUERY }],
  });

  function createBlogCallback() {
    createBlog();
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h2>Create a blog post:</h2>
        <Form.Field>
          <Form.Input
            placeholder='Content...'
            type='text'
            name='content'
            value={values.content}
            error={error ? true : false}
            onChange={handleChange}
          />
          <Button
            type='submit'
            color='blue'
            disabled={values.content.trim() === ''}
          >
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className='ui error message' style={{ marginBottom: 20 }}>
          <ul className='list'>
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
};

export default BlogForm;
