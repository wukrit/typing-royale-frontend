import React, { useEffect, useState } from 'react'
import { Route, Switch, Link, Redirect } from 'react-router-dom'
import useUser from './Hooks/useUser'
import useChallenge from './Hooks/useChallenge'
import FormContainer from './Containers/FormContainer'
import HomeContainer from './Containers/HomeContainer'
import ChallengeContainer from './Containers/ChallengeContainer'
import ReactModal from 'react-modal'
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
        <i className="nes-kirby" ></i><br /><br />
        <li>{`Hello ${username}!`}</li><br />
        <li>Bio: <br />{bio}</li>
        {showEditBio ? editBio() : <a><li onClick={() => setShowEditBio(!showEditBio)}>Edit Bio</li></a>}
        <br />
        <li><button className="nes-btn is-error is-clickable" onClick={() => userDispatch({ type: 'LOGOUT' })}>Log Out</button></li>
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
          <input className="nes-input" name="bio" type="textarea" placeholder={bio ? bio : "enter bio here" }/>
          <input className="nes-btn is-primary" type="submit"/>
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
            <ul>
              {loggedInUserId ? renderUser() : (<li><Link to="/login">Login | Sign Up</Link></li>)}
            </ul>
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
      </div>


    </div>
  );
}



export default App;
