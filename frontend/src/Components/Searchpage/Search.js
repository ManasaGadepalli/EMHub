//import "./App.css";
import { useState } from "react";
import Axios from "axios";
import { Card } from "react-bootstrap";
import './styles.css';
import NavBar from "../Navbar/Navbar";
import React, { useEffect } from "react";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Container, Form, Row, Button } from 'react-bootstrap';

function Search() {
    const [comp_name, setName] = useState("");
    const [event_type, setType] = useState("");
    const [location, setLocation] = useState("");
    const [rating, setRating] = useState(0);
    const [minprice, setMinPrice] = useState(0);
    const [email, setEmail] = useState("");
    const [searchBy, setSearchBy] = React.useState('comp_name');

    const [newMinPrice, setNewMinPrice] = useState(0);
    const [searchevent, setsearchevent] = useState("")
    const [searchterm, setsearchterm] = useState("")
    const [compList, setCompList] = useState([]);
    const [direction, setDirection] = useState(1)
    const [searchResult, setSearchResult] = useState([])


    

    const addCompany = () => {
        Axios.post("http://localhost:3001/create", {
            comp_name: comp_name,
            event_type: event_type,
            location: location,
            rating: rating,
            minprice: minprice,
            email: email
        }).then(() => {
            setCompList([
                ...compList,
                {
                    comp_name: comp_name,
                    event_type: event_type,
                    location: location,
                    rating: rating,
                    minprice: minprice,
                    email: email
                },
            ]);
        });
    };

        const getCompanies = () => {
            Axios.get("http://localhost:3001/event_companies").then((response) => {
                setCompList(response.data);
                
            });
        };

       

        const getCompaniesbylocation = (searchInput) => {
            Axios.get("http://localhost:3001/location").then((response) => {
                setCompList(response.data);
            });
          };
    

    const updateMinPrice = (id) => {
        Axios.put("http://localhost:3001/update", { minprice: newMinPrice, id: id }).then(
            (response) => {
                setCompList(
                    compList.map((val) => {
                        return val.id == id
                            ? {
                                id: val.id,
                                comp_name: val.comp_name,
                                event_type: val.event_type,
                                location: val.location,
                                rating: val.rating,
                                minprice: newMinPrice,
                                email: val.email
                            }
                            : val;
                    })
                );
            }
        );
    };

 


   
    return (
        <div className="App">
             <NavBar />
             <div>
           <DropdownButton className="buttonStyle" title="Sort" variant='dark' >
            <Dropdown.Item onClick = {() => setDirection(1)}>Low to High</Dropdown.Item>
            <Dropdown.Item onClick = {() => setDirection(-1)}>High to Low</Dropdown.Item>
            <Dropdown.Item onClick={(event) => { setSearchBy("event_type")}} >Search by name</Dropdown.Item> 
            <Dropdown.Item onClick={(event) => { setSearchBy("event_type")}} >Rating</Dropdown.Item> 
          </DropdownButton>

           
            
    </div>
            <div className="employees">
                <Container >
                <Form.Group  controlId='Label'>
                <Form.Control
                type='label' onChange={event => {setsearchterm(event.target.value)}}
                placeholder='✈️ Enter Location' />
                </Form.Group>
                 </Container>
          
                <button className="showcompanies"   onClick={getCompanies}>Show Event Companies</button>

                {compList.filter((val)=>{
                    if (searchterm =="")
                    {
                        return val;
                    }
                    else if(val.location.toLowerCase().includes(searchterm.toLowerCase())){
                        return val;
                    }
                    
                }).map((val, key) => {
                    return (
                        <div className="Companies">
                            <Card style = {{width: '50vh',margin:'1vh',padding:'1vh',height:'contentfit', marginLeft:'7vh'}}>
                             <br/>
                            <Card.Body style = {{color: '#000229', fontSize: '15px',fontFamily: 'Calibri', textAlign:'left',margin:'0vh',padding:'0vh'}}>
                            <Card.Title style ={{fontWeight:'bold', fontSize:"20px", color: '#0b0b64'}}> {val.comp_name}</Card.Title>
                                Event_type: {val.event_type}&nbsp;
                                <br/>
                                Location: {val.location} &nbsp;
                                <br/>
                                MinPrice: ${val.minprice + ""} &nbsp;
                                 <br/>
                                 Email: ${val.email + ""} &nbsp;
                                 <br/>
                                Rating: {val.rating/10 }/5 
                                 </Card.Body>
                                </Card>

                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Search;