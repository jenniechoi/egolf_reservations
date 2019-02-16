import React from 'react';
import './Viewday.css';

class Viewday extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        currentWeek: new Date(),
        reservations: [ {} ],
      }
    }

    componentDidMount() {
        fetch('https://pacific-beyond-36413.herokuapp.com/viewreservation_day/:' + this.props.selectedDate)
        .then(response => response.json())
        .then(data => {
            this.setState({reservations: data})
        })
     }

     onClickReservation = (reservation) => {
        this.props.loadReservation(reservation) 
        this.props.onRouteChange('Changeres')
     }
    
      parseReservationDate = (reservation) => {
        let date = new Date(reservation.reservation_day);
        let year = (parseInt(date.getYear()) + 1900).toString();
        let month = (parseInt(date.getMonth()) + 1).toString();
        let day = date.getDate();
        return year + '-' + month + '-' + day ;
        /*return date;*/
      }
    
      convertHours = (hour) => {
        let newHour = parseInt(hour)
        if (newHour > 12) {
          return (newHour-12).toString() + ':' + hour.slice(3,5) + 'PM';
        } else if (newHour === 12) {
            return hour.slice(0,5) +  'PM';
        } else if (newHour < 12) {
            return hour.slice(0,5)  + 'AM';
        }
      }

    renderReservations = (station) => {
        let rows = [];
        if (typeof this.state.reservations === 'string') {
            return null
        } else {
            this.state.reservations.forEach(reservation => {
                if (station === reservation.station) {
                    rows.push(
                        <a onClick = {() => (this.onClickReservation(reservation))} className="link dim ba ph3 pv2 mb2 dib black w-100 bg-white" href="#0">
                            {this.convertHours(reservation.start_time) + 
                            ' - ' +
                            this.convertHours(reservation.end_time) + 
                            ' ' +  
                            reservation.name}
                        </a>  
                    ) 
                }
            });
            return rows;
        }
    }

    render() {
        return (
            <div>
                <div className="center" style ={{display: 'flex', justifyContent: 'space-between', marginLeft: '.5em', marginRight: '.5em'}}>
                    <a onClick = {() =>this.props.onRouteChange('Calendar')} className="f6 link dim br3 ba bw1 ph3 pv2 mb2 dib mid-gray bg-white" href="#0">
                        Back to Calendar
                    </a>
                    
                    <a onClick = {() =>this.props.onRouteChange('Newres')} className="f6 link dim br3 ba bw1 ph3 pv2 mb2 dib mid-gray bg-white" href="#0">
                        Create New Reservation
                    </a>
                </div>  
                
                <h2>{this.props.selectedDate}</h2>

                <div className="grid-container">
                    <div className="bb b--black-20 grid-item"><div className = "bold">Station 1 </div> <br></br> {this.renderReservations(1)}</div>
                    <div className="bb b--black-20 grid-item"><div className = "bold">Station 2 </div> <br></br> {this.renderReservations(2)}</div>
                    <div className="bb b--black-20 grid-item"><div className = "bold">Station 3 </div> <br></br> {this.renderReservations(3)}</div>
                    <div className="bb b--black-20 grid-item"><div className = "bold">Station 4 </div> <br></br> {this.renderReservations(4)}</div>
                    <div className="bb b--black-20 grid-item"><div className = "bold">Station 5 </div> <br></br> {this.renderReservations(5)}</div>
                    <div className="bb b--black-20 grid-item"><div className = "bold">Station 6 </div> <br></br> {this.renderReservations(6)}</div>
                </div>
            </div>
        )
    }
}

export default Viewday;