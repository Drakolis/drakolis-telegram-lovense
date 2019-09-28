import React from 'react';
import styled from 'styled-components';
import UserList from './components/UserList';
import NavBar from './components/NavBar';
import ModalLovense from './components/ModalLovense';

const FlexRoot = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <FlexRoot>
      <NavBar />
      <UserList />
      <ModalLovense />
    </FlexRoot>
  );
}

export default App;
