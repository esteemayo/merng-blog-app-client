import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Confirm, Icon } from 'semantic-ui-react';

import {
  DELETE_COMMENT_MUTATION,
  DELETE_BLOG_MUTATION,
  FETCH_BLOGS_QUERY,
} from '../utils/graphql';
import MyPopup from '../utils/MyPopup';

const DeleteButton = ({ blogId, commentId, callback }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_BLOG_MUTATION;

  const [deleteBlogOrComment] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false);
      if (!commentId) {
        // Remove blog from cache
        const data = proxy.readQuery({ query: FETCH_BLOGS_QUERY });
        const newData = data.getBlogs && data.getBlogs.filter((b) => b.id !== blogId);
        proxy.writeQuery({ query: FETCH_BLOGS_QUERY, data: { newData } });
      }

      if (callback) callback();
    },
    variables: {
      blogId,
      commentId,
    },
    refetchQueries: [{ query: FETCH_BLOGS_QUERY }],
  });

  return (
    <>
      <MyPopup content={commentId ? 'Delete comment' : 'Delete blog post'}>
        <Button
          as='div'
          color='red'
          floated='right'
          onClick={() => setConfirmOpen(true)}
        >
          <Icon name='trash' style={{ margin: 0 }} />
        </Button>
      </MyPopup>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deleteBlogOrComment}
      />
    </>
  );
};

export default DeleteButton;
