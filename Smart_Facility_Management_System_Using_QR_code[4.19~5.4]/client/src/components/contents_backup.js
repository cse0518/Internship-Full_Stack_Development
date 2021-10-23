import React, {Component} from 'react';
import {Button, Card, Container, Form, Row, Col, Table} from 'react-bootstrap';
import '../css/contents.css';
import GaugeChart from 'react-gauge-chart';
// import { FaCentercode } from 'react-icons/fa';

// import ReactDOM from "react-dom";
import MDBContainer from '../dashboard/chart.jsx';
import SalesChart1 from "../dashboard/Sales1";
import SalesChart2 from "../dashboard/Sales2";

import ProgressBar from "bootstrap-progress-bar";


//  gauge-chart
// https://www.npmjs.com/package/react-gauge-chart

//  amcharts
// https://www.c-sharpcorner.com/article/implementation-of-amcharts-in-react/
// https://codesandbox.io/s/km8kwx0ylv

//  bar-chart
// https://coding-restaurant.tistory.com/65

//  bootstrap-progress-bar
// https://www.npmjs.com/package/bootstrap-progress-bar

 
/*import EventList from 'components/EventList';
import EventHis from 'components/EventHis';*/
/*import Area1 from 'components/Area1';
import Charts from 'components/Charts';*/

const Contents = () => {
    
    return (
        <Container>
            <Row style={{backgroundColor: 'rgba(0, 0, 0, .02)', height: '75vh'}}>
                <Col xs lg="2" style={{padding: '10px', height: '100%'}}>
                    <Row style={{padding: '0 0 0 18px', height: '15%', justifyContent: 'space-between'}}>
                        <Card style={{backgroundColor: '#e74a3b',color: 'white', border: '0', width: '32%', height: '90%'}}>
                            <Card.Body style={{textAlign: 'center', padding: '1.25rem 0 1.25rem 0'}}>
                                <Card.Title style={{fontSize: 16, margin:'0'}}>Critical</Card.Title>
                                <Card.Text style={{fontSize: 30}}>1</Card.Text>
                            </Card.Body>
                        </Card>
                        <Card style={{backgroundColor: '#fb811c',color: 'white', width: '32%', height: '90%'}}>
                            <Card.Body style={{textAlign: 'center', padding: '1.25rem 0 1.25rem 0'}}>
                                <Card.Title style={{fontSize: 16, margin:'0'}}>major</Card.Title>
                                <Card.Text style={{fontSize: 30}}>1</Card.Text>
                            </Card.Body>
                        </Card>
                        <Card style={{backgroundColor: '#f6c23e',color: 'white', width: '32%', height: '90%'}}>
                            <Card.Body style={{textAlign: 'center', padding: '1.25rem 0 1.25rem 0'}}>
                                <Card.Title style={{fontSize: 16, margin:'0'}}>minor</Card.Title>
                                <Card.Text style={{fontSize: 30}}>0</Card.Text>
                            </Card.Body>
                        </Card>
                    </Row>
                    <Row style={{padding: '0 0 0 18px', height: '45%'}}>
                        <Card style={{ width: '22rem', height: '22rem' }}>
                            <Card.Header>플랫폼 그룹 선택</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Row>
                    <Row style={{padding: '0 0 0 18px', height: '40%'}}>
                        <Card style={{ width: '22rem'}}>
                            <Card.Header>IP 교환기</Card.Header>
                            <Card.Body style={{ paddingLeft: '0', paddingRight: '0' }}>
                                <Card.Text style={{ display: 'flex' }}>
                                    <div style={{ width: '100px' }}>
                                    </div>
                                    <div style={{ paddingLeft: '0' }}>
                                        <table style={{height: "auto", width:"100%"}}>
                                            <tr>
                                                <th colSpan="2">
                                                    교환기
                                                </th>
                                            </tr>
                                            <tr>
                                                <td>
                                                    CPU
                                                </td>
                                                <td>
                                                    <div><span> 60 </span>%</div>
                                                    <ProgressBar width="60%" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    MEM
                                                </td>
                                                <td>
                                                    <div><span> 40 </span>%</div>
                                                    <ProgressBar width="40%" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    디스크
                                                </td>
                                                <td style={{width: "100px"}}>
                                                    <div><span> 80 </span>%</div>
                                                    <ProgressBar width="80%" />
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Row>
                   {/* <Area1/>
                    <Charts/>*/}
                </Col>
                <Col xs lg="6" style={{padding: '10px 0 10px 18px', height: '100%'}}>
                    <Card style={{height: '100%'}}>
                        <Card.Header style={{display: 'flex'}}>
                            토폴리지맵
                            <div style={{marginLeft: 'auto'}}>
                                <Button variant="outline-success" style={{backgroundColor: '#0791d1',color: 'white', fontSize: 14, width: '5rem', height: '2rem', margin: '0 5px 0 5px'}}>IP 검색</Button>
                                <Button variant="outline-success" style={{backgroundColor: '#0791d1',color: 'white', fontSize: 14, width: '5rem', height: '2rem', margin: '0 5px 0 5px'}}>맵 편집</Button>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                            {/*     <ReactTree></ReactTree>
                                <treetest/> */}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs lg="2" style={{padding: '10px 0 10px 12px', paddingRight:'0', height: '100%'}}>
                    <Col style={{height: '30%', paddingLeft: '0', paddingRight:'0'}}>
                        <Card>
                            <Card.Header>CPU 성능</Card.Header>
                            <Card.Body>
                                <Card.Text style={{height: '11vh'}}>
                                    <GaugeChart id="gauge-chart2" 
                                    nrOfLevels={20} 
                                    percent={0.80}
                                    />
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col style={{height: '35%', paddingLeft: '0', paddingRight:'0'}}>
                        <Card>
                            <Card.Header>네트워크 성능</Card.Header>
                            <Card.Body style={{padding:'0', backgroundColor: '#f8f9fc'}}>
                                <Card.Text style={{height: '100%'}}>
                                    <SalesChart1/>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col style={{height: '35%', paddingLeft: '0', paddingRight:'0'}}>
                        <Card>
                            <Card.Header>CPU TOP/N</Card.Header>
                            <Card.Body>
                                <Card.Text style={{height: '15.85vh'}}>
                                    <MDBContainer/>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Col>
                <Col xs lg="2" style={{padding: '10px 5px 10px 12px', paddingRight:'0', height: '100%'}}>
                    <Col style={{height: '30%', paddingLeft: '0', paddingRight:'0'}}>
                        <Card>
                            <Card.Header>MEM 성능</Card.Header>
                            <Card.Body>
                                <Card.Text style={{height: '11vh'}}>
                                    <GaugeChart id="gauge-chart2" 
                                    nrOfLevels={20} 
                                    percent={0.60}
                                    />
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col style={{height: '35%', paddingLeft: '0', paddingRight:'0'}}>
                        <Card>
                            <Card.Header>파일시스템 성능</Card.Header>
                            <Card.Body style={{padding:'0', backgroundColor: '#f8f9fc'}}>
                                <Card.Text style={{height: '100%'}}>
                                    <SalesChart2/>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col style={{height: '35%', paddingLeft: '0', paddingRight:'0'}}>
                        <Card>
                            <Card.Header>MEM TOP/N</Card.Header>
                            <Card.Body>
                                <Card.Text style={{height: '15.85vh'}}>
                                    <MDBContainer/>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Col>
            </Row>
            <Row>
                <Col style={{padding: '0 10px 10px 13px'}}>
                    <Card>
                        <Card.Header style={{display: 'flex'}}>
                            일반 고장 이력
                            <div style={{marginLeft: 'auto'}}>
                                <Button variant="outline-success" style={{backgroundColor: '#e74a3b',color: 'white', fontSize: 14, width: '3rem', height: '2rem', margin: '0 5px 0 5px'}}>1</Button>
                                <Button variant="outline-success" style={{backgroundColor: '#fb811c',color: 'white', fontSize: 14, width: '3rem', height: '2rem', margin: '0 5px 0 5px'}}>1</Button>
                                <Button variant="outline-success" style={{backgroundColor: '#f6c23e',color: 'white', fontSize: 14, width: '3rem', height: '2rem', margin: '0 5px 0 5px'}}>0</Button>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <Table reponsive="sm">
                                <thead>
                                    <tr>
                                    <th>순서</th>
                                    <th>선택</th>
                                    <th>처리상태</th>
                                    <th>고장등급</th>
                                    <th>발생일자</th>
                                    <th>고장종류</th>
                                    <th>고장내용</th>
                                    <th>그룹명</th>
                                    <th>장비명</th>
                                    <th>포트명</th>
                                    <th>포트IP</th>
                                    <th>운영자 메세지</th>
                                </tr>
                                <tr>
                                    <td colSpan="12" align="center">No data available in table</td>
                                </tr>
                                </thead>
                            </Table>
                            <Card.Text style={{display: 'flex'}}>
                                [ 현재 0 - 0 ] / [ 총 0건 ]
                                <div style={{marginLeft: 'auto'}}>
                                    <Button variant="outline-success" style={{backgroundColor: '#04577d',color: 'white', fontSize: 14, width: '5rem', height: '2rem'}}>Previous</Button>
                                    <Button variant="outline-success" style={{backgroundColor: '#04577d',color: 'white', fontSize: 14, width: '4rem', height: '2rem'}}>Next</Button>
                                </div>
                            </Card.Text>
                            <div>
                                <Button variant="outline-success" style={{backgroundColor: '#0791d1',color: 'white', fontSize: 12, width: '6rem', height: '1.7rem'}}>운영자 확인</Button>
                                <Button variant="outline-success" style={{backgroundColor: '#0791d1',color: 'white', fontSize: 12, width: '4.5rem', height: '1.7rem'}}>Trap Ack</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col style={{padding: '0 2px 10px 0'}}>
                    <Card>
                        <Card.Header style={{display: 'flex'}}>
                            교환기 고장 이력
                            <div style={{marginLeft: 'auto'}}>
                                <Button variant="outline-success" style={{backgroundColor: '#e74a3b',color: 'white', fontSize: 14, width: '3rem', height: '2rem', margin: '0 5px 0 5px'}}>0</Button>
                                <Button variant="outline-success" style={{backgroundColor: '#fb811c',color: 'white', fontSize: 14, width: '3rem', height: '2rem', margin: '0 5px 0 5px'}}>0</Button>
                                <Button variant="outline-success" style={{backgroundColor: '#f6c23e',color: 'white', fontSize: 14, width: '3rem', height: '2rem', margin: '0 5px 0 5px'}}>0</Button>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <Table reponsive="sm">
                                <thead>
                                    <tr>
                                        <th>순서</th>
                                        <th>ALARM ID</th>
                                        <th>고장등급</th>
                                        <th>발생일자</th>
                                        <th>고장내용</th>
                                        <th>캐비닛</th>
                                        <th>슬롯</th>
                                    </tr>
                                    <tr>
                                        <td colSpan="7" align="center">No data available in table</td>
                                    </tr>
                                </thead>   
                            </Table>
                            <Card.Text style={{display: 'flex'}}>
                                [ 현재 0 - 0 ] / [ 총 0건 ]
                                <div style={{marginLeft: 'auto'}}>
                                    <Button variant="outline-success" style={{backgroundColor: '#04577d',color: 'white', fontSize: 14, width: '5rem', height: '2rem'}}>Previous</Button>
                                    <Button variant="outline-success" style={{backgroundColor: '#04577d',color: 'white', fontSize: 14, width: '4rem', height: '2rem'}}>Next</Button>
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Contents;