import React, { useEffect } from 'react'
import { Route, Switch, Link, Redirect } from 'react-router-dom'
import useUser from './Hooks/useUser'
import useChallenge from './Hooks/useChallenge'
import FormContainer from './Containers/FormContainer'
import HomeContainer from './Containers/HomeContainer'
import ChallengeContainer from './Containers/ChallengeContainer'
import './App.css'

function App() {
  const [userState, userDispatch, login, getUserData] = useUser()
  const [challengeState, challengeDispatch, fetchNewChallenge, postResults] = useChallenge()
  const { loggedInUserId, username, bio  } = userState
  // not in use yet token, img_url

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
    }, [loggedInUserId]
  )

  const renderUser = () => {
    return (
      <>
        <i className="nes-kirby"></i><br /><br />
        <li>{`Hello ${username}!`}</li><br />
        <li>Bio: <br />{bio}</li>
        <br/>
        <li><button className="nes-btn is-error" onClick={() => userDispatch({type: 'LOGOUT'})}>Log Out</button></li>
      </>
    )
  }

  const renderChallenge = (renderProps) => {
    return (
        <ChallengeContainer 
          dispatch={challengeDispatch}
          postResults={postResults}
          loggedInUserId={loggedInUserId} />
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
              <Route path="/" exact render={(props) =>
                <HomeContainer
                  loggedInUserId={loggedInUserId}
                  fetchNewChallenge={fetchNewChallenge}
                  history={props.history}
                />}
              />
              <Route path="/challenge" exact strict render={() => <ChallengeContainer />} />
              <Route path="/challenge/:challenge_uuid" render={renderChallenge} />
              <Route path="/login" exact> {loggedInUserId ? <Redirect to="/" /> : <FormContainer login={login} />}  </Route>
            </Switch>

            {/* // Click new challenge X 
            // Gen UUID X
            // Redirect to /challenge/:challenge_id X
            // Fetch new challenge */}

          </div>
        </div>
      

    </div>
  );
}



export default App;
