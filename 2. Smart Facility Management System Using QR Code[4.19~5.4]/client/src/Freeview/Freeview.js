import React from "react";
import { Pannellum } from "pannellum-react";
import myImage from "../images/milan.jpg";
import { Container } from "react-bootstrap";
import Button from '@material-ui/core/Button';

function Freeview() {
  return (
    <div>
    <div className="Freeview">
    
      <Container>
      <div>
      <Button width="20px" variant="contained" color="secondary" href="/changgo">종료</Button> 
      </div>

      <Pannellum
        width="100%"
        height="800px"
        image={myImage}
        pitch={10}
        yaw={180}
        hfov={110}
        autoLoad
        showZoomCtrl={false}
        onLoad={() => {
          console.log("panorama loaded");
        }}
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
        <Pannellum.Hotspot
          type="info"
          pitch={5}
          yaw={130}
          text="B.정보보기"
          // URL='/login'
          handleClick={(evt, name) => console.log(name)}
          name="hs2"
          handleClickArg={{ "name":"test" }}
        />
        <Pannellum.Hotspot
          type="info"
          pitch={5}
          yaw={100}
          text="c.정보보기"
          URL='http://www.nextcore.co.kr'
          handleClick={(evt, name) => console.log(name)}
          name="hs2"
          handleClickArg={{ "name":"test" }}
        />
      </Pannellum>
      </Container>
    </div>
    <div>
     {/* <BrowserRouter>
     <Route exact path='/login' component={Login}/>
     </BrowserRouter> */}
     </div>
     </div>
  );
}

export default Freeview;