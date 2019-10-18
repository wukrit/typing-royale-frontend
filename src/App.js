import React, { useEffect } from 'react'
import { Route, NavLink, Switch, Link } from 'react-router-dom'
import useUser from './Hooks/useUser'
import usePrompt from './Hooks/usePrompt'
import FormContainer from './Containers/FormContainer'
import HomeContainer from './Containers/HomeContainer'
import './App.css'

function App() {
  const [userState, userDispatch, login] = useUser()
  const [promptState, promptDispatch] = usePrompt()
  const { loggedInUserId, token } = userState
  const { prompt } = promptState

  useEffect(
    () => {
      const storageObj = {
        user_id: localStorage.getItem('loggedInUserId'),
        token: localStorage.getItem('token')
      }
      if (storageObj.user_id) {
        userDispatch({ type: 'SET', payload: storageObj })
      }
    }, []
  )

  return (
    <div className="container">
      {/* {loggedInUserId ?
        "Hello"
        :
        <FormContainer
          login={login}
        />} */}

      <header className="App-header nes-container is-rounded is-dark">
        <Link to="/"><h1 className="App-title">Typing Royale</h1></Link>
      </header>

      <div className="page">
        <aside id="side-bar" className="column nes-container is-rounded">
          <div>
            gnome sidebar
          </div>
        </aside>

        <div id="content" className="main-content column">

          <Switch>
            {/* <Route path="/spice/:slug" render={this.renderSpice} /> */}
            <Route path="/" exact component={HomeContainer} />
            <Route path="/login" exact component={FormContainer} />
          </Switch>

        </div>
      </div>
    </div>
  );
}



export default App;
