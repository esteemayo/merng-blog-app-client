import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import SingleBlog from './pages/SingleBlog';
import UpdateBlog from './pages/updateBlog';
import MenuBar from './components/MenuBar';
import AuthRoute from './utils/AuthRoute';
import Footer from './components/Footer';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Home from './pages/Home';

import ProtectedRoute from './utils/ProtectedRoute';
import ApolloProvider from './ApolloProvider';
import { AuthProvider } from './context/auth';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

function App() {
  return (
    <ApolloProvider>
      <AuthProvider>
        <BrowserRouter>
          <Container>
            <MenuBar />
            <Switch>
              <ProtectedRoute path='/blogs/:blogId/edit' component={UpdateBlog} />
              <Route path='/blogs/:blogId' component={SingleBlog} />
              <AuthRoute path='/register' component={Register} />
              <AuthRoute path='/login' component={Login} />
              <Route path='/' exact component={Home} />
              <Redirect from='/blogs' to='/' />
              <Route path='*' component={NotFound} />
            </Switch>
            <Footer />
          </Container>
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default App;
