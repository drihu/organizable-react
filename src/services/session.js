import { API_URL } from '../utils';

const loginUser = async (loginInfo) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginInfo),
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

const logoutUser = async (user) => {
  try {
    const response = await fetch(`${API_URL}/logout`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
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

export { loginUser, logoutUser };
