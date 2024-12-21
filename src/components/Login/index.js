import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {nameInput: '', passwordInput: '', errorMsg: ''}

  nameChange = event => {
    this.setState({
      nameInput: event.target.value,
    })
  }

  passwordChange = event => {
    this.setState({
      passwordInput: event.target.value,
    })
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  submitTriggered = async event => {
    event.preventDefault()
    const {nameInput, passwordInput} = this.state
    const userDetails = {
      username: nameInput,
      password: passwordInput,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.setState({
        errorMsg: data.error_msg,
      })
    }
  }

  render() {
    const {nameInput, passwordInput, errorMsg} = this.state
    const accessToken = Cookies.get('jwt_token')
    if (accessToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="main-container">
        <div className="login-container">
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <form className="form-container" onSubmit={this.submitTriggered}>
            <label className="name-label" htmlFor="name">
              USERNAME
            </label>
            <input
              id="name"
              className="name-box"
              placeholder="Username"
              onChange={this.nameChange}
              value={nameInput}
            />
            <label className="name-label" htmlFor="password">
              PASSWORD
            </label>
            <input
              id="password"
              type="password"
              className="name-box"
              placeholder="Password"
              onChange={this.passwordChange}
              value={passwordInput}
            />
            <button className="login-btn" type="submit">
              Login
            </button>
          </form>
          {errorMsg && <p className="msg-error">{errorMsg}</p>}
        </div>
      </div>
    )
  }
}

export default Login
