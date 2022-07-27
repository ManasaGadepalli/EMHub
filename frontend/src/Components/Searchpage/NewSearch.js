import React, { useState, useEffect } from "react";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import "react-datepicker/dist/react-datepicker.css";
import { Container, Form, Row, Button } from 'react-bootstrap'
import axios from 'axios';
import NavBar from "../Navbar/Navbar";
import { Card } from "react-bootstrap";
import { useLocation } from 'react-router-dom'
import { CardGroup, Col } from "react-bootstrap";
import { Dropdown, DropdownButton } from 'react-bootstrap'



const SearchPage = () => {



  const containerSty = {
    paddingTop: '100px',
    height: "100%",
    backgroundColor: "#FFFFFF",
    textAlign: "center",
    
    paddingBottom: "0vh",
    width:'100%'
    
  }

  const hSty = {
    textAlign: "left",
    fontSize: "4rem",
    backgroundColor: "#80B7D2",
    paddingTop:'15vh'
  }

  const inputSty = {
    fontSize: "12px",
    width: "100%",
    textAlign: 'center'
  }
  const input2Sty = {
    fontSize: "12px",
    width: "100%",
    textAlign: 'center'
  }
  const checkstyle = {
    //backgroundColor: '#B0BEC7',
    width: '100%',
    fontWeight:'bold',
    color: '#0b0b64',}
    
  
  const lmao3 = {
    fontSize: '1.75rem',
    //paddingTop: '20px',
    //color: "#0b0b64",
    //marginRight: '210px',
    //fontWeight: "bold",
    width: '200px',
    marginLeft:'45%'
   
  }
  const datestyle = {
    display: "flex",
    width:'100%',
    backgroundColor: "#FFFFFF"
    
  }

  const locationsty = {
    textAlign: "center",
    display: "flex",
    width:'100%',
    backgroundColor: "#FFFFFF"
  }

  const searchButton = {

    margin: "1px",
    width: "10%",
    height:'10%',
    borderRadius: "10px",
    backgroundColor: "#54C0F3",
    fontWeight:'Bold',
    paddingBottom:'1px',
    paddingTop:'5px',
    marginLeft:'1vh',
    textAlign: 'center',
    color: '#000000',
    
    

  }


  const row ={
    paddingBottom:'1vh',
    width:'100%',
    height: '10%'

  }

  const col ={
    width: '100%',
    height: '100%'
  }


  const resbtn ={
    width:'25vh',
    marginLeft: '60vh',
    fontSize:"29px",
    borderRadius: '10vh',
    backgroundColor: "#0A6692",
    color: '#FFFFFF',
    fontWeight:'bold'

  }
  const carddiv ={
    backgroundColor: "#BBE3F6",
    overflow: 'scroll',
    paddingBottom: '20vh',
    paddingTop:'0vh'
   


   
  }
  const buttonStyle = {
    width: '100px',
    position: 'fixed',
    top: '120px',
    left: '20px',
  }

 const location = useLocation();


  const [selectedDate, setSelectedDate] = useState(new Date())
  const [sDate, setsDate] = useState(new Date())


  // search result is what we display on the UI, starts up empty / blank
  // setSearchResult should update it based off of GET request to server.
  // we update it by calling setSearchResult(SearchResults)
  const [searchResult, setSearchResult] = useState([])

  
  const [searchInput, setSearchInput] = useState(location.state? location.state : "")

  const [ltPrice, setltPrice] = useState(100000000)

  const [gtPrice, setgtPrice] = useState(0)

  const [direction, setDirection] = useState(1)

    

  const getSearch = () => {
    var headers = {
      'Content-Type' : 'application/json'
    }
    var args = {
      "search": searchInput,
      "ltPrice": ltPrice,
      "gtPrice": gtPrice,
      "direction": direction
    }
    axios.post("http://localhost:8080/Hotels/Search", args, headers).then(function(response) {
      console.log("begin request")
      console.log(args)
      console.log(headers)
      console.log(response.data)
      console.log("end request.")
      // data is a list of hotels
      setSearchResult(response.data);
    })
  }

  useEffect(() => {
    // call getSearch when the page loads
    document.onload = getSearch();
  });

  
  return (
    <><NavBar />

    <Container style={containerSty} fluid>
      <br/>
      <Container style={datestyle}>
        <Container style={locationsty}>
          <Form.Group style={inputSty} controlId='Label'>
            <Form.Control
              type='label'
              onChange={(s) => setSearchInput(s.target.value)}

              placeholder='✈️ Enter Location' />
          </Form.Group>
        </Container>
        <Container style={locationsty}>
          <Form.Group style={input2Sty} controlId='Label'>
            <Form.Control
              type='label'
              onChange={(s) => setSearchInput(s.target.value)}
              placeholder='🏨 Event Type' />
          </Form.Group>
        </Container>
        <Button
          onClick={() => getSearch()}
          style={searchButton}>
          Go
        </Button>
        <div>
          <DropdownButton id="userDropDown" title="Sort" style={buttonStyle} variant='dark' >
            <Dropdown.Item onClick = {() => setDirection(1)}>Low to High</Dropdown.Item>
            <Dropdown.Item onClick = {() => setDirection(-1)}>High to Low</Dropdown.Item>
            <Dropdown.Item onClick = {() => setDirection(-1)}>Rating</Dropdown.Item>
            
         </DropdownButton>
    </div>
      </Container>
      <Container style={{ width:'100%', backgroundColor: "#FFFFFF", paddingBottom:'1vh', textAlign:'center', borderRadius: '7px'}} fluid>
    
          <Form.Group style={lmao3} controlId='Label'>
            <p style={checkstyle}> {"Filter By Price: "}</p>
            <Form.Control
              type='label'
              onChange={(s) => setgtPrice(parseInt(s.target.value))}

              placeholder='💸 minimum price' />
          </Form.Group>
          <Form.Group style={lmao3} controlId='Label'>
            <Form.Control
              type='label'
              onChange={(s) => setltPrice(parseInt(s.target.value))}

              placeholder='💸 maximum price' />
          </Form.Group>
        
      </Container>
      <div style={carddiv}>
          <Row style={{}}>
          {searchResult.map(r => <Col style={{}}>
            
          {
            
           <Card style = {{width: '50vh',margin:'1vh',padding:'1vh',height:'contentfit', marginLeft:'7vh'}}>
             <Card.Img style={{}}  src = {r.images} variant='top'/>
             <br/>

             <Card.Body style = {{color: '#000229', fontSize: '15px',fontFamily: 'Calibri', textAlign:'left',margin:'0vh',padding:'0vh'}}>
             <Card.Title style ={{fontWeight:'bold', fontSize:"20px", color: '#0b0b64'}}> {r.name}</Card.Title>
                        {r.name} &nbsp; 
                       {r.address.street} {r.address.city}, {r.address.state} &nbsp;
                       <br/>
                        Starting Price: ${r.startingPrice}  &nbsp;
                        <br/>
                        Amenities include: {r.amenities + ""} &nbsp;
                        <br/>
                        Rating: {r.ratings/10 }/5 
             </Card.Body>
           </Card>
          }
           <Button style = {resbtn} href = {"/NewReserve?" + r._id + ""}>Reserve</Button>
          </Col>
          )}
          </Row>
          </div>
          </Container>
    
    </>
  );
}

export default SearchPage;