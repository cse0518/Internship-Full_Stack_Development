import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Nav extends Component {
    state = { 
        
     }

    constructor(props) {
        super(props);
    }

    render() { 
        return ( 
            <nav class="navbar navbar-expand navbar-light bg-white topbar static-top shadow" style={{width:'100%'}}>
                <button id="sidebarToggle" class="btn btn-link rounded-circle mr-3">
                    <i class="fa fa-bars"></i>
                </button>
                <h4 style={{marginTop: '5px'}}>QR코드를 통한 설비 관리 시스템</h4>
                <ul class="navbar-nav ml-auto h-100 align-items-center">
                    <li class="nav-item">
                        <a class="nav-link px-1" href="/user/user.do">
                            <i class="fas fa-user px-2"></i>
                            <span class="mr-2 d-none d-lg-inline text-gray-600 large">{this.props.loginUser.userNm}</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link px-2" href="/" >
                            <i class="fas fa-sign-out-alt mr-2 text-gray-400"></i>
                        </a>
                    </li>
                </ul>
            </nav>
         );
    }
}
 
export default Nav;