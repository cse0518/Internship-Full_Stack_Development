import React, {Component} from 'react';
import logoIn from '../../img/logoIn.png';

class Sidebar extends Component {
    render() {
        return (
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                <span className="logo-section logo-bar mb-0">
                    <img className="" src={logoIn} alt=""/>
                </span>
                    <div className="sidebar-brand-text mx-3 text-left">
                        IPTNMS
                    </div>
                    <button id="sidebarToggle" className="btn btn-link mb-0 d-none">
                        <i className="fa fa-bars"></i>
                    </button>
                </a>

                {/*<hr className="sidebar-divider my-0">*/}

                <li className="nav-item">
                    <a className="nav-link" href="/modevice/voipInfo.do">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>단말 현황</span>
                    </a>
                </li>

                {/*<hr className="sidebar-divider my-0">*/}

                <li className="nav-item active">
                    <a className="nav-link" href="/">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>메인 대시보드</span>
                    </a>
                </li>

                {/*<hr className="sidebar-divider">*/}

                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseOne"
                       aria-expanded="true" aria-controls="collapseOne">
                        <i className="fas fa-sitemap"></i>
                        <span>구성관리</span>
                    </a>
                    <div id="collapseOne" className="collapse bg-gray-200 shadow"
                         data-parent="#accordionSidebar">
                        <a className="dropdown-item" href="/device/device_list.do"><i
                            className="far fa-dot-circle fa-sm pr-1"></i>장비구성관리</a>
                        <a className="dropdown-item" href="/device/device_critical.do"><i
                            className="far fa-dot-circle fa-sm pr-1"></i>장비임계치관리</a>
                        <a className="dropdown-item" href="/device/device_history.do"><i
                            className="far fa-dot-circle fa-sm pr-1"></i>장비변경이력</a>
                        <a className="dropdown-item" href="/device/device_manage.do"><i
                            className="far fa-dot-circle fa-sm pr-1"></i>장비관리이력</a>
                        <a className="dropdown-item" href="/device/dbbackup_history.do"><i
                            className="far fa-dot-circle fa-sm pr-1"></i>DB백업관리</a>
                        <a className="dropdown-item" href="/device/process.do"><i
                            className="far fa-dot-circle fa-sm pr-1"></i>프로세스관리</a>
                        <a className="dropdown-item" href="/device/process_history.do"><i
                            className="far fa-dot-circle fa-sm pr-1"></i>프로세스이력관리</a>
                    </div>
                </li>

                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
                       aria-expanded="true" aria-controls="collapseTwo">
                        <i className="fas fa-check-square"></i>
                        <span>고장관리</span>
                    </a>
                    <div id="collapseTwo" className="collapse bg-gray-200 shadow"
                         data-parent="#accordionSidebar">
                        <a className="dropdown-item" href="/fault/fault_event_list.do"><i
                            className="far fa-dot-circle fa-sm pr-1"></i>실시간고장내역</a>
                        <a className="dropdown-item" href="/fault/fault_event_his.do"><i
                            className="far fa-dot-circle fa-sm pr-1"></i>실시간고장복구내역</a>
                        <a className="dropdown-item" href="/fault/fault_code.do"><i
                            className="far fa-dot-circle fa-sm pr-1"></i>고장코드관리</a>
                    </div>
                </li>

                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse"
                       data-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                        <i className="fas fa-chart-pie"></i>
                        <span>고장통계</span>
                    </a>
                    <div id="collapseThree" className="collapse bg-gray-200 shadow"
                         data-parent="#accordionSidebar">
                        <a className="dropdown-item" href="/fault/fault_daylist.do"><i
                            className="far fa-dot-circle fa-sm pr-1"></i>일별고장통계</a>
                        <a className="dropdown-item" href="/fault/fault_daystatics.do"><i
                            className="far fa-dot-circle fa-sm pr-1"></i>일별시간고장통계</a>
                        <a className="dropdown-item" href="/fault/fault_overlap_list.do"><i
                            className="far fa-dot-circle fa-sm pr-1"></i>일별중복다발고장</a>
                    </div>
                </li>

                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse"
                       data-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour">
                        <i className="fas fa-check-square"></i>
                        <span>교환기 고장관리</span>
                    </a>
                    <div id="collapseFour" className="collapse bg-gray-200 shadow"
                         data-parent="#accordionSidebar">
                        <a className="dropdown-item" href="/exFault/exFault_event_list.do"><i
                            className="far fa-dot-circle fa-sm pr-1"></i>실시간고장내역</a>
                        <a className="dropdown-item" href="/exFault/exFault_event_his.do"><i
                            className="far fa-dot-circle fa-sm pr-1"></i>실시간고장복구내역</a>
                    </div>
                </li>


                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse"
                       data-target="#collapseFive" aria-expanded="true" aria-controls="collapseFive">
                        <i className="fas fa-chart-pie"></i>
                        <span>교환기 고장통계</span>
                    </a>
                    <div id="collapseFive" className="collapse bg-gray-200 shadow"
                         data-parent="#accordionSidebar">
                        <a className="dropdown-item" href="/exFault/exFault_daylist.do"><i
                            className="far fa-dot-circle fa-sm pr-1"></i>일별고장통계</a>
                        <a className="dropdown-item" href="/exFault/exFault_daystatics.do"><i
                            className="far fa-dot-circle fa-sm pr-1"></i>일별시간고장통계</a>
                        <a className="dropdown-item" href="/exFault/exFault_overlap_list.do"><i
                            className="far fa-dot-circle fa-sm pr-1"></i>일별중복다발고장</a>
                    </div>
                </li>

                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseSix"
                       aria-expanded="true" aria-controls="collapseSix">
                        <i className="fas fa-server"></i>
                        <span>성능통계</span>
                    </a>
                    <div id="collapseSix" className="collapse bg-gray-200 shadow"
                         data-parent="#accordionSidebar">
                        <a className="dropdown-item" href="/perform/perform_device.do"><i
                            className="far fa-dot-circle fa-sm pr-1"></i>장비성능</a>
                        <a className="dropdown-item" href="/perform/perform_port.do"><i
                            className="far fa-dot-circle fa-sm pr-1"></i>장비포트성능</a>
                        <a className="dropdown-item" href="/perform/perform_fs.do"><i
                            className="far fa-dot-circle fa-sm pr-1"></i>파일시스템성능</a>
                        <a className="dropdown-item" href="/perform/perform_pastweek.do"><i
                            className="far fa-dot-circle fa-sm pr-1"></i>전주비교성능</a>
                    </div>
                </li>

                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse"
                       data-target="#collapseSeven" aria-expanded="true" aria-controls="collapseSeven">
                        <i className="fas fa-user"></i>
                        <span>사용자관리</span>
                    </a>
                    <div id="collapseSeven" className="collapse bg-gray-200 shadow"
                         data-parent="#accordionSidebar">
                        <a className="dropdown-item" href="/user/user.do"><i
                            className="far fa-dot-circle fa-sm pr-1"></i>사용자정보관리</a>
                        <a className="dropdown-item" href="/user/user_node.do"><i
                            className="far fa-dot-circle fa-sm pr-1"></i>그룹관리</a>
                        <a className="dropdown-item" href="/user/user_ip.do"><i
                            className="far fa-dot-circle fa-sm pr-1"></i>접속허용IP관리</a>
                        <a className="dropdown-item" href="/user/user_access.do"><i
                            className="far fa-dot-circle fa-sm pr-1"></i>사용자접속현황관리</a>
                    </div>
                </li>
                {/*</hr>
                    </hr>
                </hr>*/}
            </ul>
        );
    }
}

export default Sidebar;