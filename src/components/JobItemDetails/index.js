import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {IoIosStar} from 'react-icons/io'
import {MdLocationOn} from 'react-icons/md'
import {IoBag} from 'react-icons/io5'
import Header from '../Header'
import './index.css'

class JobItemDetails extends Component {
  state = {
    isItemLoading: false,
    jobItemList: [],
    skillsData: [],
    similarJobList: [],
    companyLife: '',
  }

  componentDidMount() {
    this.getJobItems()
  }

  getJobItems = async () => {
    this.setState({
      isItemLoading: true,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    const dataList = data.job_details
    const formatedData = {
      companyLogoUrl: dataList.company_logo_url,
      companyWebsiteUrl: dataList.company_website_url,
      id: dataList.id,
      jobDescription: dataList.job_description,
      location: dataList.location,
      packagePerAnnum: dataList.package_per_annum,
      rating: dataList.rating,
      title: dataList.title,
      employmentType: dataList.employment_type,
    }
    const newSkill = dataList.skills.map(each => ({
      imageUrl: each.image_url,
      name: each.name,
    }))
    const lifeAtcomp = {
      description: dataList.life_at_company.description,
      imageUrl: dataList.life_at_company.image_url,
    }
    const similarJobs = data.similar_jobs.map(each => ({
      companyLogoUrl: each.company_logo_url,
      employmentType: each.employment_type,
      id: each.id,
      jobDescription: each.job_description,
      location: each.location,
      rating: each.rating,
      title: each.title,
    }))

    this.setState({
      jobItemList: formatedData,
      skillsData: newSkill,
      companyLife: lifeAtcomp,
      similarJobList: similarJobs,
      isItemLoading: false,
    })
  }

  renderLoader = () => (
    <div className="loader-container job-item-loader" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobItem = () => {
    const {jobItemList, skillsData, companyLife, similarJobList} = this.state
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobItemList
    return (
      <>
        <div className="item-main-container">
          <div>
            <div className="job-title-container">
              <img
                className="company-logo"
                src={companyLogoUrl}
                alt="company logo"
              />
              <div>
                <h1 className="job-title">{title}</h1>
                <div className="rating-container">
                  <IoIosStar className="rating-icon" />
                  <p className="rating-num1">{rating}</p>
                </div>
              </div>
            </div>
            <div className="location-container">
              <div className="location-first">
                <div className="job-logo-cont">
                  <MdLocationOn className="location-logo1" />
                  <p className="location1">{location}</p>
                </div>
                <div className="job-logo-cont1">
                  <IoBag className="location-logo1" />
                  <p className="location1">{employmentType}</p>
                </div>
              </div>
              <p className="package-text">{packagePerAnnum}</p>
            </div>
            <hr className="line" />
            <p className="list-job-description1">Description</p>
            <p className="description-text1">{jobDescription}</p>
          </div>
          <div>
            <h1 className="skills-header">Skills</h1>
            <ul className="skills-list-container">
              {skillsData.map(eachSkill => (
                <li className="skill-list">
                  <img
                    className="skill-logo"
                    src={eachSkill.imageUrl}
                    alt={eachSkill.name}
                  />
                  <p className="skill-name">{eachSkill.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="skills-header">Life at Company</h1>
            <div className="company-life-content">
              <p className="life-description">{companyLife.description}</p>
              <img
                className="life-image"
                src={companyLife.imageUrl}
                alt="life at company"
              />
            </div>
          </div>
        </div>
        <h1 className="skills-header">Similar Jobs</h1>
        <ul className="similar-jobs-container">
          {similarJobList.map(eachJobs => (
            <li className="similar-jobs-list">
              <div>
                <div className="job-title-container">
                  <img
                    className="company-logo2"
                    src={eachJobs.companyLogoUrl}
                    alt="company logo"
                  />
                  <div>
                    <h1 className="job-title2">{eachJobs.title}</h1>
                    <div className="rating-container">
                      <IoIosStar className="rating-icon2" />
                      <p className="rating-num2">{eachJobs.rating}</p>
                    </div>
                  </div>
                </div>
                <p className="list-job-description2">Description</p>
                <p className="description-text1">{eachJobs.jobDescription}</p>
                <div className="location-container">
                  <div className="location-first">
                    <div className="job-logo-cont">
                      <MdLocationOn className="location-logo1" />
                      <p className="location1">{eachJobs.location}</p>
                    </div>
                    <div className="job-logo-cont1">
                      <IoBag className="location-logo1" />
                      <p className="location1">{eachJobs.employmentType}</p>
                    </div>
                  </div>
                  <p className="package-text">{eachJobs.packagePerAnnum}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </>
    )
  }

  render() {
    const {isItemLoading} = this.state
    return (
      <div className="job-item-container">
        <div className="main-job-item-container">
          <Header />
          <div className="job-item-content">
            {isItemLoading ? this.renderLoader() : this.renderJobItem()}
          </div>
        </div>
      </div>
    )
  }
}

export default JobItemDetails
