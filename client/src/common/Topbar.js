import React, {Component} from 'react';

class Topbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand navbar-light bg-white topbar static-top shadow">

                <button id="sidebarToggle" className="btn btn-link rounded-circle mr-3">
                    <i className="fa fa-bars"></i>
                </button>
                <ul>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-itemactive" aria-current="page">
                                <li className="breadcrumb-itemactive" aria-current="page">
                                    <span id="topMenu"></span>
                                    <a id="SubMenuUrl" href="">
                                        <span id="SubMenu"></span></a>
                                    <span id="SubSubMenu"></span>
                                </li>
                            </li>
                        </ol>
                    </nav>
                </ul>
                <ul className="navbar-nav ml-auto h-100 align-items-center">

                    <li className="nav-item">
                        <div className="top-alert-group">
                            <div className="text-primary px-2 border-right">시스템</div>
                            <a className="nav-link pl-2 px-1 cursor-pointer" href="#" /*onClick="fn_selectFaultlevelTable(1);"*/>
                                <span className="rounded bg-critical px-2 text-white font-weight-bold" id="top_critical">5</span>
                            </a>
                            <a className="nav-link px-1 cursor-pointer" href="#" /*onClick="fn_selectFaultlevelTable(2);"*/>
                                <span className="rounded bg-major px-2 text-white font-weight-bold" id="top_major">4</span>
                            </a>
                            <a className="nav-link pr-2 px-1 cursor-pointer" href="#" /*onClick="fn_selectFaultlevelTable(3);"*/>
                                <span className="rounded bg-minor px-2 text-white font-weight-bold" id="top_minor">3</span>
                            </a>
                        </div>
                    </li>

                    <div className="topbar-divider d-none d-sm-block"></div>

                    <li className="nav-item">
                        <a className="nav-link px-1" href="/user/user.do">
                            <i className="fas fa-user px-2"></i>
                            <span className="mr-2 d-none d-lg-inline text-gray-600 small">Test</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link px-1" href="/user/logout.do">
                            <i className="fas fa-sign-out-alt mr-2 text-pointer"></i>
                        </a>
                    </li>

                </ul>

            </nav>
        );
    }
}

export default Topbar;