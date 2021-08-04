import { Button, Card, Icon, Image, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { useGlobalContext } from '../context/auth';
import DeleteButton from './DeleteButton';
import MyPopup from '../utils/MyPopup';
import LikeButton from './LikeButton';
import image from '../img/molly.png';

const BlogCard = ({
  content,
  createdAt,
  username,
  commentCount,
  id,
  likes,
  likeCount,
}) => {
  const { user } = useGlobalContext();

  return (
    <Card.Group>
      <Card fluid>
        <Card.Content>
          <Image floated='right' size='mini' src={image} />
          <Card.Header>{username}</Card.Header>
          <Card.Meta as={Link} to={`/blogs/${id}`}>
            {moment(createdAt).fromNow(true)}
          </Card.Meta>
          <Card.Description>
            {content.split(' ').splice(0, 10).join(' ')}...
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div>
            <LikeButton user={user} blog={{ id, likes, likeCount }} />
            <MyPopup content='Comment on blog post'>
              <Button as={Link} to={`/blogs/${id}`} labelPosition='right'>
                <Button basic color='blue'>
                  <Icon name='comments' />
                </Button>
                <Label basic color='blue' pointing='left'>
                  {commentCount}
                </Label>
              </Button>
            </MyPopup>
            {user && user.username === username && <DeleteButton blogId={id} />}
          </div>
        </Card.Content>
      </Card>
    </Card.Group>
  );
};

export default BlogCard;
