import React from 'react';
import {Image} from 'react-bootstrap';
import {SidebarHeader, SidebarContent, SidebarFooter, ProSidebar, Menu, MenuItem, SubMenu} from 'react-pro-sidebar';
import {FaTachometerAlt, FaList, FaCheckSquare, FaChartPie} from 'react-icons/fa';
import 'react-pro-sidebar/dist/css/styles.css';
import '../css/sidebar.css';
import logo from './nextcore_logo.png';

const Sidebar = () => {
    return (
        <ProSidebar>
            <SidebarHeader>
                <div>
                    <Image src={logo}
                           style={{
                               backgroundColor: 'white',
                               width: '180px'
                           }}/>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <Menu iconShape="circle">
                    <MenuItem icon={<FaTachometerAlt/>}>
                        단말 현황
                    </MenuItem>
                    <MenuItem icon={<FaTachometerAlt/>}>
                        메인 대시보드
                    </MenuItem>
                    <MenuItem icon={<FaList/>}>구성관리</MenuItem>
                    <MenuItem icon={<FaChartPie/>}>고장관리</MenuItem>
                    <MenuItem icon={<FaCheckSquare/>}>고장통계</MenuItem>
                    <MenuItem icon={<FaList/>}>교환기 고장관리</MenuItem>
                    <MenuItem icon={<FaChartPie/>}>교환기 고장통계</MenuItem>
                    <MenuItem icon={<FaCheckSquare/>}>성능통계</MenuItem>
                    <MenuItem icon={<FaList/>}>사용자관리</MenuItem>
                    
                </Menu>
                {/*<Menu iconShape="circle">
                        <SubMenu
                            icon={<FaRegLaughWink />}
                        >
                            <MenuItem>1</MenuItem>
                            <MenuItem>2</MenuItem>
                            <MenuItem>3</MenuItem>
                        </SubMenu>
                        <SubMenu
                            icon={<FaHeart />}
                        >
                            <MenuItem>1</MenuItem>
                            <MenuItem>2</MenuItem>
                            <MenuItem>3</MenuItem>
                        </SubMenu>
                        <SubMenu icon={<FaList />}>
                            <MenuItem> 1 </MenuItem>
                            <MenuItem> 2 </MenuItem>
                            <SubMenu title={`3`}>
                                <MenuItem> 3.1 </MenuItem>
                                <MenuItem> 3.2 </MenuItem>
                                <SubMenu title={`3.3`}>
                                    <MenuItem> 3.3.1 </MenuItem>
                                    <MenuItem> 3.3.2 </MenuItem>
                                    <MenuItem> 3.3.3 </MenuItem>
                                </SubMenu>
                            </SubMenu>
                        </SubMenu>
                    </Menu>*/}
            </SidebarContent>

            {/* <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a
                            href="https://github.com/azouaoui-med/react-pro-sidebar"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <FaGithub />
                            <span></span>
                        </a>
                    </div>
                </SidebarFooter>*/}
        </ProSidebar>
    );
};

export default Sidebar;