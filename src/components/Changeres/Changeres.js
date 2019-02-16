import React from 'react';
import './Changeres.css';

class Changeres extends React.Component {
    constructor(props) {
        super (props);
        this.state = {
            reservation_id: '',
            nameChange: '',
            phoneChange: '',
            groupChange: '',
            dateChange: '',
            timeChange: '',
            stationChange: ''
        }
    }

    componentDidMount() {
        this.setState({reservation_id: this.props.reservation.reservation_id})
        this.setState({nameChange: this.props.reservation.name});
        this.setState({phoneChange: this.props.reservation.phone});
        this.setState({groupChange: this.props.reservation.group});
        this.setState({timeChange: this.props.reservation.start_time.slice(0,5)});
        this.setState({stationChange: this.props.reservation.station});
        this.setState({dateChange: this.props.parseReservationDate(this.props.reservation.reservation_date)})
     }

    onNameChange = (event) => {
        this.setState({nameChange: event.target.value})
    }
    onPhoneChange = (event) => {
        this.setState({phoneChange: event.target.value})
    }
    onGroupChange = (event) => {
        this.setState({groupChange: event.target.value})
    }
    onDateChange = (event) => {
        this.setState({dateChange: event.target.value})
    }
    onTimeChange = (event) => {
        this.setState({timeChange: event.target.value})
    }
    onStationChange = (event) => {
        this.setState({stationChange: event.target.value})
    }

    onReservationChange = () => { 
        fetch('https://pacific-beyond-36413.herokuapp.com/changereservation', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                reservation_id: this.state.reservation_id,
                name: this.state.nameChange,
                phone: this.state.phoneChange,
                group_size: this.state.groupChange,
                start_time: this.state.timeChange,
                reservation_day: this.state.dateChange,
                station: this.state.stationChange
            })
        })
        .then(response => response.json())
        .then(changeMessage => {
            if (changeMessage === "reservation updated") {
                this.props.onRouteChange('Viewday')
            } else {
                alert('Reservation conflicts with another one. Try again.')
            }
        })
    }    

    onDeleteReservation = () => {
        fetch('https://pacific-beyond-36413.herokuapp.com/delete', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                reservation_id: this.state.reservation_id
            })
        })
        .then(response => response.json())
        .then(deleteMessage => {
            if (deleteMessage === "reservation deleted") {
                this.props.onRouteChange('Viewday')
            } else {
                alert('Cannot delete')
            }
                
        })
    }

    render() {
        const {onRouteChange} = this.props;
        return (
            <div>
                <div className="center" style ={{display: 'flex', justifyContent: 'space-between'}}>
                    <a onClick = {() =>onRouteChange('Calendar')} className="f6 link dim br3 ba bw1 ph3 pv2 mb2 dib mid-gray bg-white" href="#0">
                        Back to Calendar
                    </a>
                    
                    <a onClick = {() =>onRouteChange('Newres')} className="f6 link dim br3 ba bw1 ph3 pv2 mb2 dib mid-gray bg-white" href="#0">
                        Create New Reservation
                    </a>
                </div>  
                
                <div>
                    <article className="br3 ba b--black-10 mw7 shadow-5 center bg-near-white">
                    <main className="pa4 black-80">
                    <h2>View/Change Reservation</h2>
                        <form>
                            <fieldset id="sign_up" className="b--transparent">
                                <div>
                                    <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                    <input className="pa2 input-reset ba bg-white hover-bg-gray hover-white w-100" type="name" name="name"  id="name" 
                                        value = {this.state.nameChange}
                                        onChange={this.onNameChange}/>
                                </div>

                                <div>
                                    <label className="db fw6 lh-copy f6" htmlFor="phone_number">Phone Number</label>
                                    <input className="b pa2 input-reset ba bg-white hover-bg-gray hover-white w-100" type="phone_number" name="phone_number"  id="phone_number"
                                        value = {this.state.phoneChange}
                                        onChange={this.onPhoneChange}/>
                                </div>

                                <div>
                                    <label className="db fw6 lh-copy f6" htmlFor="group_size">Group Size</label>
                                    <input className="b pa2 input-reset ba bg-white hover-bg-gray hover-white w-100" type="group_size" name="group_size"  id="group_size"
                                        value = {this.state.groupChange}
                                        onChange={this.onGroupChange}/>
                                </div>

                                <div>
                                    <label className="db fw6 lh-copy f6" htmlFor="start">Reservation Day</label>
                                    <input className="b pa2 input-reset ba bg-white hover-bg-gray hover-white w-100" type="date" id="start" name="trip-start"
                                        onChange={this.onDateChange}
                                        value = {this.state.dateChange}
                                        min="2018-11-01" max="2025-12-31"></input>                    
                                </div>

                                <div>
                                    <label className="db fw6 lh-copy f6" htmlFor="start_time">Reservation Time</label>
                                    <input className="b pa2 input-reset ba bg-white hover-bg-gray hover-white w-100" type="time" name="start_time"  id="start_time"
                                        onChange={this.onTimeChange}
                                        value = {this.state.timeChange}/>
                                </div>

                                <div>
                                    <label className="db fw6 lh-copy f6" htmlFor="group_size">Station</label>
                                    <input className="b pa2 input-reset ba bg-white hover-bg-gray hover-white w-100" type="station" name="station"  id="station"
                                        onChange={this.onStationChange}
                                        value = {this.state.stationChange}/> 
                                </div>


                            </fieldset>
                        </form>

                        <div style ={{display: 'flex', justifyContent: 'space-evenly'}}>
                            <a 
                                onClick = {() =>this.onReservationChange()}
                                className="f6 link dim br3 ba bw1 ph3 pv2 mb2 dib mid-gray bg-white" href="#0">
                                    Submit Changes
                            </a>
                            <a 
                                onClick = {() =>this.onDeleteReservation()}
                                className="f6 link dim br3 ba bw1 ph3 pv2 mb2 dib mid-gray bg-white" href="#0">
                                    Delete Reservation
                            </a>

                        </div>
                    </main>
                </article>
                </div>
            </div>
        );
    }
}

export default Changeres;