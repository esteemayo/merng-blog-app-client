import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Form } from 'semantic-ui-react';

import { REGISTER_USER_MUTATION } from '../utils/graphql';
import { useGlobalContext } from '../context/Global';
import { useForm } from '../utils/useForm';

const Register = () => {
  const { login } = useGlobalContext();

  const initialState = {
    name: '',
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  };

  const { values, handleChange, handleSubmit } = useForm(
    registerUserCallback,
    initialState
  );

  const [errors, setErrors] = useState({});

  const [registerUser, { loading }] = useMutation(REGISTER_USER_MUTATION, {
    update(_, { data: { register: userData } }) {
      login(userData);
      window.location = '/';
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function registerUserCallback() {
    registerUser();
  };

  return (
    <div className='form-container'>
      <Form
        onSubmit={handleSubmit}
        className={loading ? 'loading' : ''}
        noValidate
      >
        <h1 className='heading-secondary'>Register</h1>
        <Form.Input
          label='Name'
          id='name'
          placeholder='Name'
          name='name'
          type='text'
          value={values.name}
          error={errors.name ? true : false}
          onChange={handleChange}
        />
        <Form.Input
          label='Username'
          id='username'
          placeholder='Username'
          name='username'
          type='text'
          value={values.username}
          error={errors.username ? true : false}
          onChange={handleChange}
        />
        <Form.Input
          label='Email'
          id='email'
          placeholder='you@example.com'
          name='email'
          type='email'
          value={values.email}
          error={errors.email ? true : false}
          onChange={handleChange}
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
        <Form.Input
          label='Confirm Password'
          id='passwordConfirm'
          placeholder='********'
          name='passwordConfirm'
          type='password'
          value={values.passwordConfirm}
          error={errors.passwordConfirm ? true : false}
          onChange={handleChange}
        />
        <Button type='submit' color='blue'>
          Register
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

export default Register;
