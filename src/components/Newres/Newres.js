import React from 'react';
import './Newres.css';

class Newres extends React.Component {
    constructor(props) {
        super (props);
        this.state = {
            name: '',
            phone: '',
            group_size: '',
            reservation_day: '',
            start_time: '',
        }
    }
    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }
    onPhoneChange = (event) => {
        this.setState({phone: event.target.value})
    }
    onGroupChange = (event) => {
        this.setState({group_size: event.target.value})
    }
    onDateChange = (event) => {
        this.setState({reservation_day: event.target.value})
    }
    onTimeChange = (event) => {
        this.setState({start_time: event.target.value})
    }

    onSubmitReservation = () => {
        fetch('https://pacific-beyond-36413.herokuapp.com/newreservation', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                phone: this.state.phone,
                reservation_day: this.state.reservation_day,
                group_size: this.state.group_size,
                start_time: this.state.start_time
            })
        })
        .then(response => response.json())
        .then(serverMessage => {
            if (serverMessage === "missing fields") {
              alert('Error creating reservation. Make sure form is filled out.')  
            } else if (serverMessage === "no station"){
                alert('No stations available at that time')
            } else {
                alert('Reservation created!')
                this.props.onRouteChange('Calendar')
            }
        })
    }

    render() {
        return (
            <div>
                <div className="center" style ={{display: 'flex', justifyContent: 'space-between', margin: '.5em'}}>
                    <a onClick = {() =>this.props.onRouteChange('Calendar')} className="f6 link dim br3 ba bw1 ph3 pv2 mb2 dib mid-gray bg-white" href="#0">
                        Back to Calendar
                    </a>
                </div>  
                
                <article className="br3 ba b--black-10 mw7 shadow-5 center bg-near-white">
                <main className="pa4 black-80">
                    <div>
                        <h2>New Reservation</h2>
                        <fieldset id="sign_up" className="b--transparent">
                            <div>
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input className="pa2 input-reset ba bg-white hover-bg-gray hover-white w-100" type="name" name="name"  id="name"
                                    onChange={this.onNameChange}/>
                            </div>

                            <div>
                                <label className="db fw6 lh-copy f6" htmlFor="phone">Phone Number</label>
                                <input className="b pa2 input-reset ba bg-white hover-bg-gray hover-white w-100" type="phone" name="phone"  id="phone"
                                    onChange={this.onPhoneChange}/>
                            </div>

                            <div>
                                <label className="db fw6 lh-copy f6" htmlFor="group_size">Group Size</label>
                                <input className="b pa2 input-reset ba bg-white hover-bg-gray hover-white w-100" type="group_size" name="group_size"  id="group_size"
                                    onChange={this.onGroupChange}/>
                            </div>

                            <div>
                                <label className="db fw6 lh-copy f6" htmlFor="reservation_day">Reservation Day</label>
                                <input className="b pa2 input-reset ba bg-white hover-bg-gray hover-white w-100" type="date" id="reservation_day" name="reservation_day"
                                    onChange={this.onDateChange}
                                    value= {this.state.reservation_day}
                                    min="2018-12-01" max="2025-12-31"></input>                    
                            </div>

                            <div>
                                <label className="db fw6 lh-copy f6" htmlFor="start_time">Reservation Time</label>
                                <input className="b pa2 input-reset ba bg-white hover-bg-gray hover-white w-100" type="time" name="start_time"  id="start_time"
                                    onChange={this.onTimeChange}
                                    value = {this.state.start_time}/>
                            </div>
                        </fieldset>
                    </div>
                    <div style ={{display: 'flex', justifyContent: 'space-between'}}>
                        <a 
                            onClick = {this.onSubmitReservation}
                            type="submit" 
                            className="center f6 link dim br3 ba bw1 ph3 pv2 mb2 dib black bg-white" href="#0">
                                Submit Reservation
                        </a>
                    </div>
                </main>
            </article>
            </div>
        );
    }
}

export default Newres;