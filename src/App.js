import React, { useState } from 'react';
import { MainContainer } from './components/StyledComponents';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import BoardsPage from './components/BoardsPage';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState(null);

  return (
    <MainContainer>
      {(currentPage === 'login') && (
        <Login setUser={setUser} setCurrentPage={setCurrentPage} />
      )}

      {(currentPage === 'sign-up') && (
        <SignUp setUser={setUser} setCurrentPage={setCurrentPage} />
      )}

      {(currentPage === 'profile') && (
        <Profile user={user} />
      )}

      {(currentPage === 'boards') && (
        <BoardsPage user={user} />
      )}
    </MainContainer>
  );
}

export default App;
