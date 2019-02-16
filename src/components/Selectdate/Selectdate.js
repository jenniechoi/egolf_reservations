import React from 'react';

class Selectdate extends React.Component {
    constructor(props) {
        super (props);
        this.state = {
            dateChange: ''
        } 
    }

    onDateChange = (event) => {
        this.setState({dateChange: event.target.value})
    }

    onSubmitDate = () => {
        if (this.state.dateChange) {
            this.props.loadDate(this.state.dateChange);
            this.props.onRouteChange('Viewday');
        } else {
            alert('Need to select a date')
        }
    }

    render() {
        return ( 
            <div>
                <div className="center" style ={{display: 'flex', justifyContent: 'space-between', margin: '.5em'}}>
                    <a onClick = {() =>this.props.onRouteChange('Calendar')} className="f6 link dim br3 ba bw1 ph3 pv2 mb2 dib mid-gray bg-white" href="#0">
                        Back to Calendar
                    </a>
                    
                    <a onClick = {() =>this.props.onRouteChange('Newres')} className="f6 link dim br3 ba bw1 ph3 pv2 mb2 dib mid-gray bg-white" href="#0">
                        Create New Reservation
                    </a>
                </div>    

                <div className = 'bg-white center mw6'>
                        <label className="center bg-white" htmlFor="start">Select reservation date:</label>
                        <input className = "center bg-white" type="date" id="start" name="trip-start"
                            onChange={this.onDateChange}
                            value= {this.state.dateChange}
                            min="2018-11-01" max="2025-12-31"></input>                    
                
                </div>

                <br></br>

                <div className="ph3 mw6 center" style ={{display: 'flex', justifyContent: 'center'}}>
                    <a onClick = {() =>this.onSubmitDate()} className="f6 link dim br3 ba bw1 ph3 pv2 mb2 dib mid-gray bg-white" href="#0">
                        Select Date
                    </a>
                </div>    
            </div>
        );
    }
}

export default Selectdate;