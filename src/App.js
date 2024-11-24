import {Component} from 'react'

import Loader from 'react-loader-spinner'

import TourPlaceItem from './TourPlaceItem'

import './App.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

// Replace your code here
class App extends Component {
  state = {tourList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/tg/packages'
    const data = await fetch(url)
    // console.log(data)
    if (data.ok) {
      const fetchedData = await data.json()
      // console.log(fetchedData.packages)
      const updatedData = fetchedData.packages.map(eachPackage => ({
        description: eachPackage.description,
        id: eachPackage.id,
        imageUrl: eachPackage.image_url,
        name: eachPackage.name,
      }))
      // console.log(updatedData)
      this.setState({
        tourList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderSucessView = () => {
    const {tourList} = this.state
    return (
      <ul className="tourist-paces-container">
        {tourList.map(eachPlace => (
          <TourPlaceItem tourPlaceDetails={eachPlace} key={eachPlace.id} />
        ))}
      </ul>
    )
  }

  renderLoaderView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderUserView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSucessView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    const {tourList} = this.state

    return (
      <div className="travel-guide-container">
        <h1 className="main-heading">Travel Guide</h1>
        {this.renderUserView()}
      </div>
    )
  }
}

export default App