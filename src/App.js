import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Calendar from './components/Calendar/Calendar';
import Viewday from './components/Viewday/Viewday';
import Signin from './components/Signin/Signin';
import Changeres from './components/Changeres/Changeres';
import Newres from './components/Newres/Newres';
import Selectdate from './components/Selectdate/Selectdate';

import './App.css';

class App extends Component {
  constructor () {
    super();
    this.state = {
      input: '',
      route: 'Signin',
      isSignedIn: false,
      isRemembered: false,
      selectedDate: '',
      reservation: {
        reservation_id: '',
        name: '',
        phone: '',
        group: '',
        reservation_date: '',
        start_time: '',
        end_time: '',
        station: ''
      }
    }
  }

  componentDidMount() {
    if (localStorage.getItem("remembered")) {
      this.onRouteChange('Calendar')
      this.setState({isSignedIn: true})
    }
  }

  loadLogin = (data) => {
    this.setState({login: data.login})
    this.setState({password: data.password})
  }

  rememberMe = () => {
    localStorage.setItem("remembered", true)
  }

  signOut = () => {
    localStorage.setItem("remembered", false)
  }

  loadReservation = (data) => {
    this.setState({reservation: {
      reservation_id: data.id,
      name: data.name,
      phone: data.phone,
      group: data.group_size,
      start_time: data.start_time,
      end_time: data.end_time,
      station: data.station,
      reservation_date: data.reservation_day
    }})
  }

  loadDate = (data) => {
    this.setState({selectedDate: data})
  }

  parseReservationDate = (reservation_day) => {
    let date = new Date(reservation_day);
    let year = (parseInt(date.getYear()) + 1900).toString();
    let month = ''
    if (parseInt(date.getMonth()) < 9) {
      month = '0' + (parseInt(date.getMonth()) + 1).toString()
    } else {
      month = (parseInt(date.getMonth()) + 1).toString();
    }
    let day = date.getDate();
    return year + '-' + month + '-' + day ;
    /*return date;*/
  }

  onRouteChange = (route) => {
    if (route === 'Signin') {
      this.setState({isSignedIn: false})
    } else {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const {route, isSignedIn} = this.state;
    return (
      <div className="App">
        <header className="App-header">
            <Logo 
              onRouteChange = {this.onRouteChange}
              isSignedIn = {isSignedIn}/>
            <Navigation 
              onRouteChange = {this.onRouteChange} 
              isSignedIn = {isSignedIn}
              onSignOut = {this.signOut}/>
        </header>
        
        {route === 'Viewday'
          ? <div>
              <Viewday
                loadReservation = {this.loadReservation}
                selectedDate = {this.state.selectedDate}
                onRouteChange = {this.onRouteChange}/>  
          </div>
        : route === 'Calendar'
          ? 
          <div>
            <Calendar
              loadDate = {this.loadDate}
              parseReservationDate = {this.parseReservationDate}
              onRouteChange = {this.onRouteChange}/>
          </div>
        : route === 'Signin'
          ?
          <div>
          <Signin 
            rememberMe = {this.rememberMe}
            loadLogin={this.loadLogin}
            onRouteChange = {this.onRouteChange}/>
          </div>
        : route === 'Selectdate'
          ? 
          <div>
            <Selectdate 
              onRouteChange = {this.onRouteChange}
              loadDate = {this.loadDate}/>
          </div>
        : route === 'Changeres'
          ? 
          <div>
            <Changeres 
              reservation = {this.state.reservation} 
              parseReservationDate = {this.parseReservationDate}
              onRouteChange = {this.onRouteChange}/>
          </div>
        : route === 'Newres'
        ? 
        <div>
          <Newres onRouteChange = {this.onRouteChange}/>
        </div>
        :
        <div>
          <Logo />
        </div>
        }
      </div>
    );
  }
}

export default App;
