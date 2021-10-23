import React, { useState } from "react";
import axios from 'axios';
import { post } from 'axios';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {FaUser} from 'react-icons/fa'
import {GoKey} from "react-icons/go";
import "../css/login.css";
import SignUpModal from './SignUpModal';


export default function Login() {
  
  const [SignUpModalOn, setSignUpModalOn] = useState(false); //기본적으로 모달창은 꺼진상태
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  
  const loginStart = () => {
    loginCheck()
        .then((response) => {
            console.log(response.data[0].CNT);
            // 0 이면 다시 login 경고창 / 1
              {response.data[0].CNT === 1
                ? document.location.href='/main'
                : alert("ID/PASSWORD가 일치하지 않습니다.")
              }
        })
  }

  const loginCheck = () => {
    const url = '/api/login';

    const data = {
      userid,
      password
    }

    const config = {
        headers: {
            'Content-type': 'application/json'
        },
    }
    
    return post(url, data, config);
  }

  function validateForm() {
    return userid.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  
  return (
    
    
    <div>
    <SignUpModal show={SignUpModalOn} onHide={()=>setSignUpModalOn(false)} />
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="userid">
          <Form.Label><FaUser style={{margin:'15px'}}></FaUser></Form.Label>
          <Form.Control
            autoFocus
            value={userid}
            onChange={(e) => setUserid(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label><GoKey style={{margin:'15px'}}></GoKey></Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        {/* disabled={!validateForm()} */}
       {/* 아이디랑 비밀번호 입력했을때 넘어가게 쿼리
       select count(*) from 테이블 where userid='id' and password='password'   카운트 1이면 main으로  */}
        {/* <Button href='/main' block size="lg" type="submit" >Login</Button> */}
        {/* <Button block variant="primary" type="button" style={{marginTop:'15px', marginBottom:'30px'}} 
        onClick={(e) => {
          // console.log(this.state);
          axios.post('/api/login', this.state).then((res) => {
            console.log(res);
          })
          }}
          >로그인12</Button> */}
        <Button  block size="lg" type="submit" onClick={() => loginStart()}>로그인</Button>
        <Button variant="secondary" onClick={()=>setSignUpModalOn(true)} block size="lg" type="submit">
          회원가입
        </Button>
        
      </Form>
    </div>
    </div>
  );
}