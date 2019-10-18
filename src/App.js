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

      <header className="App-header">
        <Link to="/"><h1 className="App-title">Typing Royale</h1></Link>
        {/* <aside className="sidebar">
          <ul>
            <li>
              <NavLink to="/" exact>Home</NavLink>
            </li>
            {/* {
              this.state.spiceGirls.map(spice => (<li key={spice.slug}>
                <NavLink to={"/spice/" + spice.slug}>
                  {spice.adjective}
                </NavLink>
              </li>))
          </ul>
        </aside> */}
      </header>

      <Switch>
        {/* <Route path="/spice/:slug" render={this.renderSpice} /> */}
        {
          /* 
          <Route path="/emma" render={ this.renderBaby } />
          <Route path="/mel-b" component={ Scary } />
          <Route path="/mel-c" component={ Sporty } />
            <Route path="/geri" component={ Ginger } />
          <Route path="/victoria" component={ Posh } />
          */
        }
        <Route path="/" exact component={HomeContainer} />
        <Route path="/login" exact component={FormContainer} />
      </Switch>

    </div>
  );
}



export default App;
