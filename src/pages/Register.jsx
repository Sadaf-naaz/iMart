import React from 'react'
import { styled } from 'styled-components'
import {mobile} from "../Responsive"
import { useState } from 'react';
import {publicRequest} from "../requestMethods"
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({width:"75%"})}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate=useNavigate();
  
 

  const handleClick=async (e)=>{
    e.preventDefault();
    if(password!==confPassword){
      window.alert("Password not matched");return ;
    }
    const newUser={
      firstName,lastName,email,password,username
    }
    try{
      const res=await publicRequest.post("/auth/register",newUser);
     if(res.status===201){
      window.alert("You are registered successfully!");
      navigate("/");
     }
      
  }catch(err){
     console.log(err);

  }
}
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form >
          <Input type='text' placeholder="first name" onChange={(e)=>setFirstName(e.target.value)} required/>
          <Input type='text' placeholder="last name" onChange={(e)=>setLastName(e.target.value)} required />
          <Input type='text' placeholder="username" onChange={(e)=>setUsername(e.target.value)} required/>
          <Input type='email' placeholder="email" onChange={(e)=>setEmail(e.target.value)} required/>
          <Input placeholder="password" onChange={(e)=>setPassword(e.target.value)} required/>
          <Input type="password" placeholder="confirm password" onChange={(e)=>setConfPassword(e.target.value)} required/>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleClick}>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Register
