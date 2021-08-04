import { Button, Icon, Label } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import MyPopup from './../utils/MyPopup';
import { LIKE_BLOG_MUTATION } from '../utils/graphql';

const LikeButton = ({ user, blog: { id, likes, likeCount } }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  const [likeBlog] = useMutation(LIKE_BLOG_MUTATION, {
    variables: {
      blogId: id,
    },
  });

  const likeButton = user ? (
    liked ? (
      <Button color='facebook'>
        <Icon name='thumbs up' />
      </Button>
    ) : (
      <Button color='facebook' basic>
        <Icon name='thumbs up' />
      </Button>
    )
  ) : (
    <Button as={Link} to='/login' color='facebook' basic>
      <Icon name='thumbs up' />
    </Button>
  );

  return (
    <MyPopup content={liked ? 'Unlike' : 'Like'}>
      <Button as='div' labelPosition='right' onClick={likeBlog}>
        {likeButton}
        <Label as='a' basic color={liked ? 'blue' : 'grey'} pointing='left'>
          {likeCount}
        </Label>
      </Button>
    </MyPopup>
  );
};

export default LikeButton;
