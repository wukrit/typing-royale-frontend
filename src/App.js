import React, { useEffect, useState } from 'react'
import { Route, Switch, Link, Redirect } from 'react-router-dom'
import useUser from './Hooks/useUser'
import useChallenge from './Hooks/useChallenge'
import FormContainer from './Containers/FormContainer'
import HomeContainer from './Containers/HomeContainer'
import ChallengeContainer from './Containers/ChallengeContainer'
import './App.css'

function App() {
  const [userState, userDispatch, login, getUserData, editUserBio] = useUser()
  const [challengeState, challengeDispatch, fetchNewChallenge, postResults] = useChallenge()
  const { loggedInUserId, username, bio, error, token } = userState
  const [showEditBio, setShowEditBio] = useState(false)
  // not in use yet img_url

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
        <i className="nes-kirby" ></i>
        <li>{`Hello ${username}!`}</li><br />
        <li className="bio">Bio: <br />{bio}</li>
        <li>
          {showEditBio ? editBio() : <button className="nes-btn is-primary sidebar-btn bio" onClick={() => setShowEditBio(!showEditBio)}>Edit Bio</button>}
          <button className="nes-btn is-error sidebar-btn" onClick={() => userDispatch({ type: 'LOGOUT' })}>Log Out</button>
        </li>
      </>
    )
  }

  const handleEditSubmit = (event) => {
    event.preventDefault()
    setShowEditBio(!showEditBio)
    const payload = {
      user_id: loggedInUserId,
      bio: event.target.bio.value,
      token: token
    }
    editUserBio(payload)
  }

  const editBio = () => {
    console.log("do it again")
    return (
      <div>
        <form className="nes-field" onSubmit={handleEditSubmit}>
          <input className="nes-input" name="bio" type="textarea" placeholder={bio ? bio : "enter bio here"} />
          <input className="nes-btn is-primary" type="submit" />
          <button className="nes-btn is-error" onClick={() => setShowEditBio(!showEditBio)}>Cancel</button>
        </form>
      </div>
    )
  }

  const renderChallenge = (renderProps) => {
    return (
      <ChallengeContainer
        username={username ? username : "anon"}
        dispatch={challengeDispatch}
        postResults={postResults}
        loggedInUserId={loggedInUserId} />
    )
  }


  const renderErrors = () => {
    alert(error)

    // return (
    // <ReactModal isOpen= {true} className="nes-container is-rounded">
    //   hello from the gnome container
    // </ReactModal>

    // )
  }

  return (
    <div className="container">

      <header className="App-header nes-container is-rounded is-dark">
        <Link to="/"><h1 className="App-title">Typing Royale</h1></Link>
      </header>

      <div className="page">
        <div className="side-bar-wrapper">
          <aside id="side-bar" className="column nes-container is-rounded">
              {loggedInUserId ?
                <ul>
                  renderUser()
                </ul>
                :
                (<Link to="/login">
                  <button className="nes-btn is-primary">
                    Login | Sign Up
                  </button>
                  </Link>
                )}
          </aside>
        </div>

        <div id="content" className="main-content column">

          {error ? renderErrors() : null}

          <Switch className="nes-container">
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

        </div>

        <footer className="nes-container is-rounded" id="footer">
          <div id="info-container">
            <div id="github">
              <a target="_blank" rel='noreferrer noopener' href="https://github.com/wukrit/typing-royale-frontend"><i className="nes-octocat animate"></i></a>
            </div>
            <div id="super-cool-bois-container">
              Made with <i className="nes-icon is-small heart"></i> by:
              <br />
              <div className="super-cool-boi" id="sukrit">
                Sukrit Walia
                <div className="icons">
                <a target="_blank" rel='noreferrer noopener' href="https://twitter.com/sukritwalia"><i className="nes-icon twitter is-medium"></i></a>
                  <a target="_blank" rel='noreferrer noopener' href="https://medium.com/@sukritwalia"><i className="nes-icon medium is-medium"></i></a>
                  <a target="_blank" rel='noreferrer noopener' href="https://www.linkedin.com/in/sukrit-walia-828a3b188/"><i className="nes-icon linkedin is-medium"></i></a>
                  <a target="_blank" rel='noreferrer noopener' href="https://github.com/wukrit"><i className="nes-icon github is-medium"></i></a>
                </div>
              </div>
              <div className="super-cool-boi" id="shane">
                Shane Lonergan
                <div className="icons">
                  <a target="_blank" rel='noreferrer noopener' href="https://twitter.com/shane__lonergan"><i className="nes-icon twitter is-medium"></i></a>
                  <a target="_blank" rel='noreferrer noopener' href="https://medium.com/@sptlonergan"><i className="nes-icon medium is-medium"></i></a>
                  <a target="_blank" rel='noreferrer noopener' href="https://www.linkedin.com/in/shane-lonergan-6a25aa188/"><i className="nes-icon linkedin is-medium"></i></a>
                  <a target="_blank" rel='noreferrer noopener' href="https://github.com/shanelonergan"><i className="nes-icon github is-medium"></i></a>
                </div>
              </div>
            </div>
          </div>
        </footer>

      </div>


    </div>
  );
}



export default App;
