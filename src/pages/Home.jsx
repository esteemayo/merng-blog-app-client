import { useQuery } from '@apollo/client';
import { Dimmer, Grid, Loader, Transition } from 'semantic-ui-react';

import { useGlobalContext } from '../context/GlobalState';
import { FETCH_BLOGS_QUERY } from '../utils/graphql';
import BlogCard from '../components/BlogCard';
import BlogForm from '../components/BlogForm';

const Home = () => {
  const { user } = useGlobalContext();
  const { loading, data } = useQuery(FETCH_BLOGS_QUERY);

  return (
    <Grid columns={3}>
      <Grid.Row>
        <h1 className='page-title heading-secondary'>Recent Blog Posts</h1>
      </Grid.Row>

      <Grid.Row>
        {user && (
          <Grid.Column>
            <BlogForm />
          </Grid.Column>
        )}

        {loading ? (
          <Dimmer active inverted style={{ marginTop: 20 }}>
            <Loader size='massive'>Loading</Loader>
          </Dimmer>
        ) : (
          <Transition.Group>
            {data &&
              data.getBlogs.map((blog) => (
                <Grid.Column key={blog.id} style={{ marginBottom: 20 }}>
                  <BlogCard {...blog} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
