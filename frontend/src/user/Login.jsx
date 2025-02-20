import React, { useContext, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { services } from '../services/Services';
import { ContextApi } from '../Context/Context';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Arial', sans-serif;
    background-color: #f5f5f5; /* Light background */
    color: #333; /* Dark text for better readability */
  }
`;
const Login = () => {
    let navigate=useNavigate()
    let {loggedUser,setloggedUser}=useContext(ContextApi)
  let [state, setState] = useState({
    email: "",
    password: "",
  });


  let handelChange = (e) => {
    let { name, value } = e.target;
    setState((preVal) => ({ ...preVal, [name]: value }));
  };



  let handelSubmit = (e) => {
    try {
      e.preventDefault();
      let { email, password } = state;
      let payload = { email, password };
      console.log(payload);
  (async ()=>{
  let user= await services.loginUser(payload)
setloggedUser(user)

})()
  
    navigate('/')

    } catch (error) {
      console.log(error);
    }
  };

  
  return (
    <>
      <GlobalStyle />
      <Container>
        <Form onSubmit={handelSubmit}>
          <FormHeader>Create an Account</FormHeader>

          <InputContainer>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              onChange={handelChange}
              value={state.email}
              placeholder="Enter your email"
            />
          </InputContainer>

          <InputContainer>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              onChange={handelChange}
              value={state.password}
              placeholder="Enter your password"
            />
          </InputContainer>



          <SubmitButton type="submit">Submit</SubmitButton><br /><br />
        <p>Don't have account no worries ? <Link to="/register" style={{textDecoration:"none"}}>Register now</Link> </p>
        </Form>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f5f5f5; /* Light background */
`;

const Form = styled.form`
  background: #ffffff; /* White background for the form */
  padding: 2rem 3rem;
  border-radius: 15px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
  transition: all 0.3s ease;
`;

const FormHeader = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  color: #4e4e4e; /* Soft dark color for header */
`;

const InputContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #4e4e4e; /* Soft dark color for labels */
  display: block;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #e0e0e0; /* Soft gray border */
  border-radius: 8px;
  outline: none;
  background: #fafafa; /* Very light gray background for inputs */
  color: #333; /* Dark text inside inputs */
  transition: all 0.3s ease;

  &:focus {
    border-color: #0077ff;
    box-shadow: 0 0 5px rgba(0, 119, 255, 0.3);
  }

  &::placeholder {
    color: #aaa; /* Light placeholder color */
  }
`;

const FileInput = styled.input`
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fafafa;
  color: #333;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  background-color: #0077ff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.1s ease;

  &:hover {
    background-color: #005bb5;
  }

  &:active {
    background-color: #004080;
    transform: scale(0.98);
  }
`;


export default Login