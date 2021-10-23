import React, { Component } from 'react';
import {DropdownButton, Dropdown, Container, Card} from 'react-bootstrap'
import { Pannellum } from "pannellum-react";

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            completed: 0,
            selectItem: [],
            selectKey: '',
            LOCATION_IMG: ''
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
            <div className="ex">
              <DropdownButton id="dropdown-basic-button" title="360 VIEW 보기" onSelect={(eventKey) => this.setState({selectKey : eventKey})}>
                {
                    this.state.selectItem.map(function(item, LOCATION_NAME){
                        return ( <Dropdown.Item eventKey={item.LOCATION_NAME}>{item.LOCATION_NAME}</Dropdown.Item> );
                    })
                }
              </DropdownButton>
            </div>
            <div>
              {
                this.state.selectItem.filter((item) => (item.LOCATION_NAME === this.state.selectKey)).map((item) => (
                  <div>
                    <Container>
                      <Card style={{width:'150px', height:'35px', backgroundColor:'rgb(133, 133, 133)', color:'white', textAlign:'center', justifyContent:'center'}}>
                        {this.state.selectKey}
                      </Card>
                      <Pannellum
                          width="100%"
                          height="800px"
                          image={item.LOCATION_IMG}
                          autoLoad
                          showZoomCtrl={false}
                          onLoad={() => {
                            console.log("panorama loaded");
                          } }
                      >
                      </Pannellum>
                    </Container>
                  </div>
                ))
              }
            </div>
        </div>
      )  
    }
  };


export default Upload;
