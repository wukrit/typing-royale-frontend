import React from 'react';
import useUser from './Hooks/useUser'
import usePrompt from './Hooks/usePrompt'
import logo from './logo.svg';
import './App.css';
import FormContainer from './Containers/FormContainer';

function App() {
  const [userState, userDispatch, login] = useUser()
  const [promptState, promptDispatch] = usePrompt()
  const {loggedInUserId, token} = userState
  const {prompt} = promptState

  return (
    <>
      {loggedInUserId ?
      "Hello"
      :
      <FormContainer 
        loginFunc={login}
      />}
    </>
  );
}



export default App;
