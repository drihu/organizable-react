/** @jsx jsx */
import { useState, useEffect } from 'react';
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { getAllBoards, createBoard, deleteBoard } from '../services/boards';
import square from '../images/square-x.png';
import x from '../images/x.png';

const Form = styled.form`
  margin-bottom: 30px;
`;

const FormCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 40%;
  margin-bottom: 15px;
  padding: 15px 15px 45px;
  background: #0079bf;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 6px 15px;
  background: #02102a;
  border: 0;
  border-radius: 4px;
  color: #ffffff;
  font-size: 14px;
  line-height: 20px;
`;

const ImageX = styled.img`
  width: 12px;
`;

const Input = styled.input`
  width: 100%;
  margin-right: 10px;
  padding: 5px;
  background: rgba(255, 255, 255, 0.25);
  border: 0;
  border-radius: 3px;
  color: #ffffff;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  outline: 0;
  &::placeholder {
    color: rgba(255, 255, 255, 0.75);
  }
`;

const BoardCard = styled.article`
  position: relative;
  padding: 15px;
  border-radius: 5px;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  line-height: 20px;
`;

const BoardX = styled.img`
  position: absolute;
  top: 15px;
  right: 15px;
`;

function BoardForm({ onSubmit }) {
  const [text, setText] = useState('');

  return (
    <Form onSubmit={onSubmit}>
      <FormCard>
        <Input
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Board title"
        />
        <ImageX src={x} alt="cancel" />
      </FormCard>
      <Button type="submit">Create Board</Button>
    </Form>
  );
}

function Board({ board, onDelete }) {
  return (
    <BoardCard style={{ background: board.color }}>
      {board.name}
      <BoardX src={square} alt="square" onClick={onDelete} />
    </BoardCard>
  );
}

function BoardsPage({ user }) {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const fetchBoards = async () => {
      const { data } = await getAllBoards(user);
      setBoards(data);
    };
    fetchBoards();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const input = event.target.elements[0];
    const boardData = {
      name: input.value,
      closed: false,
      starred: false,
    };
    const { data, error } = await createBoard(user, boardData);

    if (data) {
      console.log({ data });
      setBoards([...boards, data]);
      input.value = '';
    } else {
      console.log({ error });
    }
  };

  const handleDelete = async (user, boardId) => {
    const { data, error } = await deleteBoard(user, boardId);

    if (data) {
      const newBoards = boards.filter((board) => board.id !== boardId);
      setBoards(newBoards);
    } else {
      console.log({ error });
    }
  };

  return (
    <div>
      <BoardForm onSubmit={handleSubmit} />
      <div
        css={css`
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 45px;
        `}
      >
        {boards.map((board) => (
          <Board
            board={board}
            key={board.id}
            onDelete={() => handleDelete(user, board.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default BoardsPage;
