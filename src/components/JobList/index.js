import {Link} from 'react-router-dom'
import './index.css'
import {IoIosStar} from 'react-icons/io'
import {MdLocationOn} from 'react-icons/md'
import {IoBag} from 'react-icons/io5'

const JobList = props => {
  const {list} = props
  const {
    companyLogoUrl,
    employmetType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = list
  return (
    <Link to={`/jobs/${id}`} className="link-decoration">
      <div className="details-container">
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
                <p className="rating-num">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-container">
            <div className="location-first">
              <div className="job-logo-cont">
                <MdLocationOn className="location-logo" />
                <p className="location">{location}</p>
              </div>
              <div className="job-logo-cont1">
                <IoBag className="location-logo" />
                <p className="location">{employmetType}</p>
              </div>
            </div>
            <p className="package-text">{packagePerAnnum}</p>
          </div>
          <hr className="line" />
          <h1 className="list-job-description">Description</h1>
          <p className="description-text">{jobDescription}</p>
        </div>
      </div>
    </Link>
  )
}

export default JobList
