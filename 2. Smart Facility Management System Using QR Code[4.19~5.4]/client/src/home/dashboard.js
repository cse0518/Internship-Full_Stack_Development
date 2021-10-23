import React, {Component} from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import Cal from "../jungbis/calendar_dash";
import Freeview from "../Freeview/Upload_dash";
import Chart from "./chart1";

class dashboard extends Component {
    constructor(props) {
      super(props);
      this.state = {
        count1: '',
        count2: '',
        count3: '',
        count4: '',
      }
    }

    componentDidMount() {
        this.callApi('/api/count1')
            .then(res => this.setState({ count1: res[0].count1 }))
            .catch(err => console.log(err));
        this.callApi('/api/count2')
            .then(res => this.setState({ count2: res[0].count2 }))
            .catch(err => console.log(err));
        this.callApi('/api/count3')
            .then(res => this.setState({ count3: res[0].count3 }))
            .catch(err => console.log(err));
        this.callApi('/api/count4')
            .then(res => this.setState({ count4: res[0].count4 }))
            .catch(err => console.log(err));
    }

    callApi = async (url) => {
        const response = await fetch(url);
        const body = await response.json();
        return body;
    }

    render() { 
        return (
            <div style={{display:'flex'}}>
                <Col xs lg="7">
                    <Row style={{height:'150px'}}>
                        <Col style={{height:'140px'}}>
                            <Card style={{height:'150px'}}>
                                <Card.Header><i class="fas fa-angle-right" style={{marginRight:'5px'}}></i>설비 일정</Card.Header>
                                <Card.Body style={{textAlign: 'center', display:'flex'}}>
                                    <Card style={{backgroundColor:'rgb(231, 76, 60)', color:'white', width:'50%'}}>
                                        <Card.Text style={{fontSize: 30, marginTop:'5px'}}><h3>설비 예정</h3>{this.state.count1}</Card.Text>
                                    </Card>
                                    <Card style={{backgroundColor:'rgb(243, 156, 18)', color:'white', width:'50%'}}>
                                        <Card.Text style={{fontSize: 30, marginTop:'5px'}}><h3>TODAY</h3>{this.state.count2}</Card.Text>
                                    </Card>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col style={{height:'140px'}}>
                            <Card style={{height:'150px'}}>
                                <Card.Header><i class="fas fa-angle-right" style={{marginRight:'5px'}}></i>정비 일정</Card.Header>
                                <Card.Body style={{textAlign: 'center', display:'flex'}}>
                                    <Card style={{backgroundColor:'rgb(231, 76, 60)', color:'white', width:'50%'}}>
                                        <Card.Text style={{fontSize: 30, marginTop:'5px'}}><h3>정비 예정</h3>{this.state.count3}</Card.Text>
                                    </Card>
                                    <Card style={{backgroundColor:'rgb(243, 156, 18)', color:'white', width:'50%'}}>
                                        <Card.Text style={{fontSize: 30, marginTop:'5px'}}><h3>TODAY</h3>{this.state.count4}</Card.Text>
                                    </Card>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row><br/>
                    <Row>
                        <Card style={{width:'99%', height:'700px'}}>
                            <Card.Header><i class="fas fa-angle-right" style={{marginRight:'5px'}}></i>3D 창고 이미지</Card.Header>
                            <Card.Body>
                                <Freeview />
                            </Card.Body>
                        </Card>
                    </Row>
                </Col>
                <Col xs lg="5">
                    <Row style={{height:'320px'}}>
                        <Card style={{width:'100%', height:'330px'}}>
                            <Card.Header><i class="fas fa-angle-right" style={{marginRight:'5px'}}></i>설비 및 정비일정 그래프</Card.Header>
                            <Card.Body>
                                <Chart/>
                            </Card.Body>
                        </Card>
                    </Row><br/>
                    <Row>
                        <Card style={{width:'100%', height:'530px'}}>
                            <Card.Header><i class="fas fa-angle-right" style={{marginRight:'5px'}}></i>정비 캘린더</Card.Header>
                            <Card.Body style={{textAlign:'center'}}>
                                <Cal/>
                            </Card.Body>
                        </Card>
                    </Row>
                </Col>
            </div>
        );
    }
}
 
export default dashboard;