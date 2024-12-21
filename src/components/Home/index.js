import {Component} from 'react'

import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <div className="main-home-container">
          <Header />
          <div className="home-content-container">
            <div className="home-word-cont">
              <h1 className="home-heading">Find The Job That Fits Your Life</h1>
              <p className="home-description">
                Millions of people are searching for jobs, salary information,
                company reviews. Find the job that fits your abilities and
                potential
              </p>
              <Link to="/jobs" className="link-msg">
                <button type="button" className="search-btn">
                  Find Jobs
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
