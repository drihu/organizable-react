import React, { useState } from 'react';
import { FormContainer, PrimaryButton, Link, Form } from './StyledComponents';
import FormInput from './FormInput';
import { createUser } from '../services/users';

function SignUp({ setUser, setCurrentPage }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
  });
  const [error, setError] = useState(null);

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    const { data, error } = await createUser(formData);

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
      <Form onSubmit={handleSubmit}>
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
        <FormInput
          label="Email"
          name="email"
          value={formData.email}
          onChange={onChange}
          type="email"
        />
        <FormInput
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={onChange}
        />
        <FormInput
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={onChange}
        />
        <PrimaryButton style={{ marginTop: '16px' }}>Create!</PrimaryButton>
      </Form>
      {error && <p>{error}</p>}
      <Link style={{ marginTop: '16px' }}>or login with existing user</Link>
    </FormContainer>
  );
}

export default SignUp;
