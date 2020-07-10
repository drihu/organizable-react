import React, { useState } from 'react';
import FormInput from './FormInput';
import {
  FormContainer,
  Button,
  PrimaryButton,
  WarningButton,
  Link,
  Form,
} from './StyledComponents';
import { updateUser, deleteUser } from '../services/users';
import { logoutUser } from '../services/session';

function Profile({ setCurrentPage, user, setUser }) {
  const initialData = {
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  };

  const [formData, setFormData] = useState(initialData);
  const [error, setError] = useState(null);
  const [edit, setEdit] = useState(false);

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    const { data, error } = await deleteUser(user);
    if (data) {
      setCurrentPage('login');
      setUser(null);
    } else {
      setError(error);
      console.log(error);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    const { data, error } = await logoutUser(user);
    if (data) {
      setCurrentPage('login');
      setUser(null);
    } else {
      setError(error);
      console.log(error);
    }
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    const { data, error } = await updateUser(user, formData);
    if (data) {
      setUser(data);
      setEdit(false);
    } else {
      setError(error);
    }
  };

  return (
    <FormContainer>
      <Form>
        <FormInput
          label="Username"
          name="username"
          value={formData.username}
          onChange={onChange}
          disabled={!edit}
        />
        <FormInput
          label="Email"
          name="email"
          value={formData.email}
          onChange={onChange}
          type="email"
          disabled={!edit}
        />
        <FormInput
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={onChange}
          disabled={!edit}
        />
        <FormInput
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={onChange}
          disabled={!edit}
        />
        <div
          style={{
            marginTop: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          {edit ? (
            <PrimaryButton onClick={handleEdit}>Save</PrimaryButton>
          ) : (
            <Button
              onClick={(e) => {
                e.preventDefault();
                setEdit(true);
              }}
            >
              Edit
            </Button>
          )}

          {edit ? (
            <WarningButton onClick={(e) => {
              e.preventDefault();
              setEdit(false);
              setFormData(initialData);
            }}>Cancel</WarningButton>
          ) : (
            <WarningButton onClick={handleDelete}>Delete</WarningButton>
          )}
        </div>
      </Form>
      {error && <p>{error}</p>}
      <Link style={{ marginTop: '16px' }} onClick={handleLogout}>
        Logout
      </Link>
    </FormContainer>
  );
}

export default Profile;
