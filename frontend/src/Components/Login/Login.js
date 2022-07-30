import NavBar from "../Navbar/Navbar";
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './Login.css';
import Axios from 'axios';
//import { Response, serve, createServer } from 'react-response'

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus,setloginStatus] =useState('');

    const login = () =>
    {
        Axios.post("http://localhost:3001/login", {
            email:email,
            password:password,
        }).then((response) => {

            if(response.data.message) {
                setloginStatus(response.data.message)
            }
            else {
                console.log("Successfully logged in!");
                localStorage.setItem("email", email);
                window.location.replace("/search");
                }
        });
    };

   
    return (
        <div className="background">
            <NavBar />
            <div className="loginbox">
                <div className="loginHeader">LOGIN</div>
                <Form className='formContainerLogin'>
                    <Form.Group>
                        <Form.Label >
                             Email:
                        </Form.Label>
                        <Form.Control
                            type='text'
                            value={email}
                            required
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Enter Email"
                        />
                    </Form.Group>
                    <Form.Group className="input">
                        <Form.Label>
                            Password:
                        </Form.Label>
                        <Form.Control
                            type='password'
                            placeholder="Enter Password"
                            value={password}
                            required
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button  onClick={login} >Login</Button>
                    
                </Form>
                <div className="error">{loginStatus}</div>
            </div>
        </div >
    );
};