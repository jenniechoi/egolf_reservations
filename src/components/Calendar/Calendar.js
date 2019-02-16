import React from "react";
import dateFns from "date-fns";
import './Calendar.css';
/*import 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css';*/


class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWeek: new Date(),
      selectedDate: new Date(),
      reservations: [ {} ],
      dateChange: ''
    }
  }

  componentDidMount() {
    fetch('https://pacific-beyond-36413.herokuapp.com/calendar')
    .then(response => response.json())
        .then(serverMessage => {
            if (serverMessage === "No Reservations for the Week") {
              alert('No Reservations in the Database')  
            } else {
              this.setState({reservations: serverMessage})
            }
        })
 }

  convertHours = (hour) => {
    if (parseInt(hour) > 12) {
      return (parseInt(hour)-12).toString() + ':' + hour.slice(3,5) + 'PM';
    } else if (parseInt(hour) === 12) {
        return hour.slice(0,5) +  'PM';
    } else {
        return hour.slice(0,5)  + 'AM';
    }
  }

  renderReservations = (thisWeekDays) => {
    let rows = [];
    this.state.reservations.forEach(reservation => {
      if (thisWeekDays === this.props.parseReservationDate(reservation.reservation_day)) {
        rows.push(
          <tr>
            <td>{this.convertHours(reservation.start_time) + '-' + this.convertHours(reservation.end_time)}</td>
            <td>{reservation.name}</td>
          </tr>
        )
      }
    });
    if (this.state.reservations.length > 0){
      return rows;
    } else {
      return 'No Reservations';
    }
  }

  /* Renders month header */
  renderHeader() {
    const dateFormat = "MMMM YYYY";
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevWeek}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(this.state.currentWeek, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextWeek}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  /* Renders weekday headers*/
  renderDays() {
    const dateFormat = "dddd";
    const days = [];

    /* Changes what day of week gets displayed - liked Thursday, Friday, etc */
    let startDate = dateFns.startOfWeek(this.state.currentWeek);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { currentWeek, selectedDate } = this.state;
    const weekStart = dateFns.startOfWeek(currentWeek);
    const weekEnd = dateFns.endOfWeek(weekStart);
    const startDate = dateFns.startOfWeek(weekStart);
    const endDate = dateFns.endOfWeek(weekEnd);

    const dateFormat = "D";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        const thisWeekDays = 
          dateFns.format(day, 'YYYY') + 
          '-' + 
          dateFns.format(day, 'MM') + 
          '-' + 
          dateFns.format(day, 'D');
        
        days.push(
          <div
          /* col is what is written in the columns, cell is how it is formatted */
            className={`col cell ${
              dateFns.isSameDay(day, selectedDate) ? "selected" : ""
            }`}
            key={day}
            onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
                  {/* Added by Bera */}
                  <div className="table top-margin" >         
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Time</th>
                          <th>Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.renderReservations(thisWeekDays)}
                      </tbody>
                    </table>
                  </div>
                  {/*End of Bera */}
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  onDateClick = (day) => {
    this.setState({selectedDate: day});
    this.props.loadDate(this.props.parseReservationDate(day));
    
    let matchedReservation = false;
    this.state.reservations.forEach(reservation => {
      if (this.props.parseReservationDate(reservation.reservation_day) === this.props.parseReservationDate(day)) {
        matchedReservation = true;
      }
    })
    if (matchedReservation) {
      this.props.onRouteChange('Viewday')  
    } else {
        alert('No reservations')
    }  
  };

  /* Shows next week in the header */
  nextWeek = () => {
    this.setState({
      currentWeek: dateFns.addWeeks(this.state.currentWeek, 1)
    });
  };

  prevWeek = () => {
    this.setState({
      currentWeek: dateFns.subWeeks(this.state.currentWeek, 1)
    });
  };

  render() {
    return (
      <div>
        <div className="center" style ={{display: 'flex', justifyContent: 'space-between', margin: '.5em'}}>
          <a 
            className="f6 link dim br3 ba bw1 ph3 pv2 mb2 dib mid-gray bg-white" 
            style ={{display: 'flex', justifyContent: 'flex-start', width: '115px', marginLeft: '.5em'}}
            onClick = {() =>this.props.onRouteChange('Selectdate')} 
            href="#0">
              Select Date
          </a>
          <a onClick = {() =>this.props.onRouteChange('Newres')} className="f6 link dim br3 ba bw1 ph3 pv2 mb2 dib mid-gray bg-white" href="#0">
              Create New Reservation
          </a>
        </div> 
        <div className="calendar">
          {this.renderHeader()}
          {this.renderDays()}
          {this.renderCells()}
        </div>

      </div>
    );
  }
}

export default Calendar;