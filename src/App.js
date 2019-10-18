import React, { useEffect } from 'react'
import { Route, NavLink, Switch, Link } from 'react-router-dom'
import useUser from './Hooks/useUser'
import usePrompt from './Hooks/usePrompt'
import FormContainer from './Containers/FormContainer'
import HomeContainer from './Containers/HomeContainer'
import './App.css'

function App() {
  const [userState, userDispatch, login, getUserData] = useUser()
  const [promptState, promptDispatch] = usePrompt()
  const { loggedInUserId, token, username, bio, img_url } = userState
  const { prompt } = promptState

  useEffect(
    () => {
      const storageObj = {
        user_id: localStorage.getItem('loggedInUserId'),
        token: localStorage.getItem('token')
      }
      if (storageObj.user_id) {
        userDispatch({ type: 'SET', payload: storageObj })
        getUserData(storageObj.user_id, storageObj.token)
      }
    }, []
  )

  const renderUser = () => {
    return (
      <>
        <i className="nes-kirby"></i><br/><br />
        <li>{`Hello ${username}!`}</li><br />
        <li>Bio: <br />{bio}</li>
      </>
    )
  }

  return (
    <div className="container">

      <header className="App-header nes-container is-rounded is-dark">
        <Link to="/"><h1 className="App-title">Typing Royale</h1></Link>
      </header>

      <div className="page">
        <div className="side-bar-wrapper">
          <aside id="side-bar" className="column nes-container is-rounded">
            <ul>
              {loggedInUserId ? renderUser() : (<li><Link to="/login">Login | Sign Up</Link></li>)}
            </ul>
          </aside>
        </div>

        <div id="content" className="main-content column">

          <Switch className="nes-container">
            {/* <Route path="/spice/:slug" render={this.renderSpice} /> */}
            <Route path="/" exact render={() => <HomeContainer />} />
            <Route path="/login" exact render={() => <FormContainer login={login} />} />
          </Switch>

        </div>
      </div>
    </div>
  );
}



export default App;
