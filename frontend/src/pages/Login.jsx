import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, FormGroup, Button, Alert } from "reactstrap";
import { Link, useNavigate } from 'react-router-dom';

import loginImg from '../assets/images/login.png';
import userIcon from '../assets/images/user.png';

import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";

export const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { dispatch, authToken } = useContext(AuthContext); // Access authToken from AuthContext
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`, 
        },
        credentials: 'include',
        body: JSON.stringify(credentials),
      });
    
      const result = await res.json();
    
      if (!res.ok) {
        throw new Error(result.message);
      }
      if (result.data.status === "blocked") {
        throw new Error("You are blocked. Please contact the administrator for assistance.");
      }
    
      const token = result.token;
      localStorage.setItem("authToken", token);
      dispatch({ type: 'LOGIN_SUCCESS', payload: result.data, token });
    
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to login. Please try again.');
    } finally {
      setLoading(false);
    }
  }    

  return (
    <section>
      <Container>
        <Row>
          <Col lg='8' className='m-auto'>
            <div className="login_container d-flex justify-content-between">
              <div className="login_img">
                <img src={loginImg} alt="" />
              </div>
              <div className="login_form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Login</h2>
                {error && <Alert color="danger">{error}</Alert>}
                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input type="text" placeholder='Email' required id='email' onChange={handleChange} />
                  </FormGroup>
                  <FormGroup>
                    <input type="password" placeholder='Password' required id='password' onChange={handleChange} />
                  </FormGroup>
                  <Button className='btn secondary_btn auth_btn' type='submit' disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                  </Button>
                </Form>
                <p>Don't have an account? <Link to='/register'>Create</Link></p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
