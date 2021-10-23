import React, { Component } from 'react';
import {DropdownButton, Dropdown, Container, Card} from 'react-bootstrap'
import { Pannellum } from "pannellum-react";
import myImage from "../images/milan.jpg";
import myImage2 from "../images/milan2.jpg";
import myImage3 from "../images/milan3.jpg";
import myImage4 from "../images/milan4.jpg";

class Upload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            codes: '',
            completed: 0,
            selectItem: [],
            selectKey: '제4작업장',
        }
    }

    componentDidMount() {
        this.timer = setInterval(this.progress, 20);
        this.callApi()
            .then(res => this.setState({ selectItem: res, selectKey: res.LOCATION_NAME }))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/api/sulbi/locations');
        const body = await response.json();
        return body;
    }

    render() {   
      return (
        <div>
            <div className="ex" style={{display:'flex'}}>
              <DropdownButton id="dropdown-basic-button" title="360 VIEW 보기" onSelect={(eventKey) => this.setState({selectKey : eventKey})}>
                {
                    this.state.selectItem.map(function(item, LOCATION_NAME){
                        return ( <Dropdown.Item eventKey={item.LOCATION_NAME}>{item.LOCATION_NAME}</Dropdown.Item> );
                    })
                }
              </DropdownButton>
              <Card style={{width:'125px', backgroundColor:'rgb(133, 133, 133)', color:'white', marginLeft:'72%', textAlign:'center', justifyContent:'center'}}>{this.state.selectKey}</Card>
            </div>
            <div>
              {
                this.state.selectKey === '제1작업장'
                ? ( <div>
                      <Container style={{textAlign: 'right'}}>
                        {/* <Button width="30px" variant="contained" color="secondary" >1구역</Button> */}
                        <Pannellum
                            width="100%"
                            height="590px"
                            image={myImage}
                            pitch={10}
                            yaw={180}
                            hfov={110}
                            autoLoad
                            showZoomCtrl={false}
                            onLoad={() => {
                              console.log("panorama loaded");
                            } }
                        >
                          <Pannellum.Hotspot
                              type="info"
                              pitch={5}
                              yaw={150}
                              text="A.정보보기"
                              URL='https://next-core.co.kr/'
                              handleClick={(evt, name) => console.log(name)}
                              name="hs1"
                              handleClickArg={{ "name":"test" }}
                          />
                        </Pannellum>
                      </Container>
                    </div>)
                    
                : this.state.selectKey === '제2작업장'
                    ? ( <div>
                          <Container style={{textAlign: 'right'}}>
                            <Pannellum
                            width="100%"
                            height="590px"
                            image={myImage2}
                            pitch={10}
                            yaw={180}
                            hfov={110}
                            autoLoad
                            showZoomCtrl={false}
                            onLoad={() => {
                              console.log("panorama loaded");
                            } }
                            ></Pannellum>
                          </Container>
                        </div>)
                    : this.state.selectKey === '제3작업장'
                        ? ( <div>
                              <Container style={{textAlign: 'right'}}>
                                <Pannellum
                                  width="100%"
                                  height="590px"
                                  image={myImage3}
                                  pitch={10}
                                  yaw={180}
                                  hfov={110}
                                  autoLoad
                                  showZoomCtrl={false}
                                  onLoad={() => {
                                    console.log("panorama loaded");
                                  }}
                                ></Pannellum>
                              </Container>
                            </div>)
                            : ( <div>
                                  <Container style={{textAlign: 'right'}}>
                                    <Pannellum
                                      width="100%"
                                      height="590px"
                                      image={myImage4}
                                      pitch={10}
                                      yaw={180}
                                      hfov={110}
                                      autoLoad
                                      showZoomCtrl={false}
                                      onLoad={() => {
                                        console.log("panorama loaded");
                                      }}
                                    ></Pannellum>
                                  </Container>
                                </div>)
              }
            </div>
        </div>
      )  
    }
  };


export default Upload
              