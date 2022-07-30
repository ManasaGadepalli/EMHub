import NavBar from "../Navbar/Navbar";
import './Registration.css';
import { useState } from 'react';
import { Container, Form, Button, Row } from 'react-bootstrap';
//import axios, { Axios } from "axios";
//import { validEmail } from './RegExp.js';
import Axios from 'axios';

export default function SignUpPage() {
    const [lastname, setLastname] = useState('');
    const [firstname, setFirstname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [reenterpassword, setReEnterdPassword] = useState('');


    const reguser = () =>
    {
        Axios.post("http://localhost:3001/signup", {
            lastname:lastname,
            firstname:firstname,
            email:email,
            phone:phone,
            password:password,
            reenterpassword:reenterpassword,

        }).then(() =>{
            console.log("success");
            window.location.replace("/login");
        }) ;
    };
   
    return (
        <div>
            <NavBar />
            <Container className="subcontainer">
                <br />
                <h2 id="content">Create Your Account</h2>
                <br />
                <Form className='form'>
                    <Row className='row'>
                        <Form.Group className="col-md-4" controlId='firstName'>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type='text' required value={firstname} onChange={e => setFirstname(e.target.value)} placeholder='First Name' />
                        </Form.Group>

                        <Form.Group className="col-md-4" controlId='lastName'>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type='text' required value={lastname} onChange={e => setLastname(e.target.value)} placeholder='Last Name' />
                        </Form.Group>

                        <Form.Group className="col-md-4" controlId='userEmail'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' required value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' />
                        </Form.Group>

                    </Row>
                    <Row className='row'>
                        <Form.Group className="col-md-4" controlId='userPhone'>
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control type='text' required value={phone} onChange={e => setPhone(e.target.value)} placeholder='Contact Number' />
                        </Form.Group>

                        <Form.Group className="col-md-4" controlId='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' required value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' />
                        </Form.Group>

                        <Form.Group className="col-md-4" controlId='confirm'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type='password' required value={reenterpassword} onChange={e => setReEnterdPassword(e.target.value)} placeholder='Confirm Password' />
                        </Form.Group>
                    </Row>
                    <br />
                    <Form.Group className="regbtngroup">
                        <Button className="regbtn" type='button' onClick={reguser}> <b>Create Account</b></Button>
                    </Form.Group>
                 
                </Form>
                <br />
            </Container>
        </div >
    );
};