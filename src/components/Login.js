import React, { useState } from 'react';
import { FormContainer, PrimaryButton, Link, Form } from './StyledComponents';
import FormInput from './FormInput';
import { loginUser } from '../services/session';

function Login({ setUser, setCurrentPage }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    const { data, error } = await loginUser(formData);

    if (data) {
      console.log({ data });
      setUser(data);
      setCurrentPage('boards');
    } else {
      console.log({ error });
      setError(error);
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={onSubmit}>
        <FormInput
          label="Username"
          name="username"
          value={formData.username}
          onChange={onChange}
        />
        <FormInput
          label="Password"
          name="password"
          value={formData.password}
          onChange={onChange}
          type="password"
        />
        <PrimaryButton style={{ marginTop: '16px' }}>Login</PrimaryButton>
      </Form>
      {error && <p>{error}</p>}
      <Link style={{ marginTop: '16px' }}>Create an Account</Link>
    </FormContainer>
  );
}

export default Login;
