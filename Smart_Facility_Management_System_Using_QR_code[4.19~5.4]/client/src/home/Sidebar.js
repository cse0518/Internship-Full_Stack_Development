import React, { Component } from 'react';
import logo from '../logo.png';

class Sidebar extends Component {
    state = { 

     }

    render() { 
        return ( 
            <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                <a class="sidebar-brand d-flex align-items-center justify-content-center" href="/main">
                    <div class="sidebar-brand-icon text-center">
                        <img style={{width:'13rem'}} class="d-block mx-auto" id="sidebarImg" src={logo} alt="" />
                    </div>

                    <button id="sidebarToggle" class="btn btn-link mb-0 d-none">
                        <i class="fa fa-bars"></i>
                    </button>
                </a>
                <hr class="sidebar-divider my-0" />
                    
            
                <li class="nav-item">
                <a class="nav-link" href="/main">
                        <i class="fas fa-fw fa-tachometer-alt"></i>
                        <span>메인 대시보드</span>
                </a>
                </li>
                <hr class="sidebar-divider" />
                {
                    this.props.loginUser.power === '2' && (
                        <li class="nav-item">
                            <a class="nav-link collapsed" href="/sulbi"  data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                <i class="fas fa-sitemap"></i>
                                <span>설비관리</span>
                            </a>
                            <div id="collapseOne" class="collapse bg-gray-200 shadow"data-parent="#accordionSidebar">
                                <a class="dropdown-item" href="/sulbi"><i class="far fa-dot-circle fa-sm pr-1"></i>설비정보관리</a>
                            </div>
                        </li>
                    )
                }
                <li class="nav-item">
                    <a class="nav-link collapsed" href="/schedule"  data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                        <i class="fas fa-check-square"></i>
                        <span>정비관리</span>
                    </a>
                    <div id="collapseTwo" class="collapse bg-gray-200 shadow" data-parent="#accordionSidebar">
                        <a class="dropdown-item" href="/schedule"><i class="far fa-dot-circle fa-sm pr-1"></i>정비스케쥴 관리</a>
                        <a class="dropdown-item" href="/cal"><i class="far fa-dot-circle fa-sm pr-1"></i>정비 CALENDAR</a>
                    </div>
                </li>

                <li class="nav-item">
                    <a class="nav-link collapsed" href="/qr/jajae" data-toggle="collapse" data-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                        <i class="fas fa-chart-pie"></i>
                        <span>자재 QR코드관리</span>
                    </a>
                    <div id="collapseThree" class="collapse bg-gray-200 shadow" data-parent="#accordionSidebar">
                        <a class="dropdown-item" href="/qr/jajae"><i class="far fa-dot-circle fa-sm pr-1"></i>자재 QR코드 생성관리</a>
                    </div>
                </li>

                <li class="nav-item">
                    <a class="nav-link collapsed" href="/code"  data-toggle="collapse" data-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour">
                        <i class="fas fa-server"></i>
                        <span>코드관리</span>
                    </a>
                    <div id="collapseFour" class="collapse bg-gray-200 shadow" data-parent="#accordionSidebar">
                        <a class="dropdown-item" href="/code"><i class="far fa-dot-circle fa-sm pr-1"></i>설비분류관리</a>
                        <a class="dropdown-item" href="/code/location"><i class="far fa-dot-circle fa-sm pr-1"></i>설비위치관리</a>
                    </div>
                </li>

        
                <li class="nav-item">
                    <a class="nav-link collapsed" href="/changgo"  data-toggle="collapse" data-target="#collapseFive" aria-expanded="true" aria-controls="collapseFive">
                        <i class="fas fa-user"></i>
                        <span>3D 창고조회</span>
                    </a>
                    <div id="collapseFive" class="collapse bg-gray-200 shadow" data-parent="#accordionSidebar">
                        <a class="dropdown-item" href="/Freeview"><i class="far fa-dot-circle fa-sm pr-1"></i>3D 창고조회</a>
                    </div>
                </li>
            </ul>
        );
    }
}

export default Sidebar;