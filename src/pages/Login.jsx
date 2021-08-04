import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Form } from 'semantic-ui-react';

import { LOGIN_USER_MUTATION } from '../utils/graphql';
import { useGlobalContext } from '../context/auth';
import { useForm } from '../utils/useForm';

const Login = () => {
  const { login } = useGlobalContext();

  const { values, handleChange, handleSubmit } = useForm(loginUserCallback, {
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const [loginUser, { loading }] = useMutation(LOGIN_USER_MUTATION, {
    update(_, { data: { login: userData } }) {
      login(userData);
      window.location = '/';
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <div className='form-container'>
      <Form
        onSubmit={handleSubmit}
        noValidate
        className={loading ? 'loading' : ''}
      >
        <h1 className='heading-secondary'>Login</h1>
        <Form.Input
          label='Email'
          id='email'
          placeholder='you@example.com'
          name='email'
          type='email'
          value={values.email}
          error={errors.email ? true : false}
          onChange={handleChange}
          autoFocus
        />
        <Form.Input
          label='Password'
          id='password'
          placeholder='********'
          name='password'
          type='password'
          value={values.password}
          error={errors.password ? true : false}
          onChange={handleChange}
        />
        <Button type='submit' color='blue'>
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className='ui error message' style={{ marginTop: 50 }}>
          <ul className='list'>
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Login;
