import { API_URL } from '../utils';

const objectToSnake = (obj) => {
  const newObj = {};
  for (let prop in obj) {
    newObj[prop.replace(/[A-Z]/, (x) => '_' + x.toLowerCase())] = obj[prop];
  }
  return newObj;
};

const createUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: objectToSnake(userData) }),
    });
    const data = await response.json();

    if (response.ok) {
      return { response, data };
    } else {
      return { error: data.errors.message };
    }
  } catch (error) {
    return { error: 'Network error' };
  }
};

const updateUser = async (user, newData) => {
  try {
    const response = await fetch(`${API_URL}/users/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token token="${user.token}"`,
      },
      body: JSON.stringify({ user: objectToSnake(newData) }),
    });
    const data = await response.json();

    if (response.ok) {
      return { data };
    } else {
      return { error: data.errors.message };
    }
  } catch (error) {
    return { error: 'Network error' };
  }
};

const deleteUser = async (user) => {
  try {
    const response = await fetch(`${API_URL}/users/${user.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token token="${user.token}"`,
      },
    });

    if (response.ok) {
      return { data: true };
    } else {
      const data = await response.json();
      return { error: data.errors.message };
    }
  } catch (error) {
    console.log(error);
    return { error: 'Network error' };
  }
};

export { createUser, updateUser, deleteUser };
