import React from 'react';
import useUser from './Hooks/useUser'
import usePrompt from './Hooks/usePrompt'
import logo from './logo.svg';
import './App.css';

function App() {
  const [userState, userDispatch] = useUser()
  const [promptState, promptDispatch] = usePrompt()
  const {loggedInUserId, token} = userState
  const {prompt} = promptState

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}



export default App;
