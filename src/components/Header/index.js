import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'

import './index.css'

const Header = props => {
  const logOutTriggered = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="nav-container">
      <Link to="/">
        <img
          className="nav-web-logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>
      <div className="options-cont">
        <Link to="/" className="link-msg">
          <p className="nav-options">Home</p>
        </Link>
        <Link to="/jobs" className="link-msg">
          <p className="nav-options">Jobs</p>
        </Link>

        <button onClick={logOutTriggered} type="button" className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
