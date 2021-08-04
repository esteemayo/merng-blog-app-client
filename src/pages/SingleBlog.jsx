import { useState, useRef } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  Button,
  Card,
  Dimmer,
  Form,
  Grid,
  Icon,
  Image,
  Label,
  Loader,
} from 'semantic-ui-react';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';

import { CREATE_COMMENT_MUTATION, FETCH_BLOG_QUERY } from '../utils/graphql';
import DeleteButton from '../components/DeleteButton';
import { useGlobalContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import MyPopup from '../utils/MyPopup';
import image from '../img/molly.png';

const SingleBlog = ({ history }) => {
  const { user } = useGlobalContext();
  const { blogId } = useParams();

  const [comment, setComment] = useState('');
  const commentInputRef = useRef(null);

  const { data } = useQuery(FETCH_BLOG_QUERY, {
    variables: {
      blogId,
    },
  });

  const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
    update() {
      setComment('');
      commentInputRef.current.blur();
    },
    variables: {
      blogId,
      commentBody: comment,
    },
  });

  function deleteBlogCallback() {
    history.push('/');
  }

  const commentNoun = (comments) => {
    if (comments.length <= 1) return 'Comment';
    return 'Comments';
  };

  // const { id, content, username, comments, likes, likeCount, commentCount, createdAt } = data.getBlog;

  return !data ? (
    <Dimmer active>
      <Loader size='massive'>Loading</Loader>
    </Dimmer>
  ) : (
    <Grid style={{ marginTop: 10 }}>
      <Grid.Row>
        <Grid.Column width={2}>
          <Image src={image} size='massive' float='right' />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card fluid>
            <Card.Content>
              <Card.Header>{data.getBlog.username}</Card.Header>
              <Card.Meta>{moment(data.getBlog.createdAt).fromNow()}</Card.Meta>
              {data.getBlog.content.split('\n').map((p, i) => (
                <Card.Description key={i}>{p}</Card.Description>
              ))}
            </Card.Content>
            <hr />
            <Card.Content extra>
              <LikeButton
                user={user}
                blog={{
                  id: data.getBlog.id,
                  likes: data.getBlog.likes,
                  likeCount: data.getBlog.likeCount,
                }}
              />
              <MyPopup content={`${data.getBlog.comments.length} comments`}>
                <Button
                  as={Link}
                  to={`/blogs/${data.getBlog.id}`}
                  labelPosition='right'
                >
                  <Button basic color='blue'>
                    <Icon name='comments' />
                  </Button>
                  <Label basic color='blue' pointing='left'>
                    {data.getBlog.commentCount}
                  </Label>
                </Button>
              </MyPopup>
              {user && user.username === data.getBlog.username && (
                <>
                  <DeleteButton
                    blogId={data.getBlog.id}
                    callback={deleteBlogCallback}
                  />
                  <MyPopup content='Edit blog post'>
                    <Button
                      as={Link}
                      to={`/blogs/${blogId}/edit`}
                      labelPosition='right'
                      floated='right'
                    >
                      <Button basic color='blue'>
                        <Icon name='pencil' style={{ margin: 0 }} />
                      </Button>
                    </Button>
                  </MyPopup>
                </>
              )}
            </Card.Content>
          </Card>

          {user && (
            <Form>
              <div className='ui action input fluid'>
                <input
                  type='text'
                  name='commentBody'
                  placeholder='Comment...'
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  ref={commentInputRef}
                />
                <button
                  type='submit'
                  className='ui button primary'
                  disabled={comment.trim() === ''}
                  onClick={createComment}
                >
                  Submit
                </button>
              </div>
            </Form>
          )}

          <h2 className='heading-primary'>
            <span>
              {commentNoun(data.getBlog.comments)} (
              {data.getBlog.comments.length})
            </span>
          </h2>
          {data.getBlog.comments.map((comment) => (
            <Card fluid key={comment.id}>
              <Card.Content>
                {user && user.username === comment.username && (
                  <DeleteButton
                    blogId={data.getBlog.id}
                    commentId={comment.id}
                  />
                )}
                <Card.Header>{comment.username}</Card.Header>
                <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                <Card.Description>{comment.commentBody}</Card.Description>
              </Card.Content>
            </Card>
          ))}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default SingleBlog;
