import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import JobList from '../JobList'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    joblist: [],
    searchInput: '',
    isLoading: false,
    jobType: [],
    packageAmount: '',
    profileLoading: false,
    profileUser: '',
    profileError: false,
    jobSearchError: apiStatus.initial,
  }

  componentDidMount = () => {
    this.getJodList()
    this.getProfile()
  }

  FailureProfile = () => {
    this.setState({
      profileError: true,
      profileLoading: false,
    })
  }

  onSuccessProfile = userProfile => {
    const formatedData = {
      name: userProfile.name,
      profileImageUrl: userProfile.profile_image_url,
      shortBio: userProfile.short_bio,
    }
    console.log(formatedData)
    this.setState({
      profileLoading: false,
      profileUser: formatedData,
      profileError: false,
    })
  }

  getProfile = async () => {
    this.setState({
      profileLoading: true,
    })
    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccessProfile(data.profile_details)
    } else {
      this.FailureProfile()
    }
  }

  getJodList = async () => {
    const {searchInput, jobType, packageAmount} = this.state
    this.setState({
      isLoading: true,
    })
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${jobType.join(
      ',',
    )}&minimum_package=${packageAmount}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const formattedData = data.jobs.map(each => ({
      companyLogoUrl: each.company_logo_url,
      employmetType: each.employment_type,
      id: each.id,
      jobDescription: each.job_description,
      location: each.location,
      packagePerAnnum: each.package_per_annum,
      rating: each.rating,
      title: each.title,
    }))
    if (response.ok === true) {
      this.setState({
        joblist: formattedData,
        isLoading: false,
        jobSearchError: apiStatus.success,
      })
    } else {
      this.setState({
        isLoading: false,
        jobSearchError: apiStatus.failure,
      })
    }
  }

  renderJobDetails = () => {
    const {joblist, jobSearchError} = this.state
    console.log(joblist)
    if (jobSearchError === apiStatus.success) {
      if (joblist.length > 0) {
        return (
          <div>
            {joblist.map(eachJob => (
              <JobList key={eachJob.id} list={eachJob} />
            ))}
          </div>
        )
      }
      return (
        <div className="failure-view">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
          />

          <h1 className="header">No Jobs Found</h1>
          <p className="para">We could not find any jobs. Try other filters</p>
        </div>
      )
    }
    return (
      <div className="failure-view">
        <img
          className="no-jobs-image"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="failure view"
        />
        <h1 className="header">Oops! Something Went Wrong</h1>
        <p className="para">
          We cannot seem to find the page you are looking for
        </p>
        <button
          onClick={this.getJodList}
          className="retry-button"
          type="button"
        >
          Retry
        </button>
      </div>
    )
  }

  renderProfile = () => {
    const {profileUser, profileError} = this.state
    const {name, shortBio, profileImageUrl} = profileUser
    if (profileError === false) {
      return (
        <div className="profile-bg-cont">
          <img className="user-image" src={profileImageUrl} alt="profile" />
          <h1 className="user-name">{name}</h1>
          <p className="user-bio">{shortBio}</p>
        </div>
      )
    }
    return (
      <div className="retry-cont">
        <button
          onClick={this.getProfile}
          className="retry-button"
          type="button"
        >
          Retry
        </button>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container arrange" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  filter1Added = event => {
    const typeJob = event.target.value
    const {jobType} = this.state
    if (jobType.includes(typeJob) === true) {
      const filteredJobType = jobType.filter(each => each !== typeJob)
      this.setState(
        {
          jobType: filteredJobType,
        },
        this.getJodList,
      )
    } else {
      const modifiedArray = [...jobType, typeJob]
      this.setState(
        {
          jobType: modifiedArray,
        },
        this.getJodList,
      )
    }
  }

  searching = event => {
    this.setState(
      {
        searchInput: event.target.value,
      },
      this.getJodList,
    )
  }

  ctcChoosed = event => {
    this.setState(
      {
        packageAmount: event.target.value,
      },
      this.getJodList,
    )
  }

  render() {
    const {isLoading, profileLoading} = this.state
    console.log(profileLoading)
    return (
      <div className="jobs-container">
        <div className="job-container">
          <Header />
          <div className="jobs-contentcontainer">
            <div className="filters-container">
              <div className="profile-container">
                {profileLoading ? this.renderLoader() : this.renderProfile()}
              </div>
              <hr className="small-line" />
              <ul className="list-order">
                <h1 className="filter1-header">Type of Employment</h1>
                {employmentTypesList.map(each => (
                  <li className="package-list" key={each.employmentTypeId}>
                    <input
                      type="checkbox"
                      id={each.employmentTypeId}
                      name={each.employmentTypeId}
                      value={each.employmentTypeId}
                      onChange={this.filter1Added}
                    />
                    <label
                      className="type-of-job"
                      htmlFor={each.employmentTypeId}
                    >
                      {each.label}
                    </label>
                    <br />
                  </li>
                ))}
              </ul>
              <hr className="small-line" />
              <ul className="list-order">
                <h1 className="filter1-header">Salary Range</h1>
                {salaryRangesList.map(each => (
                  <li className="package-list" key={each.salaryRangeId}>
                    <input
                      type="radio"
                      id={each.label}
                      name="package-amount"
                      value={each.salaryRangeId}
                      onChange={this.ctcChoosed}
                    />
                    <label className="type-of-job" htmlFor={each.label}>
                      {each.label}
                    </label>
                    <br />
                  </li>
                ))}
              </ul>
            </div>
            <div className="job-search-container">
              <div className="job-search-input-container">
                <input
                  className="job-input"
                  type="search"
                  placeholder="Search"
                  onChange={this.searching}
                />
                <BsSearch className="search-icon" />
              </div>
              {isLoading ? this.renderLoader() : this.renderJobDetails()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
