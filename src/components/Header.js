import React from 'react';
import {Nav, Navbar, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import '../css/header.css';
import {FaList} from 'react-icons/fa';
import {SidebarHeader, SidebarContent, SidebarFooter, ProSidebar, Menu, MenuItem, SubMenu} from 'react-pro-sidebar';
import {FaUserAlt} from 'react-icons/fa';
import {FiLogOut} from 'react-icons/fi';

const Header = () => {
    return (
        <Navbar style={{backgroundColor: '#1e2327'}} expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse style={{color:'#ffffff'}} id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#home" style={{color:'#ffffff', display: 'flex'}}>
                        <MenuItem icon={<FaList style={{margin: '0 15px 0 0'}}/>}/>
                        메인대시보드
                    </Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider/>
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Form inline>
                    <div style={{color: '#0791d1'}}>
                        시스템
                    </div>
                    <div style={{margin: '10px'}}>
                         | 
                    </div>
                    {/* <FormControl type="text" placeholder="Search" className="mr-sm-2"/> */}
                    <Button variant="outline-success" style={{backgroundColor: '#e74a3b',color: 'white', fontSize: 14, width: '3rem', height: '2rem', margin: '0 5px 0 5px'}}>1</Button>
                    <Button variant="outline-success" style={{backgroundColor: '#fb811c',color: 'white', fontSize: 14, width: '3rem', height: '2rem', margin: '0 5px 0 5px'}}>1</Button>
                    <Button variant="outline-success" style={{backgroundColor: '#f6c23e',color: 'white', fontSize: 14, width: '3rem', height: '2rem', margin: '0 5px 0 5px'}}>0</Button>
                    <FaUserAlt style={{margin: '0 10px 0 20px'}}/>administrator!
                    <FiLogOut style={{margin: '0 10px 0 10px'}} />
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;