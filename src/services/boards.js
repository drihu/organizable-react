import { API_URL } from '../utils';

const getAllBoards = async (user) => {
  try {
    const response = await fetch(`${API_URL}/boards`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token token="${user.token}"`,
      },
    });
    const data = await response.json();

    if (response.ok) {
      console.log({ data });
      return { data };
    } else {
      return { error: data.errors.message };
    }
  } catch (error) {
    return { error: 'Network error' };
  }
};

const createBoard = async (user, boardData) => {
  try {
    const response = await fetch(`${API_URL}/boards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token token="${user.token}"`,
      },
      body: JSON.stringify(boardData),
    });
    const data = await response.json();

    if (response.ok) {
      console.log({ data });
      return { data };
    } else {
      return { error: data.errors.message };
    }
  } catch (error) {
    return { error: 'Network error' };
  }
};

const deleteBoard = async (user, boardId) => {
  console.log({ user });
  console.log({ boardId });
  try {
    const response = await fetch(`${API_URL}/boards/${boardId}`, {
      method: 'DELETE',
      headers: {
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
    return { error: 'Network error' };
  }
};

export { getAllBoards, createBoard, deleteBoard };
