import axios from 'axios';
import React from 'react';
import { Modal,Button,Form, Container} from 'react-bootstrap';

class SignUpModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      id: '',
      password: '',
      repassword: '',
    }
  }

  render() {
    return(
      <Modal
      show={this.props.show}
      onHide={this.props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
        <Container>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          회원가입
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
<Form.Group controlId="formBasicEmail">

<Form.Group >
  <Form.Label>이름</Form.Label>
  <Form.Control type="text" placeholder="이름을 입력하시오" 
    onChange={(e)=>{
      this.setState({name: e.target.value});
    }} 
  />
</Form.Group>

  <Form.Label>ID</Form.Label>
  <Form.Control type="email" placeholder="이메일을 입력하시오" 
    onChange={(e)=>{
      this.setState({id: e.target.value});
    }}
  />
  {/* <Form.Text className="text-muted">
    We'll never share your email with anyone else.
  </Form.Text> */}
</Form.Group>

<Form.Group >
  <Form.Label>비밀번호</Form.Label>
  <Form.Control type="password" placeholder="비밀번호" 
    onChange={(e)=>{
      this.setState({password: e.target.value});
    }}
  />
</Form.Group>
<Form.Group >
  <Form.Label>비밀번호 확인</Form.Label>
  <Form.Control type="password" placeholder="비밀번호 재입력" 
    onChange={(e)=>{
      this.setState({repassword: e.target.value});
    }}
  />
</Form.Group>
{/* style={{marginLeft:'30px', width:'20%'}} */}

  <Button block variant="primary" type="button" style={{marginTop:'15px', marginBottom:'30px'}} 
    onClick={(e) => {
      console.log(this.state);
      axios.post('/api/join', this.state).then((res) => {
        console.log(res);
      })
    }}
  >회원가입</Button>
      
  <Button style={{width:'20%'}} onClick={this.props.onHide}>닫기</Button>
  
        {/* <HorizontalLine text="or"></HorizontalLine> */}
        </Form>
        </Modal.Body>
      </Container>
      </Modal>
    
  );   
  }
}
  
  
export default SignUpModal;