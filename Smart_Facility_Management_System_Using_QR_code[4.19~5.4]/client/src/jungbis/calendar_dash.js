import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react'
 import dayGridPlugin from '@fullcalendar/daygrid'
// import dayGridPlugin from '@fullcalendar/daygrid'
import axios from 'axios';
import Caladd from "./calendarAdd";
import { Container } from '@material-ui/core';
// import Cal from 'css'
// 'main.css 파일이 위치한 경로'

class cal extends Component {
  state = {
  }

  componentDidMount() {
    this._getEvents();
  }

  _getEvents = async () => {
    const data = await this._axiosEvents();
    console.log(data);
    this.setState({
      events: data
    });
  } 
// '/api/calendar'
  _axiosEvents = () => {
    return axios.get('/api/calendar')
      .then(res => res.data)
  }

  render(){
    const { classes } = this.props;
    let {events} = this.state;

    return (
      // className={classes.menu}>
      <div className="cal" style={{width: '90%'}}>
        {events ? 
          <Container style={{marginLeft:'25px'}}>
            <FullCalendar 
                defaultView="dayGridMonth" 
                plugins={[ dayGridPlugin ]}
                events={this.state.events}
            />
          </Container>:
        'loading'
      }
      </div>
    );
  }
}


export default cal;