import React, {Component} from 'react';
import { BrowserRouter,Route } from 'react-router-dom';
import './css/App.css';
import 'bootstrap/dist/js/bootstrap.bundle';

import Nav from './home/Nav';
import Footer from './home/Footer';
import Sidebar from './home/Sidebar';

import Login from "./containers/Login";
import dashboard from "./home/dashboard";
import sulbi from "./sulbis/sulbi";
import schedule from "./jungbis/schedule";
import QRAdd from "./qrs/QrAdd";
import code from "./code/code";
import code_location from "./code_location/code_location";
import Freeview from './Freeview/Upload';
import Cal from "./jungbis/calendar";
import Detail from "./sulbis/Detail";

import axios from 'axios';

import './vendor/fontawesome-free/css/all.min.css';
import './css/nc-style.css';
import './vendor/bootstrap-datatables/dataTables.bootstrap4.css';
import './vendor/bootstrap-select-1.13.9/bootstrap-select.css';
import './vendor/datepicker/css/bootstrap-datetimepicker.css';
import  './vendor/amcharts/amcharts/plugins/export/export.css';
import  './css/modal-table.css';
import  './css/kt-iptv.css';
import  './css/inbangsa-style.css';
// import  './css/nc-style-dark.css';
// import './css/jquery-ui.css';

class App extends Component {
  state = { 
      LoginUser: {
          userNm: "aaaaaaaa",
          power: "2",
      }
   }

   componentDidMount() {
      axios.post('http://localhost:8080/user/selecteMenu.do', JSON.stringify({"servletPath" : '/main.do'})).then((res) => {
          console.log(res);
      }).catch((err) => {
          console.log(err);
      })
   }

  render() {
    return (
      <>
      <BrowserRouter>
        <div style={{display: 'flex'}}>
            <Sidebar loginUser={this.state.LoginUser}/>
            <div style={{flex: 1}}>
                <Nav loginUser={this.state.LoginUser} />
                <div class="container-fluid page-body-wrapper">
                    <div>
                      <Route exact path='/' component={Login}/>
                      <Route exact path='/main' component={dashboard}/>
                      <Route exact path='/sulbi' component={sulbi}/>
                      <Route exact path='/Detail/:idx' component={Detail}/>
                      <Route exact path='/schedule' component={schedule}/>
                      <Route exact path='/code' component={code}/>
                      <Route exact path='/code/location' component={code_location}/>
                      <Route exact path='/Freeview' component={Freeview}/>
                      <Route exact path='/cal' component={Cal}/>
                      <Route exact path='/qr/jajae' component={QRAdd}/>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
      </BrowserRouter>
      </>
    );
  }
}

export default App;
